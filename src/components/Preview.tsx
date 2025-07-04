import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  htmlContent: string;
  onRefresh?: () => void;
}

const Preview: React.FC<PreviewProps> = ({ htmlContent, onRefresh }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && htmlContent) {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument;
      if (document) {
        document.open();
        document.write(htmlContent);
        document.close();
      }
    }
  }, [htmlContent]);

  return (
    <div className="w-full h-full border border-gray-600 rounded overflow-hidden relative">
      <iframe
        ref={iframeRef}
        title="Website Preview"
        className="w-full h-full bg-white"
        sandbox="allow-scripts allow-same-origin"
      />
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="absolute top-2 right-2 text-sm px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Refresh
        </button>
      )}
    </div>
  );
};

export default Preview;
