import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const handleCopyToClipboard = async () => {
    const recipeId = location.pathname.split('/')[2];
    const recipeType = location.pathname.split('/')[1];
    const recipeLink = `http://localhost:3000/${recipeType}/${recipeId}`;

    try {
      await navigator.clipboard.writeText(recipeLink);
      setCopied(true);
    } catch (error) {
      console.error('Erro ao copiar o link: ', error);
    }
  };

  return (
    <div>
      <button
        style={ {
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          padding: 0,
        } }
        onClick={ handleCopyToClipboard }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Ícone de compartilhamento"
          style={ { width: '50px', height: '50px' } }
        />
      </button>

      {copied && <p data-testid="copied-message">Link copied!</p>}
    </div>
  );
}
