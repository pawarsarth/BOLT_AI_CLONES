import React, { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Code, Eye, Terminal, FileText, Mic, Clock, ChevronDown, Upload, X } from 'lucide-react';
import JSZip from 'jszip';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import FileExplorer from './FileExplorer';
import { useFileSystem } from '../hooks/useFileSystem';

interface LogEntry {
  type: 'user' | 'ai' | 'command' | 'result';
  content: string;
  timestamp: Date;
}

interface CommandSuggestion {
  id: string;
  title: string;
  description: string;
  command: string;
}

const commandSuggestions: CommandSuggestion[] = [
  {
    id: '1',
    title: 'Tea Selling Website',
    description: 'Create a beautiful tea store with product showcase',
    command: 'create one website of tea selling using html, css and js'
  },
  {
    id: '2',
    title: 'Toy Store Website',
    description: 'Build an interactive toy store with categories',
    command: 'create one website of toy store using html, css and js'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Design a professional portfolio showcase',
    command: 'create one portfolio website using html, css and js'
  },
  {
    id: '4',
    title: 'Restaurant Website',
    description: 'Create a restaurant website with menu and booking',
    command: 'create one restaurant website using html, css and js'
  },
  {
    id: '5',
    title: 'E-commerce Store',
    description: 'Build a complete online shopping platform',
    command: 'create one e-commerce website using html, css and js'
  },
  {
    id: '6',
    title: 'Blog Website',
    description: 'Create a modern blog with articles and comments',
    command: 'create one blog website using html, css and js'
  },
  {
    id: '7',
    title: 'Travel Agency',
    description: 'Design a travel booking and destination showcase',
    command: 'create one travel agency website using html, css and js'
  },
  {
    id: '8',
    title: 'Fitness Gym Website',
    description: 'Build a gym website with classes and trainers',
    command: 'create one fitness gym website using html, css and js'
  }
];

