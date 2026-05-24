interface SummaryDisplayProps {
  summary: string;
  type : "summary" | "explanation";
}

function SummaryDisplay({summary, type} : SummaryDisplayProps) {
  return (
    <div className="w-full h-full p-4">
      <h2 className="text-lg font-semibold mb-2">{type === "summary" ? "Summary Generated!" : "Explanation:"}</h2>
      <p>{type === "summary" ? "Here is a summary of your file:" : "Here is an explanation of your file in simple terms:"}</p>
      <div className="mt-4 p-4 bg-gray-700 rounded-lg">
        {summary}
      </div>
    </div>
  )
}

export default SummaryDisplay;