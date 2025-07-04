const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenAI } = require('@google/genai');
const { exec } = require('child_process');
const { promisify } = require('util');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const asyncExecute = promisify(exec);
const History = [];

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'AIzaSyBdfYO1wPBTPCwVs_E_UzMqVldvg2E3yNU', // 💡 Use env var in prod
});

// 📁 File writer
async function executeCommand({ command }) {
  try {
    const writeRegex = /^echo\s+"([\s\S]*)"\s*>\s*(.+)$/;
    const match = command.match(writeRegex);

    if (match) {
      let content = match[1]
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\\\/g, '\\');

      let rawPath = match[2].replace(/^server[\\/]/, '');
      const filePath = path.resolve('server', rawPath);
      const dir = path.dirname(filePath);

      console.log("📝 Writing to:", filePath);
      console.log("📄 Content:\n", content.slice(0, 300)); // Limit output

      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, content, 'utf8');

      return `✅ File written successfully: ${filePath}`;
    }

    if (command.startsWith("touch ")) {
      const filePath = path.resolve('server', command.replace("touch ", "").trim());
      fs.writeFileSync(filePath, "", 'utf8');
      return `✅ Empty file created: ${filePath}`;
    }

    if (command.startsWith("mkdir ")) {
      const folder = command.replace("mkdir ", "").replace(/"/g, '').trim();
      const resolvedPath = path.resolve('server', folder);
      if (!fs.existsSync(resolvedPath)) fs.mkdirSync(resolvedPath, { recursive: true });
      return `✅ Folder created: ${resolvedPath}`;
    }

    const { stdout, stderr } = await asyncExecute(command);
    if (stderr?.trim()) return `❌ Error: ${stderr}`;
    return `✅ Success:\n${stdout}\n✔ Task executed completely`;

  } catch (error) {
    console.error("❌ Command Error:", error.message);
    return `❌ Execution Failed:\n${error.message}`;
  }
}

// 🔄 Vercel deployer
async function deployToVercel(sitePath) {
  try {
    await asyncExecute('npm install -g vercel');

    const { stdout, stderr } = await asyncExecute(
      `vercel deploy --cwd=${sitePath} --prod --yes --token=${process.env.VERCEL_TOKEN}`
    );

    console.log("📤 Vercel Output:\n", stdout);
    if (stderr?.trim()) console.error("❌ Deployment stderr:", stderr);

    const urlMatch = stdout.match(/https?:\/\/[^\s]+\.vercel\.app/);
    return urlMatch ? urlMatch[0] : null;
  } catch (err) {
    console.error("❌ Failed to deploy:", err.message);
    return null;
  }
}

// 🧠 Run Gemini Agent
const executeCommandDeclaration = {
  name: 'executeCommand',
  description: 'Run shell commands to create folders and files',
  parameters: {
    type: 'OBJECT',
    properties: {
      command: {
        type: 'STRING',
        description: 'Shell command (mkdir folder, touch file, echo "..."> file)',
      },
    },
    required: ['command'],
  },
};

const availableTools = { executeCommand };

async function runAgent(userPrompt) {
  History.push({ role: 'user', parts: [{ text: userPrompt }] });
  const allOutputs = [];

  while (true) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: History,
      config: {
        systemInstruction: `
You are an expert assistant for generating static websites using terminal commands.

✅ ONLY use folders like "clock_store", "car_store", etc.
✅ Create files with:
  mkdir fan_site
  touch fan_site/index.html
  echo "<html>...</html>" > fan_site/index.html
✅ Never prefix with "server/"
✅ Always link CSS/JS using relative paths:
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
        `,
        tools: [{ functionDeclarations: [executeCommandDeclaration] }],
      },
    });

    if (response.functionCalls?.length > 0) {
      const { name, args } = response.functionCalls[0];
      const result = await availableTools[name](args);

      allOutputs.push({ command: args.command, result });
      History.push({ role: 'model', parts: [{ functionCall: response.functionCalls[0] }] });
      History.push({ role: 'user', parts: [{ functionResponse: { name, response: { result } } }] });
    } else {
      const responseText = response.text?.trim();
      if (responseText) allOutputs.push({ text: responseText });
      break;
    }
  }

  return allOutputs;
}

// 🚀 /api/generate (only generates files)
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  History.length = 0;
  const result = await runAgent(prompt);

  res.json({ success: true, data: result });
});

// 🚀 /api/publish (deploy manually when user clicks "Publish")
app.post('/api/publish', async (req, res) => {
  const { folderName } = req.body;
  const folderPath = path.resolve('server', folderName || "");

  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ success: false, message: "Folder not found" });
  }

  const deployedUrl = await deployToVercel(folderPath);
  if (deployedUrl) {
    res.json({ success: true, deployedUrl });
  } else {
    res.status(500).json({ success: false, message: "Deployment failed" });
  }
});

// 🌐 Root status check
app.get('/', (req, res) => {
  res.send("✅ Bolt AI backend is running.");
});

// 🔥 Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
