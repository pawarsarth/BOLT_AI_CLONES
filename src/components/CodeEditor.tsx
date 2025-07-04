import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onChange,
  readOnly = false,
}) => {
  const handleEditorChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="h-full border border-gray-700 rounded-lg overflow-hidden">
      <Editor
  height="100%"
  language={language}
  value={code}
  onChange={handleEditorChange}
  theme="vs-dark"
  options={{
    readOnly,
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
      verticalSliderSize: 12,
      horizontalSliderSize: 12,
    },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
  }}
/>

    </div>
  );
};

export default CodeEditor;
