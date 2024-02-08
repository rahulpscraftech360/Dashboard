import { createSlice } from "@reduxjs/toolkit";

const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    organizationData: {},
    tokens: {},
    isOrganizationLoggedIn: false,
  },

  reducers: {
    addUser: (state, action) => {
      // console.log("first>>>>>>><<<<<<<<<", action);
      return {
        ...state,
        organizationData: action.payload.organization,
        tokens: action.payload.tokens,
        isOrganizationLoggedIn: action.payload.isOrganizationLoggedIn,
      };
    },
    updateUser: (state, action) => {
      return {
        ...state,
        organizationData: {
          ...state.organizationData,
          ...action.payload.organizationData,
        },
      };
    },

    removeUser: (state, action) => {
      console.log("removing");
      state.organizationData = {}; // Reset organizationData to an empty object
      state.tokens = {};
      state.isOrganizationLoggedIn = false; // Reset tokens to an empty object
      return state;
    },
  },
});

export default organizationSlice.reducer;
export const { addUser, removeUser, updateUser } = organizationSlice.actions;
