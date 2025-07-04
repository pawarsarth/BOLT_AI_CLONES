import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Send, Code, Eye, Terminal, FileText } from 'lucide-react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import FileExplorer from './FileExplorer';
import { useFileSystem } from '../hooks/useFileSystem';

interface LogEntry {
  type: 'user' | 'ai' | 'command' | 'result';
  content: string;
  timestamp: Date;
}

function Chat() {
  const [prompt, setPrompt] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('html');
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

  const { files, expandedFolders, parseFilePath, toggleFolder, getFileContent } = useFileSystem();

  // ✅ Load files from backend when component mounts
  useEffect(() => {
    async function loadFiles() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/files`);
        if (res.data.success && res.data.files) {
          res.data.files.forEach((file: any) => {
            parseFilePath(file.path, file.content);
          });
        }
      } catch (err: any) {
        console.error('❌ Failed to load files:', err.message);
      }
    }

    loadFiles();
  }, [parseFilePath]);

  const addLog = useCallback((type: LogEntry['type'], content: string) => {
    setLogs(prev => [...prev, { type, content, timestamp: new Date() }]);
  }, []);

  const extractFileContent = useCallback((result: string, command: string) => {
    const echoMatch = command.match(/echo\s+["']([\s\S]*)["']\s*>\s*(.+)$/);
    if (echoMatch) {
      const rawContent = echoMatch[1];
      const filePath = echoMatch[2].trim();

      const content = rawContent
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\\\/g, '\\');

      const fullPath = `server/${filePath}`;
      parseFilePath(fullPath, content);

      const folder = fullPath.split('/').slice(0, -1).join('/');
      toggleFolder(folder);

      if (!selectedFile || filePath.endsWith('.html')) {
        setSelectedFile(fullPath);
        setCurrentCode(content);

        const extension = filePath.split('.').pop()?.toLowerCase();
        const languageMap: { [key: string]: string } = {
          html: 'html',
          css: 'css',
          js: 'javascript',
          ts: 'typescript',
          json: 'json',
          md: 'markdown',
          txt: 'plaintext',
        };
        setCurrentLanguage(languageMap[extension || ''] || 'plaintext');
      }
    }
  }, [parseFilePath, selectedFile, toggleFolder]);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    addLog('user', prompt);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/generate`, { prompt });
      if (res.data.success && res.data.data) {
        res.data.data.forEach((item: any) => {
          if (item.command) {
            addLog('command', item.command);
            addLog('result', item.result);
            if (item.result.includes('✅ File written successfully')) {
              extractFileContent(item.result, item.command);
            }
          }
          if (item.text) {
            addLog('ai', item.text);
          }
        });
      }
    } catch (err: any) {
      addLog('result', `❌ Error: ${err.message}`);
    }

    setLoading(false);
    setPrompt('');
  };

  const handlePublish = async () => {
    if (!selectedFile) {
      alert('Please select a file (e.g. index.html) to determine the folder.');
      return;
    }

    alert('🚀 Publishing... Please wait about 1 minute for the site to deploy.\nDo not press the Publish button again.');

    const pathParts = selectedFile.split('/');
    let folderName = '';

    if (pathParts[0] === 'server' && pathParts.length > 1) {
      folderName = pathParts[1];
    } else {
      folderName = pathParts[0];
    }

    if (!folderName) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/publish`, { folderName });
      console.log('📦 Response from publish:', res.data);

      if (res.data.success && res.data.deployedUrl) {
        setDeployedUrl(res.data.deployedUrl);
        addLog('ai', `🚀 Site Published at:\n${res.data.deployedUrl}`);
      } else {
        addLog('result', `⚠️ Failed to publish: ${res.data.message || 'Unknown error'}`);
      }
    } catch (err: any) {
      console.error('❌ Axios error:', err.response?.data || err.message);
      addLog('result', `❌ Publish error: ${err.message}`);
    }
  };

  const handleFileSelect = useCallback((path: string, content: string) => {
    setSelectedFile(path);
    setCurrentCode(content);

    const extension = path.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      html: 'html',
      css: 'css',
      js: 'javascript',
      ts: 'typescript',
      json: 'json',
      md: 'markdown',
      txt: 'plaintext',
    };
    setCurrentLanguage(languageMap[extension || ''] || 'plaintext');
  }, []);

  const getCompletePreviewContent = useCallback(() => {
    const findFilesByType = (nodes: any[], extension: string): any[] => {
      const result: any[] = [];
      for (const node of nodes) {
        if (node.type === 'file' && node.name.endsWith(extension) && node.content) {
          result.push(node);
        }
        if (node.children) {
          result.push(...findFilesByType(node.children, extension));
        }
      }
      return result;
    };

    let htmlContent = '';
    if (selectedFile && selectedFile.endsWith('.html') && currentCode) {
      htmlContent = currentCode;
    } else {
      const htmlFiles = findFilesByType(files, '.html');
      if (htmlFiles.length > 0) {
        htmlContent = htmlFiles[0].content;
      }
    }

    if (!htmlContent) return '';

    const cssFiles = findFilesByType(files, '.css');
    const jsFiles = findFilesByType(files, '.js');

    let enhancedHtml = htmlContent;

    if (cssFiles.length > 0) {
      const cssContent = cssFiles.map(file => file.content).join('\n');
      if (enhancedHtml.includes('<head>')) {
        enhancedHtml = enhancedHtml.replace('</head>', `<style>\n${cssContent}\n</style>\n</head>`);
      } else if (enhancedHtml.includes('<html>')) {
        enhancedHtml = enhancedHtml.replace('<html>', `<html>\n<head>\n<style>\n${cssContent}\n</style>\n</head>`);
      } else {
        enhancedHtml = `<!DOCTYPE html>
<html>
<head>
<style>
${cssContent}
</style>
</head>
<body>
${enhancedHtml}
</body>
</html>`;
      }
    }

    if (jsFiles.length > 0) {
      const jsContent = jsFiles.map(file => file.content).join('\n');
      if (enhancedHtml.includes('</body>')) {
        enhancedHtml = enhancedHtml.replace('</body>', `<script>\n${jsContent}\n</script>\n</body>`);
      } else {
        enhancedHtml += `\n<script>\n${jsContent}\n</script>`;
      }
    }

    return enhancedHtml;
  }, [selectedFile, currentCode, files]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSend();
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* ...the rest of your JSX layout remains unchanged... */}
    </div>
  );
}

export default Chat;
