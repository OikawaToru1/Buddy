import { useState, useEffect } from 'react'
import Loading from './Loader';

interface QuizBoxProps {
  questions: {
    question: string
    answer: string
    options: string[]
  }[]
}

function QuizBox({ quizData, fileName }: { quizData: string | null; fileName: string | undefined }) {
    const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizBoxProps['questions']>([]);
  
  // Record<question, chosenOption> — isolated per question, no cross-highlight
  const [activeOptions, setActiveOptions] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  
  // Use real quizData, fall back to mock only if null
  useEffect(() => {
   if(!quizData && fileName){
    setLoading(true);
    return;
   }

   try{
    const parsed = JSON.parse(quizData!) as QuizBoxProps['questions'];
    console.log(parsed, "Parsed quiz data in useEffect", typeof(parsed));
    setQuestions(parsed);
    setLoading(false);
   }catch(err){
    console.log("Error in parsing quiz data in QuizBox", err);
    setLoading(false);
   }
   finally{
    setLoading(false);
   }
    
  }, [quizData]); // re-run when quizData changes

  const handleSelectedOption = (question: string, opt: string) => {
    if (submitted) return; // lock after submit
    // Simply overwrite the selection for this question — no array juggling needed
    setActiveOptions(prev => ({ ...prev, [question]: opt }));
  };

  const checkResult = () => {
    if (submitted) return;
    let count = 0;
    questions.forEach(q => {
      if (activeOptions[q.question] === q.answer) count++;
    });
    setScore(count);
    setSubmitted(true);
  };

  return (
    <div className="relative flex flex-col justify-between">
      <h2 className="font-bold text-2xl text-center py-4 border-b border-gray-600/50">
        {submitted
          ? `Your Score: ${score} / ${questions.length}`
          : `Take the Quiz${fileName ? ` on "${fileName}"` : ""}`}
      </h2>

      <div className="w-full h-100 overflow-y-auto">
        {loading ? (
          <Loading />
        ) : questions?.length === 0 ? (
          "No quiz available. Please try creating a quiz from the options on the left."
        ) : (
          questions?.map((question, index) => {
            const selected = activeOptions[question.question];

            return (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-600/50 flex flex-col m-2 p-4 rounded-lg gap-4"
              >
                <h1 className="font-medium">{question.question}</h1>

                {submitted && (
                  <p className="text-sm text-gray-400">
                    Correct Answer:{" "}
                    <span className="text-green-400">{question.answer}</span>
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {question.options.map((opt, optIndex) => {
                    const isSelected = selected === opt;

                    const highlight = submitted
                      ? opt === question.answer
                        ? "bg-green-700 border-green-600"
                        : isSelected
                          ? "bg-red-700 border-red-600"
                          : "bg-gray-800/50 border-gray-600/50"
                      : isSelected
                        ? "bg-green-800 border-green-700"
                        : "bg-gray-800/50 border-gray-600/50";

                    return (
                      <div
                        key={optIndex}
                        onClick={() =>
                          handleSelectedOption(question.question, opt)
                        }
                        className={`
                        border min-w-20 rounded-md px-2 py-1
                        flex justify-center items-center
                        transition-all ease-in-out
                        ${
                          submitted
                            ? "cursor-default"
                            : "hover:bg-gray-600/50 hover:cursor-pointer hover:border-gray-800/50"
                        }
                        ${highlight}
                      `}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={checkResult}
        disabled={submitted}
        className="w-full h-12 bg-gray-800/90 border border-gray-600/50 rounded-2xl
          text-center px-2 py-1 transition-all ease-in-out duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-500 cursor-pointer"
      >
        {submitted ? "Submitted" : "Submit"}
      </button>
    </div>
  );
}

export default QuizBox