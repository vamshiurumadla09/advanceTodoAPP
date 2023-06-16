import React from 'react';
import Todolist from './Components/Todolist';
import store from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
   <Todolist></Todolist>
    </Provider>
  )
}

export default App