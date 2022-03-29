import { createSlice } from '@reduxjs/toolkit';

// reduxToolkit fait la connexion aux devTool et la création du store
export const employeeReducer = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
      // state met à jour le state initial
      // action sont les data qu'on passe, update the payload to the user
      addEmployee(state, action) {
        state.push(action.payload)
      },
      deleteEmployee(state) {
        state.employee = null;
      },
  },
});

export const { addEmployee, deleteEmployee } = employeeReducer.actions;
export default employeeReducer.reducer;