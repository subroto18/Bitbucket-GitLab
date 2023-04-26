import weatherSlice from "./weatherSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    app: weatherSlice,
  },
});
export default store;
