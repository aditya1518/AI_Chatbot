function RecentSearch({ recentHistory, setRecentHistory, setSelectedHistory }) {
  const clearHistory = () => {
    localStorage.clear("history");
    setRecentHistory([]);
  };
  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history"));
    history = history.filter((item) => {
      if (item !== selectedItem) {
        return item;
      }
    });
    setRecentHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
  };
  return (
    <>
      <div className="col-span-1 dark:bg-zinc-800 bg-red-100 pt-3">
        <h1 className="text-3xl font-bold dark:text-white text-zinc-800 flex justify-between pl-12">
          {" "}
          
          <span>Recent Search</span>
          <div className="pr-3 flex items-center">
            <button
              className="cursor-pointer  hover:bg-zinc-600 bg-zinc-800"
              onClick={clearHistory}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#e3e3e3"
              >
                <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
              </svg>
            </button>
          </div>
        </h1>
        <ul className="text-left  overflow-auto mt-2 ">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <div className="flex justify-between pr-3 py-1">
                <li
                  key={index}
                  onClick={() => setSelectedHistory(item)}
                  className="w-full  p-1 px-5 pl-5 text-zinc-800 dark:text-zinc-400 cursor-pointer dark:hover:bg-zinc-700 hover:bg-red-200 hover:text-zinc-800 dark:hover:text-zinc-200 truncate"
                >
                  {" "}
                  {item}{" "}
                </li>
                <button
                  className="cursor-pointer hover:bg-zinc-600 bg-zinc-800"
                  onClick={() => clearSelectedHistory(item)}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="0 -960 960 960"
                    width="25px"
                    fill="#e3e3e3"
                  >
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                  </svg>
                </button>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}
export default RecentSearch;
