// // src/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// // import counterReducer from './features/counter/counterSlice'; // Example feature slice

// const store = configureStore({
//   reducer: {
//     // counter: counterReducer, // Example reducer
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

import { createStore } from 'redux';
import rootReducer from './redux/reducer';

export default function configureStore() {
    const store = createStore(rootReducer);
    return store;
}