
// import React from 'react';
// import ReactDOM  from 'react-dom';
// import App from './App';
// import { Provider } from 'react-redux';
// import reducer from './redux/reducer';
// import {createStore} from 'redux'

// const store = createStore(reducer)
// ReactDOM.render(
//   <Provider store={store}>
//     <App></App>
//   </Provider>,
//   document.getElementById('root')
// )
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';  // Make sure this path is correct

const store = configureStore();

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
