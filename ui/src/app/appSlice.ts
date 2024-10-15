import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",

  initialState: { city: ''},

  reducers: create => ({
    updateCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },

  }),
  selectors: {
    selectCity: app => app.city,
  },
})


export const { updateCity } =
  appSlice.actions

export const { selectCity} = appSlice.selectors
export default appSlice.reducer