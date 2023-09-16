import './App.css';
import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('disastergirl');
  const [memeImageSrc, setMemeImageSrc] = useState('');
  const inputRef = useRef(null);
  A;

  useEffect(() => {
    if (selectedTemplate === 'doge') {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [selectedTemplate]);

  const generateMeme = () => {
    const apiUrl = `https://api.memegen.link/images/${selectedTemplate}/${encodeURIComponent(
      topText,
    )}/${encodeURIComponent(bottomText)}.jpg`;

    setMemeImageSrc(apiUrl);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const handleDownload = () => {
    if (memeImageSrc) {
      fetch(memeImageSrc)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'meme.jpg';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('There was a problem with the download', error);
        });
    }
  };

  return (
    <div className="app-container">
      <div className="container">
        <img
          src={
            memeImageSrc || `https://api.memegen.link/images/disastergirl/.jpg`
          }
          alt="Meme"
          data-test-id="meme-image"
          className="meme-img"
        />

        <h1 className="headline">Meme Generator</h1>

        <label htmlFor="template">Meme template:</label>
        <select
          id="template"
          value={selectedTemplate}
          onChange={handleTemplateChange}
        >
          <option value="disastergirl">Disaster Girl</option>
          <option value="doge">Doge</option>
          <option value="drake">Drake</option>
        </select>
        <br />
        <label htmlFor="topText">Top text:</label>
        <input
          id="topText"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <br />
        <label htmlFor="bottomText">Bottom text:</label>
        <input
          id="bottomText"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          ref={inputRef}
        />
        {/* Use ref here */}

        <br />
        <button onClick={generateMeme}>Generate Meme</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}
