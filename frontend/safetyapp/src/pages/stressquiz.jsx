// import React, { useState } from 'react';
// import '../styles/stressquiz.css';
// import { useNavigate } from 'react-router-dom';

// const StressQuiz = () => {
//   const questions = [
//     {
//       question: "In the LAST MONTH, how often have you been upset because of something that happened unexpectedly?",
//     },
//     {
//       question: "In the LAST MONTH, how often have you felt that you were unable to control important things in your life?",
//     },
//     {
//       question: "In the LAST MONTH, how often have you felt nervous and 'stressed'?",
//     },
//     {
//       question: "In the LAST MONTH, how often have you felt confident about your ability to handle your personal problems?",
//     },
//     {
//       question: "In the LAST MONTH, how often have you felt that things were going your way?",
//     },
//     {
//       question: "In the LAST MONTH, how often have you found that you could NOT cope with all the things you had to do?",
//     },
//     {
//       question: "In the LAST MONTH, how often have you been able to control irritations in your life?",
//     },
//     {
//       question: "In the LAST MONTH, how often have you felt that you were on top of things?",
//     },
//     // {
//     //   question: "In the LAST MONTH, how often have you been angered because of things that happened that were out of your control?",
//     // },
//     // {
//     //   question: "In the LAST MONTH, how often have you felt difficulties were piling up so high that you could not overcome them?",
//     // },
//   ];

//   const answerScores = {
//     "Never": 0,
//     "Almost Never": 1,
//     "Sometimes": 2,
//     "Fairly Often": 3,
//     "Very Often": 4,
//   };
  
//   const reversedQuestions = [3, 4, 6];
//   const [responses, setResponses] = useState(Array(questions.length).fill(''));
//   const [submitted, setSubmitted] = useState(false);

//   const handleAnswer = (index, answer) => {
//     const newResponses = [...responses];
//     newResponses[index] = answer;
//     setResponses(newResponses);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   const calculateScore = () => {
//     const maxScorePerQuestion = 4;
//     const totalQuestions = responses.length;
//     const maxScore = totalQuestions * maxScorePerQuestion;

//     const totalScore = responses.reduce((score, answer, index) => {
//       let answerScore = answerScores[answer] || 0;

//       if (reversedQuestions.includes(index)) {
//         answerScore = maxScorePerQuestion - answerScore;
//       }

//       return score + answerScore;
//     }, 0);

//     const percentageScore = (totalScore / maxScore) * 100;

//     return {
//       totalScore,
//       percentageScore,
//     };
//   };

//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate('/doctor'); 
//   };

//   const result = calculateScore();

//   return (
//     <div className='stress'>
//       <h4>TEST YOUR STRESS</h4>
//       <h1>Knowing your current level of stress is the first step in taking control</h1>
//       {!submitted ? (
//         <form onSubmit={handleSubmit}>
//           {questions.map((q, index) => (
//             <div key={index}>
//               <p>{q.question}</p>
//               {Object.keys(answerScores).map(answer => {
//                 const radioId = `question-${index}-${answer}`;
//                 return (
//                   <div key={answer}>
//                     <input
//                       type="radio"
//                       id={radioId}
//                       name={`question-${index}`}
//                       value={answer}
//                       checked={responses[index] === answer}
//                       onChange={() => handleAnswer(index, answer)}
//                       required
//                     />
//                     <label htmlFor={radioId}>{answer}</label>
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//           <button type="submit">Submit</button>
//         </form>
//       ) : (
//         <div>
//           <h2>Your stress level: {result.percentageScore}%</h2>
//           <h3>Stress Level:</h3>
//           <p className='level'><strong>
//             {result.percentageScore <= 40 && "Low Stress"}
//             {result.percentageScore > 40 && result.percentageScore <= 60 && "Moderate Stress"}
//             {result.percentageScore > 60 && result.percentageScore <= 80 && "High Stress"}
//             {result.percentageScore > 80 && (
//               <>
//                 Very High Stress
//                 <button onClick={handleNavigate} className="stressb">Consult A Doctor</button>
//               </>
//             )}
//           </strong></p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StressQuiz;
import React, { useState } from 'react';
import Chatbot from './Chatbot'; // Import the Chatbot component

const StressQuiz = () => {
  const questions = [
        {
          question: "In the LAST MONTH, how often have you been upset because of something that happened unexpectedly?",
        },
        {
          question: "In the LAST MONTH, how often have you felt that you were unable to control important things in your life?",
        },
        {
          question: "In the LAST MONTH, how often have you felt nervous and 'stressed'?",
        },
        {
          question: "In the LAST MONTH, how often have you felt confident about your ability to handle your personal problems?",
        },
        {
          question: "In the LAST MONTH, how often have you felt that things were going your way?",
        },
        {
          question: "In the LAST MONTH, how often have you found that you could NOT cope with all the things you had to do?",
        },
        {
          question: "In the LAST MONTH, how often have you been able to control irritations in your life?",
        },
        {
          question: "In the LAST MONTH, how often have you felt that you were on top of things?",
        },
        // {
        //   question: "In the LAST MONTH, how often have you been angered because of things that happened that were out of your control?",
        // },
        // {
        //   question: "In the LAST MONTH, how often have you felt difficulties were piling up so high that you could not overcome them?",
        // },
      ];
    

  const answerScores = {
    "Never": 0,
    "Almost Never": 1,
    "Sometimes": 2,
    "Fairly Often": 3,
    "Very Often": 4,
  };

  const reversedQuestions = [3, 4, 6];
  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (index, answer) => {
    const newResponses = [...responses];
    newResponses[index] = answer;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const calculateScore = () => {
    const maxScorePerQuestion = 4;
    const totalQuestions = responses.length;
    const maxScore = totalQuestions * maxScorePerQuestion;

    const totalScore = responses.reduce((score, answer, index) => {
      let answerScore = answerScores[answer] || 0;

      if (reversedQuestions.includes(index)) {
        answerScore = maxScorePerQuestion - answerScore;
      }

      return score + answerScore;
    }, 0);

    const percentageScore = (totalScore / maxScore) * 100;

    return {
      totalScore,
      percentageScore,
    };
  };

  const result = calculateScore();

  return (
    <div className='stress'>
      <h4>TEST YOUR STRESS</h4>
      <h1>Knowing your current level of stress is the first step in taking control</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index}>
              <p>{q.question}</p>
              {Object.keys(answerScores).map(answer => {
                const radioId = `question-${index}-${answer}`;
                return (
                  <div key={answer}>
                    <input
                      type="radio"
                      id={radioId}
                      name={`question-${index}`}
                      value={answer}
                      checked={responses[index] === answer}
                      onChange={() => handleAnswer(index, answer)}
                      required
                    />
                    <label htmlFor={radioId}>{answer}</label>
                  </div>
                );
              })}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="result">
          <h2>Stress Level: {result.percentageScore}%</h2>
          <Chatbot stressScore={result.percentageScore} /> {/* Pass stress score to Chatbot */}
        </div>
      )}
    </div>
  );
};

export default StressQuiz;
