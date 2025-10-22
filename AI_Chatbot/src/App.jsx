import "./App.css";
import { useState } from "react";
import { URL } from "./constant.js";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setresult] = useState(undefined);
  const payload = {
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": question,
          },
        ],
      },
    ],
  };
  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify(payload),
    });
    response = await response.json();
    console.log(response.candidates[0].content.parts[0]); 
    setresult(response.candidates[0].content.parts[0].text);
  };
  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800 ">ok</div>
        <div className="col-span-4 p-10">
          <div className="container h-110 overflow-scroll">
            <div className="text-white">
              {result}
            </div>
          </div>
          <div className="bg-zinc-800 w-1/2  p-1 text-white m-auto  rounded-4xl border border-zinc-700 flex h-16 ">
            <input
              type="text"
              className="w-full h-full p-3 outline-none"
              placeholder="Ask me anything"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            ></input>
            <button onClick={askQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
