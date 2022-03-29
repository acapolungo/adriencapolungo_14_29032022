import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import employeeReducer from '../reducers/employeeSlice';

// reduxToolkit fait la connexion aux devTool et la création du store
export default configureStore({
  reducer: {
    user: userReducer,
    employee: employeeReducer,
  },
})


// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../reducers/userReducer';

// // reduxToolkit fait la connexion aux devTool et la création du store
// export const store = configureStore({
//   reducer: {
//     login: userReducer,
//   }
// })