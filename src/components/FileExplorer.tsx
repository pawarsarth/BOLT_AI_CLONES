import React from 'react';
import { File, Folder, FolderOpen } from 'lucide-react';

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
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  selectedFile,
  onFileSelect,
  expandedFolders,
  onToggleFolder,
}) => {
  const renderFileNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <div
          className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-700 ${
            isSelected ? 'bg-blue-600' : ''
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
            <File size={16} className="mr-2 text-gray-400" />
          )}
          <span className="text-sm text-white truncate">{node.name}</span>
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-3 bg-gray-700 border-b border-gray-600">
        <h3 className="text-white font-medium">Files</h3>
      </div>
      <div className="overflow-y-auto h-full">
        {files.map((file) => renderFileNode(file))}
      </div>
    </div>
  );
};

export default FileExplorer;