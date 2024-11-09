import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../styles/guess.css';

const GuessTheWord = () => {
  const words = [
    "horse", "zebra", "shark", "whale", "frog", "snake", "mouse",
    "koala", "panda", "eagle", "rabbit", "giraffe", "jaguar", "donkey", "parrot"
  ];

  const maxGuesses = 7;
  const [targetWord, setTargetWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(maxGuesses);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord);
  }, []);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameOver) return;
    
    setGuessedLetters([...guessedLetters, letter]);
    
    if (!targetWord.includes(letter)) {
      setRemainingGuesses(remainingGuesses - 1);
    }
  };

  useEffect(() => {
    if (remainingGuesses === 0) {
      setGameOver(true);
    } else if (
      guessedLetters.length > 0 && // Ensure at least one guess was made
      targetWord.split("").every(letter => guessedLetters.includes(letter))
    ) {
      setGameOver(true);
      setHasWon(true);
    }
  }, [remainingGuesses, guessedLetters, targetWord]);
  const renderWord = () => {
    return targetWord.split("").map((letter, index) =>
      guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
  };

  const resetGame = () => {
    setRemainingGuesses(maxGuesses);
    setGuessedLetters([]);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord);
    setGameOver(false);
    setHasWon(false); // Reset win state
  };

  return (
    <div className='guess'>
      <h1>Guess the Animal</h1>
      <p>Word: {renderWord()}</p>
      <p>Remaining Guesses: {remainingGuesses}</p>
      
      <div className="alphabet-container">
        {"abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || gameOver}
          >
            {letter}
          </button>
        ))}
      </div>

      {gameOver && (
        <div>
          <h2>{remainingGuesses === 0 ? "Game Over!" : "You Won!"}</h2>
          <p>The word was: {targetWord}</p>
          <button onClick={resetGame} className="playagain">Play Again</button>
        </div>
      )}

      {hasWon && <Confetti />}
    </div>
  );
};

export default GuessTheWord;
