import { useState, useCallback } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  content?: string;
}

export const useFileSystem = () => {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const parseFilePath = useCallback((filePath: string, content: string) => {
    const parts = filePath.split('/').filter(Boolean);
    
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      let currentLevel = newFiles;
      let currentPath = '';

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        currentPath += (currentPath ? '/' : '') + part;
        const isFile = i === parts.length - 1;

        let existingNode = currentLevel.find(node => node.name === part);

        if (!existingNode) {
          const newNode: FileNode = {
            name: part,
            type: isFile ? 'file' : 'folder',
            path: currentPath,
            ...(isFile ? { content } : { children: [] })
          };
          currentLevel.push(newNode);
          existingNode = newNode;
        } else if (isFile && content !== undefined) {
          existingNode.content = content;
        }

        if (!isFile && existingNode.children) {
          currentLevel = existingNode.children;
        }
      }

      return newFiles;
    });
  }, []);

  const toggleFolder = useCallback((path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }, []);

  const getFileContent = useCallback((path: string): string => {
    const findFile = (nodes: FileNode[], targetPath: string): FileNode | null => {
      for (const node of nodes) {
        if (node.path === targetPath) {
          return node;
        }
        if (node.children) {
          const found = findFile(node.children, targetPath);
          if (found) return found;
        }
      }
      return null;
    };

    const file = findFile(files, path);
    return file?.content || '';
  }, [files]);

  return {
    files,
    expandedFolders,
    parseFilePath,
    toggleFolder,
    getFileContent,
  };
};