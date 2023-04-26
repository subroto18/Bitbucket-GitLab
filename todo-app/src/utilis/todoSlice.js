const { createSlice } = require("@reduxjs/toolkit");

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    list: [],
    input: "",
    marked: {},
  },

  reducers: {
    updateListData: (state, action) => {
      if (action.payload !== "") {
        if (state.list.indexOf(action.payload) === -1) {
          state.list.push(action.payload);
        }
        state.input = "";
      }
    },
    changeInputData: (state, action) => {
      state.input = action.payload;
    },
    updateMark: (state, action) => {
      state.marked[action.payload] = state.marked[action.payload] ? 0 : 1;
    },
    removeList: (state, action) => {
      let items = state.list;
      const index = state.list.indexOf(action.payload);
      if (index > -1) {
        // only splice array when item is found
        items.splice(index, 1); // 2nd parameter means remove one item only
      }

      console.log(items);
      state.list = items;
    },
  },
});

export const { updateListData, changeInputData, updateMark, removeList } =
  todoSlice.actions;

export default todoSlice.reducer;
