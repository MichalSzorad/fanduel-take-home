import React from 'react';
import { Provider } from 'react-redux';
import { GamePageConnected } from './pages';
import store from './store';

function App() {
  return <Provider store={store}>
    <GamePageConnected />
  </Provider>;
}

export default App;
