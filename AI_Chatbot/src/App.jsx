import "./App.css";
import { useEffect, useId, useRef, useState } from "react";
import { URL } from "./constant.js";
import RecentSearch from "./component/RecentSearch.jsx";
import QuestionAnswer from "./component/QuesttionAnswer.jsx";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setresult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const id = useId();
  const scrollToAnswer = useRef();
  const [loader, setLoader] = useState(false);
  const [darkMode, setDarkMode] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false); // ✅ for mobile menu toggle

  const askQuestion = async () => {
    if (!question && !selectedHistory) return false;
    if (question) {
      let history = JSON.parse(localStorage.getItem("history")) || [];
      history = [question, ...history];
      history = history
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1).trim())
        .slice(0, 17);
      history = [...new Set(history)];
      localStorage.setItem("history", JSON.stringify(history));
      setRecentHistory(history);
    }

    const payloadData = question ? question : selectedHistory;
    const payload = {
      contents: [{ role: "user", parts: [{ text: payloadData }] }],
    };

    setLoader(true);
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      response = await response.json();
      let dataString = response.candidates[0].content.parts[0].text;
      dataString = dataString.split("* ").map((item) => item.trim());
      setresult((prev) => [
        ...prev,
        { type: "q", text: question ? question : selectedHistory },
        { type: "a", text: dataString },
      ]);
      setQuestion("");
      setTimeout(() => {
        if (scrollToAnswer.current) {
          scrollToAnswer.current.scrollTo({
            top: scrollToAnswer.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 500);
      setLoader(false);
      setSelectedHistory("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoader(false);
    }
  };

  const isEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      askQuestion();
    }
  };

  useEffect(() => {
    if (selectedHistory) {
      askQuestion();
      setMenuOpen(false); // ✅ Close menu when history clicked
    }
  }, [selectedHistory]);

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className={darkMode === "dark" ? "dark" : "light"}>
        {/*  Dark/Light selector (Fixed) */}
        <select
          onChange={(event) => setDarkMode(event.target.value)}
          className="hidden md:block rounded-full p-[10px] mt-[-2px] font-semibold fixed dark:bg-zinc-800 bg-indigo-200 dark:text-white text-zinc-800 border dark:border-emerald-900 dark:rounded-full right-0 p-5 "
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>

        {/* 📱 Mobile Hamburger */}
        <div className="md:hidden fixed top-3 left-3 z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-zinc-800 text-white p-2 rounded-md"
          >
            ☰
          </button>
          {menuOpen && (
            <div className="absolute bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700 w-64 rounded-lg p-3 mt-2 shadow-lg">
              <RecentSearch
                recentHistory={recentHistory}
                setRecentHistory={setRecentHistory}
                setSelectedHistory={setSelectedHistory}
              />
              <div className="mt-3">
                <label className="block text-sm dark:text-gray-300">
                  Theme
                </label>
                <select
                  onChange={(event) => setDarkMode(event.target.value)}
                  value={darkMode}
                  className="w-full mt-1 p-2 rounded-md dark:bg-zinc-700 dark:text-white border dark:border-zinc-600"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="grid h-116 md:grid-cols-5  h-screen text-center">
          <div className="hidden md:block  ">
            <RecentSearch
              recentHistory={recentHistory}
              setRecentHistory={setRecentHistory}
              setSelectedHistory={setSelectedHistory}
            />
          </div>

          <div className="col-span-5 md:col-span-4 p-5">
            <h1 className="md:text-5xl text-3xl font-semibold p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-900 pt-5 pl-4 ">
              Hello User, Ask me Anything
            </h1>

            {loader && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 
                    100.591C22.3858 100.591 0 78.2051 0 
                    50.5908C0 22.9766 22.3858 0.59082 50 
                    0.59082C77.6142 0.59082 100 22.9766 
                    100 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 
                    38.4038 97.8624 35.9116 97.0079 
                    33.5539C95.2932 28.8227 92.871 
                    24.3692 89.8167 20.348C85.8452 
                    15.1192 80.8826 10.7238 75.2124 
                    7.41289C69.5422 4.10194 63.2754 
                    1.94025 56.7698 1.05124C51.7666 
                    0.367541 46.6976 0.446843 41.7345 
                    1.27873C39.2613 1.69328 37.813 
                    4.19778 38.4501 6.62326C39.0873 
                    9.04874 41.5694 10.4717 44.0505 
                    10.1071C47.8511 9.54855 51.7191 
                    9.52689 55.5402 10.0491C60.8642 
                    10.7766 65.9928 12.5457 70.6331 
                    15.2552C75.2735 17.9648 79.3347 
                    21.5619 82.5849 25.841C84.9175 
                    28.9121 86.7997 32.2913 88.1811 
                    35.8758C89.083 38.2158 91.5421 
                    39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}

            <div
              ref={scrollToAnswer}
              className="container md:h-auto md:max-h-130 min-h-100 max-h-160 overflow-auto [&::-webkit-scrollbar]:hidden"
            >
              <div className="text-zinc-800 dark:text-zinc-300 ">
                <ul>
                  {result.map((item, index) => (
                    <QuestionAnswer key={index} item={item} index={index} />
                  ))}
                </ul>
              </div>
            </div>

            <div className="dark:bg-zinc-800 bg-red-100 md:w-1/2 w-9/10 m-auto md:p-2 dark:text-white text-zinc-800 md:m-auto rounded-4xl border border-zinc-700 flex md:h-16 ">
              <input
                type="text"
                className="w-full h-full p-3 outline-none"
                placeholder="Ask me anything"
                value={question}
                onKeyDown={isEnterKey}
                onChange={(event) => setQuestion(event.target.value)}
              />
              <button onClick={askQuestion}>Ask</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
