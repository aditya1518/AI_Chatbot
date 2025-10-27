import { Answer } from "./Answers.jsx";

const QuestionAnswer = ({ item, index }) => {
  return (
    <>
      <div
        key={index}
        className={item.type === "q" ? "flex justify-end" : ""}
      >
        {item.type === "q" ? (
          <li
            className="text-right border-3 dark:bg-zinc-700 bg-red-100 border-red-100 dark:border-zinc-700 rounded-tl-4xl rounded-br-4xl rounded-bl-4xl w-fit items-center m-1 px-4 pb-3"
            key={`q-${index}`}
          >
            <Answer
              ans={item.text}
              totalRes={1}
              index={index}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((ansItem, ansIndex) => (
            <li className="text-left p-1" key={`a-${index}-${ansIndex}`}>
              <Answer
                ans={ansItem}
                totalRes={item.text.length}
                index={ansIndex}
                type={item.type}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionAnswer;
