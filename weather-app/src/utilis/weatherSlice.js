const { createSlice } = require("@reduxjs/toolkit");

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    search: "Kolkata",
    loading: true,
  },

  reducers: {
    changeData: (state, action) => {
      state.data = action.payload;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    changeLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { changeData, changeSearch, changeLoading } = weatherSlice.actions;

export default weatherSlice.reducer;
