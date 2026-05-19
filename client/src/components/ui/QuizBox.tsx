import React, { useState, useEffect } from 'react'

interface QuizBoxProps {
questions: {
    question: string,
    answer: string,
    options: string[]
}[]
}

function QuizBox() {
    const [questions, setQuestions ]= useState<QuizBoxProps['questions']>([]);
    const[selectedOption, setSelectedOption] = useState<{usersChoice: string, question: string, answer: string}[]>([]);

    const checkResutt = ()=>{
        let score = 0;
        selectedOption.forEach((opt)=>{
            const question = opt.question;
            const userChoice = opt.usersChoice;
            const correctAnswer = opt.answer;
            if (userChoice === correctAnswer) {
                score++;
            }
        });
        alert(`Your score is: ${score}/${selectedOption.length}`);
        console.log(`Your score is: ${score}/${selectedOption.length}`);
    }

    useEffect(() => {
        // Mock data for quiz questions
        const mockQuestions: QuizBoxProps['questions'] = [
            {
                question: "What is the capital of France?",
                answer: "Paris",
                options: ["Paris", "London", "Berlin", "Madrid"]
            },
            {
                question: "What is 2 + 2?",
                answer: "4",
                options: ["3", "4", "5", "6"]
            },
            {
                question: "Who wrote 'To Kill a Mockingbird'?",
                answer: "Harper Lee",
                options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
            }
        ];
        setQuestions(mockQuestions);
    },[]);
  return (
    <div className='flex flex-col justify-between'>
        <p className='font-bold text-lg text-center py-4 border-b border-gray-600/50'>QuizBox</p>
        <div className='w-full h-[500px]  scroll-auto overflow-scroll'>
            {questions.map((question, index)=>{
                return (
                  <div key={index} className=' bg-gray-800/50 border border-gray-600/50 flex flex-col m-2 p-4 rounded-lg gap-4'>
                    <h1>{question.question}</h1>
                    <p>Correct Answer : ${question.answer}</p>
                    <div className='grid grid-cols-2 gap-4'>
                      {question.options.map((opt, index) => {
                        return (
                          <div
                            key={index}
                            onClick={()=>{

                                setSelectedOption((prev)=>([...prev, {usersChoice: opt, question: question.question, answer: question.answer}]));
                            }}
                            className={`bg-gray-800/50 border border-gray-600/50 min-w-[80px] rounded-md px-2 py-1 flex justify-center items-center hover:bg-gray-600/50 hover:cursor-pointer hover:border-gray-800/50 transition-all ease-in-out duration-300 click
                                 `}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
            })}
        </div>

        <button onClick={checkResutt} className='w-full h-[50px] bg-gray-800/90 border border-gray-600/50 rounded-2xl text-center px-2 py-1 hover:bg-linear-to-r from-sky-500 to-blue-500 transition-all ease-in-out duration-300 cursor-pointer'>
            Submit
        </button>

    </div>
  )
}

export default QuizBox