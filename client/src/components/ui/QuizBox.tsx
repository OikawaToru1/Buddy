import  { useState, useEffect  } from 'react'

interface QuizBoxProps {
questions: {
    question: string,
    answer: string,
    options: string[]
}[]
}

function QuizBox() {
    const [questions, setQuestions ]= useState<QuizBoxProps['questions']>([]);
    const [selectedOption, setSelectedOption] = useState<{ userchoice: string, question : string, answer: string }[]>([]);
    const [activeOptions, setActiveOptions] = useState< string []>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    const handleSelectedOption = (current_question : string, option: string, answer : string) => {
        
        const question = current_question;
        const userChoice = option;


        // Check if the user has already selected an option for this question
        const existingSelection = selectedOption.some((option)=> option.question == question);
        if(existingSelection)
        {
            const filteredOptions = selectedOption.filter(option => option.question!== question)
            filteredOptions.push({userchoice : userChoice, question, answer});
            console.log("FilteredOptions are", filteredOptions)
            setActiveOptions([]);
            filteredOptions.map(option => (setActiveOptions(prev=> [...prev, option.userchoice])));
            



           
        }
        else{
            setSelectedOption((prev)=> ([...prev, {userchoice: userChoice, question : question, answer : answer} ]));
            setActiveOptions(prev=> [...prev, userChoice]);

        }
    }
    

    const checkResult = ()=>{
        let score = 0;
        selectedOption.map(options => {
            if(options.answer == options.userchoice)
            {
                score = score + 1;
            }
        })
        console.log("Final Score is ", score);
        setScore(score);
        setSubmitted(true);
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
    <div className='relative flex flex-col justify-between'>
        <h2 className=' font-bold text-2xl text-center py-4 border-b border-gray-600/50'>
            {submitted ? `Your Score is ${score} / ${questions.length}` : "Take the Quiz!"}
        </h2>
        <p className='font-bold text-lg text-center py-4 border-b border-gray-600/50'>QuizBox</p>
        <div className='w-full h-100  scroll-auto overflow-scroll'>
            {questions.map((question, index)=>{
                return (
                  <div key={index} className=' bg-gray-800/50 border border-gray-600/50 flex flex-col m-2 p-4 rounded-lg gap-4'>
                    <h1>{question.question}</h1>
                   {submitted && <p className='text-sm text-gray-400'>Correct Answer is : {question.answer}</p>}
                    <div className='grid grid-cols-2 gap-4'>
                      {question.options.map((opt, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() =>
                              handleSelectedOption(
                                question.question,
                                opt,
                                question.answer,
                              )
                            }
                            className={`bg-gray-800/50 border border-gray-600/50 min-w-20 rounded-md px-2 py-1 flex justify-center items-center hover:bg-gray-600/50 hover:cursor-pointer hover:border-gray-800/50 transition-all ease-in-out  
                            ${activeOptions.some((option) => option === opt) ? "bg-green-800" : "bg-gray-800/50 border-gray-600/50"}
                            ${submitted ? (opt === question.answer ? "bg-green-700" : "bg-red-700") : ""}    
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

        <button onClick={checkResult} className='w-full h-12.5 bg-gray-800/90 border border-gray-600/50 rounded-2xl text-center px-2 py-1 hover:bg-linear-to-r from-sky-500 to-blue-500 transition-all ease-in-out duration-300 cursor-pointer'>
            Submit
        </button>

    </div>
  )
}

export default QuizBox