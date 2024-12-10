import React, { useRef, useState } from 'react'
import './Quiz.css';
import { data } from '../../assets.js/data';


const Quiz = () => {

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [score, setScore] = useState(0)

  // prohibitng user to select multiple options
  let [lock, setLock] = useState(false);
  let [result, setResult] = useState(false);

  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)
  let option5 = useRef(null)

  let optionsArr = [option1, option2, option3, option4, option5]


  const checkAnswer = (e, answer) => {
    if (lock === false) {
      if (question.answer === answer) {
        e.target.classList.add('correctAnswer');
        setLock(true);

        // when the answer is right increase score by 1
        setScore(prevScore => prevScore + 1)
      }
      else {
        e.target.classList.add('inCorrectAnswer');
        setLock(true)

        // if user selects the wrong answer then it will automatically show the correct answer as well
        optionsArr[question.answer - 1].current.classList.add("correctAnswer")
      }
    }
  }

  const nextQuestion = () => {
    // Next button will be disabled if we havnt clicked on any option
    if (lock === true) {

      // this will stop the Next button to be clicked after the 5th question
      if (index === data.length - 1) {
        setResult(true)
        return 0;
      }
      //-----------------------------------------------------------------

      setIndex(++index);
      setQuestion(data[index])
      setLock(false);
      optionsArr.map((option) => {
        option.current.classList.remove("correctAnswer");
        option.current.classList.remove("inCorrectAnswer");
        return null;
      })
    }
    else {

    }
  }

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? <></> :
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => { checkAnswer(e, 1) }}>{question.option1}</li>
            <li ref={option2} onClick={(e) => { checkAnswer(e, 2) }}>{question.option2}</li>
            <li ref={option3} onClick={(e) => { checkAnswer(e, 3) }}>{question.option3}</li>
            <li ref={option4} onClick={(e) => { checkAnswer(e, 4) }}>{question.option4}</li>
            <li ref={option5} onClick={(e) => { checkAnswer(e, 5) }}>{question.option5}</li>
          </ul>
          <button onClick={nextQuestion}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      }
      {result ? <>
        <h2>You scored {score} out of {data.length}</h2>
        <button onClick={resetQuiz}>Try Again ?</button>
      </> :
        <></>
      }

    </div>
  )
}

export default Quiz