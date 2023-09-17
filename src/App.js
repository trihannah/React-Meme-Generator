import './App.css';
import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [topText, setTopText] = useState('Enter top text');
  const [bottomText, setBottomText] = useState('Enter bottom text');

  const [selectedTemplate, setSelectedTemplate] = useState('disastergirl');
  const [memeImageSrc, setMemeImageSrc] = useState('');
  const inputRef = useRef(null);

  const memeTemplates = ['disastergirl', 'doge', 'drake'];

  useEffect(() => {
    if (selectedTemplate === 'doge') {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [selectedTemplate]);

  const generateMeme = () => {
    // Randomly select a meme template from the array
    const randomIndex = Math.floor(Math.random() * memeTemplates.length);
    const randomTemplate = memeTemplates[randomIndex];

    // Construct the API URL with the current text values
    const apiUrl = `https://api.memegen.link/images/${randomTemplate}/${encodeURIComponent(
      topText,
    )}/${encodeURIComponent(bottomText)}.jpg`;

    console.log('Constructed API URL:', apiUrl);

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

        <button onClick={generateMeme}>Generate Meme</button>

        <div>
          <label htmlFor="template">Meme template:</label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            {memeTemplates.map((template) => (
              <option key={`template-${template}`} value={template}>
                {template.charAt(0).toUpperCase() + template.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="topText">Top text:</label>
          <input
            id="topText"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateMeme()}
          />

          <label htmlFor="bottomText">Bottom text:</label>
          <input
            id="bottomText"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateMeme()}
          />
        </div>

        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}
