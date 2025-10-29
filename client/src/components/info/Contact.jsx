import React from "react";

export const Contact = ({ title, url, text, color, bg }) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="w-24 text-[rgba(0,0,0,.7)]">{title}</p>

      <a
        href={url}
        className="p-2.5 rounded-lg border"
        style={{
          borderColor: color,
          color: color,
          background: bg,
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    </div>
  );
};
