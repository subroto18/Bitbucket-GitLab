import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeData, changeLoading, changeSearch } from "./utilis/weatherSlice";
import "../src/index.css";
import { API_CALL_INTERVEL, API_KEY } from "./utilis/helpers";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.app.data);
  const search = useSelector((store) => store.app.search);
  const loading = useSelector((store) => store.app.loading);

  const timeOut = useRef(null);

  const opt = {
    key: API_KEY,
    api: "https://api.openweathermap.org/data/2.5/",
  };

  useEffect(() => {
    getData();

    return () => {
      timeOut.current = null;
    };
  }, [search]);

  const getData = async () => {
    timeOut.current = setTimeout(async () => {
      dispatch(changeLoading(true));
      const data = await fetch(
        `${opt.api}weather?q=${search}&appid=${opt.key}`
      );
      const result = await data.json();
      dispatch(changeData(result));
      dispatch(changeLoading(false));
    }, API_CALL_INTERVEL);
  };

  const temp = data.main?.temp;
  const sky = data.weather?.[0].main;
  const description = data.weather?.[0].description;
  const icon = data.weather?.[0].icon;

  return (
    <div className="App flex justify-center align-baseline mt-[10rem]">
      <div className="bg-slate-200 h-[20rem] w-[40rem] text-center">
        <h1 className="text-3xl text-center py-5 font-bold ">Weather App</h1>
        <div>
          <input
            onChange={(e) => dispatch(changeSearch(e.target.value))}
            placeholder="Search city or country"
            className="bg-gray-200 appearance-none border-2 border-gray-400 border-r-0 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            value={search}
          />
          <button
            onClick={() => getData()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-l-0"
          >
            Search
          </button>
        </div>

        <h2 className="py-2 text-2xl font-fold">{search}</h2>

        <div>
          {loading ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            <div>
              {temp ? (
                <div>
                  <p>{temp}</p>
                  <p>{sky}</p>
                  <p>{description}</p>
                </div>
              ) : (
                <p className="bg-slate-300 w-[80%] m-auto">
                  Please provide a valid input. exp: "Kolkata"
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
