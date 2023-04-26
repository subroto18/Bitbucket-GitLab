import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "./utilis/store";
import {
  changeInputData,
  updateListData,
  updateMark,
  removeList,
} from "./utilis/todoSlice";

const TodoApp = () => {
  const dispatch = useDispatch();
  const list = useSelector((store) => store.app.list);
  const marked = useSelector((store) => store.app.marked);
  const inputData = useSelector((store) => store.app.input);

  //   useEffect(() => {}, [todo]);

  const handleChange = () => {
    dispatch(updateListData(inputData));
  };

  const handleChangeCheck = (key) => {
    dispatch(updateMark(key));
  };

  const handleRemove = (key) => {
    dispatch(removeList(key));
  };

  console.log(list, "list");

  //  console.log(marked, "marked");
  return (
    <div className="bg-slate-200  mt-[10rem] text-center w-[80%] m-auto">
      <div className="py-5">
        <h1 className="text-2xl pt-4">To-Do app</h1>
        <div>
          <input
            onChange={(e) => dispatch(changeInputData(e.target.value))}
            className="shadow appearance-none border rounde py-2 px-4
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your task"
            value={inputData}
          />
          <button
            onClick={() => handleChange()}
            className="rounded-none bg-slate-300 py-2 px-4 ml-2"
          >
            Add
          </button>
        </div>
        <div>
          <div>
            {list.map((data, index) => {
              let markedKey = Object.keys(marked).find(
                (key) => marked[key] === marked[index]
              );

              let markedListItem = index == markedKey && marked[index];

              return (
                <div className="flex justify-center py-2">
                  <input
                    onClick={() => handleChangeCheck(index)}
                    type="checkbox"
                  />
                  {markedListItem ? (
                    <p className="">
                      <del className="text-green">{data}</del>
                    </p>
                  ) : (
                    <p className="">{data}</p>
                  )}

                  <button
                    onClick={() => handleRemove(data)}
                    className="rounded-none bg-slate-300 py-2 px-4 ml-2"
                  >
                    remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
