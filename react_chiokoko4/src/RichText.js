import React, { useState, useEffect } from "react";

const RichText = ({ content }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
      setHtml(content);
    }, [content]);
    
    if (!content) {
        return <div></div>
    }
  const paragraphs = html.split("\n").map((paragraph, index) => (
    <p key={index}>{paragraph.replace(/\s/g, '\u00A0')}</p>
  ));

  return <div>{paragraphs}</div>;
};

export default RichText;