function Chat() {
  const [prompt, setPrompt] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('html');
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [publishTimer, setPublishTimer] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<CommandSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { files, expandedFolders, parseFilePath, toggleFolder, getFileContent } = useFileSystem();

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    if (prompt.trim()) {
      const filtered = commandSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(prompt.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(prompt.toLowerCase()) ||
        suggestion.command.toLowerCase().includes(prompt.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && prompt.length > 2);
    } else {
      setFilteredSuggestions(commandSuggestions);
      setShowSuggestions(false);
    }
  }, [prompt]);

  // Speech recognition initialization
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        if (event.results[event.results.length - 1].isFinal) {
          // Only set the final transcript, don't append
          setPrompt(transcript.trim());
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onstart = () => {
        // Clear the prompt when starting speech recognition
        setPrompt('');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Timer effect - Updated to 80 seconds
  useEffect(() => {
    if (publishTimer !== null) {
      if (publishTimer <= 0) {
        setPublishTimer(null);
        return;
      }

      const timerId = setTimeout(() => {
        setPublishTimer(publishTimer - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [publishTimer]);

  // Load files from backend when component mounts
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

  // Simulate line-by-line code generation
  const simulateLineByLineGeneration = useCallback((content: string, filePath: string) => {
    const lines = content.split('\n');
    let currentContent = '';
    
    setIsGenerating(true);
    
    const generateLine = (index: number) => {
      if (index >= lines.length) {
        setIsGenerating(false);
        return;
      }
      
      currentContent += (index > 0 ? '\n' : '') + lines[index];
      
      // Update the file content
      parseFilePath(filePath, currentContent);
      
      // If this is the selected file, update the editor
      if (selectedFile === filePath) {
        setCurrentCode(currentContent);
      }
      
      // Continue with next line after a delay
      setTimeout(() => generateLine(index + 1), 100 + Math.random() * 200); // Random delay between 100-300ms
    };
    
    generateLine(0);
  }, [parseFilePath, selectedFile]);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setShowSuggestions(false);
    addLog('user', prompt);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/generate`, { prompt });
      if (res.data.success && res.data.data) {
        res.data.data.forEach((item: any) => {
          if (item.command) {
            addLog('command', item.command);
            addLog('result', item.result);
            if (item.result.includes('✅ File written successfully')) {
              // Extract file content and simulate line-by-line generation
              const echoMatch = item.command.match(/echo\s+["']([\s\S]*)["']\s*>\s*(.+)$/);
              if (echoMatch) {
                const rawContent = echoMatch[1];
                const filePath = echoMatch[2].trim();
                const content = rawContent
                  .replace(/\\"/g, '"')
                  .replace(/\\n/g, '\n')
                  .replace(/\\t/g, '\t')
                  .replace(/\\\\/g, '\\');
                
                const fullPath = `server/${filePath}`;
                
                // Set up the file structure first
                const folder = fullPath.split('/').slice(0, -1).join('/');
                toggleFolder(folder);
                
                if (!selectedFile || filePath.endsWith('.html')) {
                  setSelectedFile(fullPath);
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
                
                // Start line-by-line generation
                simulateLineByLineGeneration(content, fullPath);
              } else {
                extractFileContent(item.result, item.command);
              }
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

    // Start the timer immediately when publish is clicked - Updated to 80 seconds
    setPublishTimer(97);
    addLog('ai', '🚀 Starting deployment process...');

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
        // Stop the timer when site is successfully published
        setPublishTimer(null);
      } else {
        addLog('result', `⚠️ Failed to publish: ${res.data.message || 'Unknown error'}`);
      }
    } catch (err: any) {
      console.error('❌ Axios error:', err.response?.data || err.message);
      addLog('result', `❌ Publish error: ${err.message}`);
      // Stop timer on error
      setPublishTimer(null);
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

  // Enhanced export function to create zip file
  const handleExport = useCallback(async () => {
    if (files.length === 0) {
      alert('No files to export');
      return;
    }

    try {
      const zip = new JSZip();

      const addFilesToZip = (nodes: any[], folder: any = zip) => {
        nodes.forEach((node) => {
          if (node.type === 'file' && node.content) {
            // Clean up the file path to remove 'server/' prefix if present
            const cleanPath = node.path.startsWith('server/') ? node.path.substring(7) : node.path;
            folder.file(cleanPath, node.content);
          } else if (node.type === 'folder' && node.children) {
            const subFolder = folder.folder(node.name);
            addFilesToZip(node.children, subFolder);
          }
        });
      };

      addFilesToZip(files);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website-code.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addLog('ai', '📦 Project exported as website-code.zip');
    } catch (error) {
      console.error('Export error:', error);
      addLog('result', '❌ Failed to export project');
    }
  }, [files, addLog]);

  const handleSuggestionClick = (suggestion: CommandSuggestion) => {
    setPrompt(suggestion.command);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

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
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* 🔷 Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 sm:p-4">
        <h1 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
          <Code className="text-blue-400" />
          <span className="hidden sm:inline">Bolt AI - Website Builder</span>
          <span className="sm:hidden">Bolt AI</span>
          {isGenerating && (
            <div className="hidden sm:flex items-center gap-2 ml-4">
              <div className="animate-spin w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
              <span className="text-green-400 text-sm">Generating code...</span>
            </div>
          )}
        </h1>
      </div>

      {/* 🔔 Timer Banner (shown just below header) */}
      {publishTimer !== null && publishTimer > 0 && (
        <div className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-black overflow-hidden">
          <div className="flex items-center justify-center py-2 px-2 sm:px-4 animate-pulse">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span className="font-bold text-sm sm:text-lg text-center">
              ⏳ Publishing your site... Please wait {publishTimer} seconds
            </span>
          </div>
        </div>
      )}

      {/* 🔽 Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar File Explorer */}
        <div className={`${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 w-64' : 'hidden'} lg:block lg:relative lg:w-64 bg-gray-800 border-r border-gray-700 flex flex-col`}>
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end p-2">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <FileExplorer
              files={files}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              expandedFolders={expandedFolders}
              onToggleFolder={toggleFolder}
              onExport={handleExport}
            />
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col">
          {/* Prompt Input Section */}
          <div className="bg-gray-800 border-b border-gray-700 p-2 sm:p-4">
            {/* Mobile menu toggle */}
            <div className="lg:hidden mb-2">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
              >
                <Terminal size={16} />
                <span className="ml-2 text-sm">Files</span>
              </button>
            </div>
            
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => {
                      if (prompt.length > 2) {
                        setShowSuggestions(true);
                      }
                    }}
                    placeholder="Describe the website you want to build... (Type to see suggestions)"
                    className="w-full p-2 sm:p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none pr-10 text-sm sm:text-base"
                    disabled={loading}
                  />
                  <button
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronDown size={16} className={`transform transition-transform ${showSuggestions ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                {/* Button group - responsive layout */}
                <div className="flex flex-wrap gap-2">
                  {/* Voice button - hidden on small screens */}
                  <button
                    onClick={() => {
                      if (recognitionRef.current) {
                        if (!isRecording) {
                          recognitionRef.current.start();
                          setIsRecording(true);
                        } else {
                          recognitionRef.current.stop();
                        }
                      } else {
                        alert('Speech recognition not supported in this browser');
                      }
                    }}
                    className={`hidden sm:flex px-3 py-2 sm:px-4 sm:py-3 rounded-lg items-center gap-2 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    <Mic size={16} />
                    <span className="hidden sm:inline">{isRecording ? "Stop" : "Speak"}</span>
                  </button>
                  
                  {/* Upload button */}
                  <button
                    onClick={handleUploadClick}
                    className="px-3 py-2 sm:px-4 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    title="Upload images (Coming Soon)"
                  >
                    <Upload size={16} />
                    <span className="hidden sm:inline">Upload</span>
                  </button>
                  
                  {/* Send button */}
                  <button
                    onClick={handleSend}
                    disabled={loading || !prompt.trim()}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send size={16} />
                    <span className="hidden sm:inline">{loading ? "Working..." : "Send"}</span>
                  </button>
                  
                  {/* Publish button */}
                  <button
                    onClick={handlePublish}
                    disabled={publishTimer !== null}
                    className={`px-3 py-2 sm:px-4 sm:py-3 text-white rounded-lg transition-colors flex items-center gap-1 ${
                      publishTimer !== null 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {publishTimer !== null ? (
                      <>
                        <Clock size={16} />
                        <span className="text-sm">{publishTimer}s</span>
                      </>
                    ) : (
                      <>
                        🚀 <span className="hidden sm:inline">Publish</span>
                      </>
                    )}
                  </button>
                  
                  {/* Open site button */}
                  {deployedUrl && (
                    <button
                      onClick={() => window.open(deployedUrl, '_blank')}
                      className="px-3 py-2 sm:px-4 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      🌐 <span className="hidden sm:inline">Open Site</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Command Suggestions Dropdown */}
              {showSuggestions && (
                <div 
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
                >
                  <div className="p-2">
                    <div className="text-xs text-gray-400 mb-2 px-2">💡 Quick Start Templates</div>
                    {(prompt.length > 2 ? filteredSuggestions : commandSuggestions).map((suggestion) => (
                      <div
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-3 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Code size={16} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
                              {suggestion.title}
                            </h4>
                            <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                              {suggestion.description}
                            </p>
                            <div className="text-xs text-gray-500 mt-2 font-mono bg-gray-800 px-2 py-1 rounded">
                              {suggestion.command}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              <span className="hidden sm:inline">Press Ctrl+Enter (Cmd+Enter on Mac) to send • ESC to close suggestions</span>
              <span className="sm:hidden">Tap Send or use voice input</span>
            </p>
          </div>

          {/* Editor/Preview + Logs */}
          <div className="flex-1 flex overflow-hidden">
            {/* Code Editor or Preview */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              {/* Tabs + Instruction Message */}
              <div className="bg-gray-800 border-b border-gray-700">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`px-2 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 border-b-2 transition-colors text-sm sm:text-base ${activeTab === 'editor' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
                  >
                    <FileText size={16} />
                    <span className="hidden sm:inline">Code Editor</span>
                    <span className="sm:hidden">Code</span>
                    {isGenerating && activeTab === 'editor' && (
                      <div className="animate-pulse w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-2 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 border-b-2 transition-colors text-sm sm:text-base ${activeTab === 'preview' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
                  >
                    <Eye size={16} />
                    <span className="hidden sm:inline">Preview</span>
                    <span className="sm:hidden">View</span>
                  </button>
                </div>

                {/* 🟡 Instruction Banner */}
                <div className="p-2 text-center text-xs sm:text-sm text-yellow-400 font-medium border-t border-gray-700 bg-gray-900">
                  <span className="hidden sm:inline">👉 Click on <span className="text-blue-400 font-semibold">index.html</span> to see the preview of your web page.Please wait for 5 sec to load the complete code.</span>
                  <span className="sm:hidden">👉 Select <span className="text-blue-400 font-semibold">index.html</span> to preview</span>
                  {isGenerating && <span className="ml-2 text-green-400">⚡ Code generating line by line...</span>}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-hidden">
                {activeTab === 'editor' ? (
                  selectedFile && currentCode ? (
                    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-2 sm:p-4">
                      <CodeEditor
                        code={currentCode}
                        language={currentLanguage}
                        onChange={(value) => {
                          if (!value) return;
                          setCurrentCode(value);
                          parseFilePath(selectedFile!, value);
                        }}
                        readOnly={isGenerating}
                      />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Code size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-base sm:text-lg mb-2">No file selected</p>
                        <p className="text-xs sm:text-sm px-4">Choose a template above or describe your website</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-2 sm:p-4">
                    <Preview
                      htmlContent={getCompletePreviewContent()}
                      onRefresh={() => {
                        if (selectedFile) {
                          const content = getFileContent(selectedFile);
                          setCurrentCode(content);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Activity Log */}
            <div className="hidden xl:flex xl:w-80 bg-gray-800 border-l border-gray-700 flex-col overflow-hidden">
              <div className="p-3 bg-gray-700 border-b border-gray-600 flex items-center gap-2">
                <Terminal size={16} />
                <h3 className="font-medium">Activity Log</h3>
                {isGenerating && (
                  <div className="flex items-center gap-1">
                    <div className="animate-spin w-3 h-3 border border-green-500 border-t-transparent rounded-full"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-3 space-y-2">
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded text-sm ${log.type === 'user'
                      ? 'bg-blue-900/30 border-l-2 border-blue-500'
                      : log.type === 'ai'
                        ? 'bg-green-900/30 border-l-2 border-green-500'
                        : log.type === 'command'
                          ? 'bg-yellow-900/30 border-l-2 border-yellow-500'
                          : 'bg-gray-700/50'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-medium">{log.type.toUpperCase()}</span>
                      <span className="text-xs text-gray-500">{log.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div className="whitespace-pre-wrap break-words overflow-x-auto">{log.content}</div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="animate-spin w-4 h-4 border-2 border-gray-600 border-t-blue-500 rounded-full"></div>
                    <span>AI is working...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay for file explorer */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Upload className="text-indigo-400" />
                Upload Images
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="text-center py-8">
              <div className="mb-4">
                <Upload size={64} className="mx-auto text-indigo-400 opacity-50" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                🚀 Feature Coming Soon!
              </h4>
              <p className="text-gray-400 mb-4">
                Image upload functionality is currently under development. 
                Soon you'll be able to upload and use your own images in your websites.
              </p>
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <h5 className="text-white font-medium mb-2">What's Coming:</h5>
                <ul className="text-sm text-gray-300 space-y-1 text-left">
                  <li>• Drag & drop image upload</li>
                  <li>• Automatic image optimization</li>
                  <li>• Multiple format support (JPG, PNG, SVG)</li>
                  <li>• Direct integration with your code</li>
                </ul>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
