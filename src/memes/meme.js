import React, { useState, useEffect } from 'react';

async function fetchRedditMemes() {
  const apiUrl = 'https://www.reddit.com/r/memes.json';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.data.children.map(post => ({
      title: post.data.title,
      url: post.data.url,
    }));
  } catch (error) {
    console.error('Error fetching memes:', error);
    return [];
  }
}

const MemeComponent = () => {
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState(null);
  const [buttonColor, setButtonColor] = useState('#000');

  useEffect(() => {
    const loadMemes = async () => {
      const fetchedMemes = await fetchRedditMemes();
      setMemes(fetchedMemes);
      setCurrentMeme(fetchedMemes[0]); // Set the first meme as the current meme
    };
    loadMemes();
  }, []);

  const handleNewMeme = () => {
    if (memes.length > 0) {
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      setCurrentMeme(randomMeme);

      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      setButtonColor(randomColor);
    }
  };

  return (
    <div className="meme-container">
      {currentMeme && (
        <div>
          <img src={currentMeme.url} alt="Meme" className="meme-image" /> {/* Removed title */}
        </div>
      )}
      <button
        onClick={handleNewMeme}
        className="meme-button"
        style={{ backgroundColor: buttonColor }}
      >
        #Meme Me!
      </button>
    </div>
  );
};

export default MemeComponent;

