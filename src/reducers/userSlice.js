import { createSlice } from '@reduxjs/toolkit';

// reduxToolkit fait la connexion aux devTool et la création du store
export const userReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
      // state met à jour le state initial
      // action sont les data qu'on passe, update the payload to the user
      login(state, action) {
        state.user = action.payload;
      },
      logout(state) {
        state.user = null;
      },
  },
});

export const { login, logout } = userReducer.actions;
export default userReducer.reducer;


// import { createAction, createReducer } from '@reduxjs/toolkit'

// // Le state initial de la feature freelances
// const initialState = {
//     user: {
//         email: null,
//         id: null,
//         firstName: null,
//         lastName: null,
//     },
//     // le statut permet de suivre l'état de la requête
//     status: false,
//     // les données lorsque la requête a fonctionné
//     token: null,
//     // l'erreur lorsque la requête échoue
//     errorMessage: null,
// }

// // Fetching action
// export const loginFetching = createAction('login/fetching')
// export const loginResolved = createAction('login/resolved')
// export const loginRejected = createAction('login/rejected')

// export const logOut = createAction('login/logout')

// // Reducer
// // valeur par defaut du state initialState
// export default createReducer(initialState, (builder) =>
//     builder
//         // faire des changements via immer
//         // Draft c'est une copie de notre state et action sont les params de l'action

//         // si l'action est de type loginFetching
//         .addCase(loginFetching, (draft) => {
//             // si le statut est unauthenticated
//             if (draft.status === false) {
//                 // on passe en pending
//                 draft.status = 'pending'
//                 return
//             }
//             // sinon l'action est ignorée
//             return
//         })
//         // si l'action est de type loginResolved
//         .addCase(loginResolved, (draft, action) => {
//             // si la requête est en cours
//             if (draft.status === 'pending') {
//                 // on passe en updating et récupère le payload token
//                 draft.token = action.payload
//                 draft.status = 'updating'
//                 return
//             }
//             // sinon l'action est ignorée
//             return
//         })
//         // si l'action est de type loginRejected
//         .addCase(loginRejected, (draft, action) => {
//             // si la requête est en cours
//             if (draft.status === 'pending') {
//                 // on passe en rejected, on sauvegarde l'erreur et on supprime les données
//                 draft.errorMessage = action.payload
//                 draft.token = null
//                 draft.status = false
//                 return
//             }
//             // sinon l'action est ignorée
//             return
//         })
//         // si l'action est de se déloguer
//         .addCase(logOut, (draft) => {
//             draft.user.firstName = null;
//             draft.user.lastName = null;
//             draft.user.email = null;
//             draft.user.id = null;
//             draft.status = false;
//             draft.token = null;
//             draft.error = null;
//         })

// )