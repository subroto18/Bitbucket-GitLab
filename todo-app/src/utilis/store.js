import todoSlice from "./todoSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    app: todoSlice,
  },
});
export default store;
