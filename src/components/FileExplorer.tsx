import React from 'react';
import { File, Folder, FolderOpen, Download } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  content?: string;
}

interface FileExplorerProps {
  files: FileNode[];
  selectedFile: string | null;
  onFileSelect: (path: string, content: string) => void;
  expandedFolders: Set<string>;
  onToggleFolder: (path: string) => void;
  onExport: () => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  selectedFile,
  onFileSelect,
  expandedFolders,
  onToggleFolder,
  onExport,
}) => {
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const iconClass = "mr-2";
    
    switch (extension) {
      case 'html':
        return <File size={16} className={`${iconClass} text-orange-400`} />;
      case 'css':
        return <File size={16} className={`${iconClass} text-blue-400`} />;
      case 'js':
      case 'jsx':
        return <File size={16} className={`${iconClass} text-yellow-400`} />;
      case 'ts':
      case 'tsx':
        return <File size={16} className={`${iconClass} text-blue-500`} />;
      case 'json':
        return <File size={16} className={`${iconClass} text-green-400`} />;
      case 'md':
        return <File size={16} className={`${iconClass} text-gray-300`} />;
      case 'txt':
        return <File size={16} className={`${iconClass} text-gray-400`} />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return <File size={16} className={`${iconClass} text-purple-400`} />;
      default:
        return <File size={16} className={`${iconClass} text-gray-400`} />;
    }
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <div
          className={`flex items-center py-1.5 px-2 cursor-pointer hover:bg-gray-700 transition-colors duration-200 ${
            isSelected ? 'bg-blue-600 text-white' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              onToggleFolder(node.path);
            } else if (node.content !== undefined) {
              onFileSelect(node.path, node.content);
            }
          }}
        >
          {node.type === 'folder' ? (
            isExpanded ? (
              <FolderOpen size={16} className="mr-2 text-blue-400" />
            ) : (
              <Folder size={16} className="mr-2 text-blue-400" />
            )
          ) : (
            getFileIcon(node.name)
          )}
          <span className="text-sm truncate flex-1" title={node.name}>
            {node.name}
          </span>
          {node.type === 'file' && (
            <span className="text-xs text-gray-500 ml-2">
              {node.name.split('.').pop()?.toUpperCase()}
            </span>
          )}
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div className="border-l border-gray-600 ml-4">
            {node.children.map((child) => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const countFiles = (nodes: FileNode[]): number => {
    let count = 0;
    for (const node of nodes) {
      if (node.type === 'file') {
        count++;
      }
      if (node.children) {
        count += countFiles(node.children);
      }
    }
    return count;
  };

  const fileCount = countFiles(files);

  return (
    <div className="h-full bg-gray-800 rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-white font-medium">Project Files</h3>
          <span className="text-xs text-gray-400">
            {fileCount} file{fileCount !== 1 ? 's' : ''}
          </span>
        </div>
        <button
          onClick={onExport}
          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded text-xs flex items-center gap-1.5 transition-colors duration-200 font-medium"
          disabled={files.length === 0}
          title={files.length === 0 ? "No files to export" : "Download project as ZIP"}
        >
          <Download size={14} />
          Export Zip
        </button>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <File size={48} className="mb-3 opacity-50" />
            <p className="text-sm text-center">No files generated yet</p>
            <p className="text-xs text-center mt-1 text-gray-600">
              Start by describing what you want to build
            </p>
          </div>
        ) : (
          <div className="py-2">
            {files.map((file) => renderFileNode(file))}
          </div>
        )}
      </div>

      {/* Footer with quick stats */}
      {files.length > 0 && (
        <div className="p-2 bg-gray-750 border-t border-gray-600 text-xs text-gray-400">
          <div className="flex justify-between items-center">
            <span>Ready to export</span>
            <span className="text-green-400">✓ {fileCount} files</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;