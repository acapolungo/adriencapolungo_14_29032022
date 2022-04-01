import { createSlice } from '@reduxjs/toolkit';
import MOCK_Data from '../../src/assets/MOCK_DATA.json';

// reduxToolkit fait la connexion aux devTool et la création du store
export const employeeReducer = createSlice({
  name: "employee",
  initialState: MOCK_Data,
  reducers: {
    // state met à jour le state initial
    // action sont les data qu'on passe, update the payload to the user
    addEmployee(state, action) {
      state.push(action.payload)
    },
    deleteEmployee(state, action) {
      const { id } = action.payload;
      //console.log(id)
      return state.filter(element => element.id !== id);
    },
    updateEmployee(state, action) {
      // console.log(action.payload.value)
      // replace matched item and returns the array 
      return state.map(item => {
        return item.id === action.payload.value.id ? action.payload.value : item;
      })
    },
    initData(state, action) {
      return state = MOCK_Data;
    },
  },
});

export const { addEmployee, deleteEmployee, updateEmployee, initData } = employeeReducer.actions;
export default employeeReducer.reducer;