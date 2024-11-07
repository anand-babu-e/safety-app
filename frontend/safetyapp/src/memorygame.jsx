// src/MemoryGame.js
import React, { useState, useEffect } from 'react';
import './MemoryGame.css';
import Confetti from 'react-confetti';


const cardImages = [
  '/images/card1.jpg',
  '/images/card2.jpg',
  '/images/card3.jpg',
  '/images/card4.jpg',
  '/images/card5.jpg',
  '/images/card6.jpg',
  '/images/card7.jpg',
  '/images/card8.jpg',
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .map((card) => ({ src: card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card.src)) {
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.src === secondCard.src) {
        setMatchedCards((prev) => [...prev, firstCard.src]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === cardImages.length) {
      setGameOver(true);
    }
  }, [matchedCards]);

  const restartGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    // Reshuffle the cards
    const shuffledCards = [...cardImages, ...cardImages]
      .map((card) => ({ src: card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <div>Moves: {moves}</div>
      {gameOver &&  <div className="game-over">You Win! Moves: {moves}</div>}
      {gameOver && <Confetti />}
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${flippedCards.includes(card) || matchedCards.includes(card.src) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            {flippedCards.includes(card) || matchedCards.includes(card.src) ? (
              <img src={card.src} alt="Card" />
            ) : (
              <div className="card-back">⭐</div> // Placeholder for the card back
            )}
          </div>
        ))}
      </div>
      {gameOver && <button onClick={restartGame}>Restart</button>}
     
    </div>
  );
};

export default MemoryGame;
