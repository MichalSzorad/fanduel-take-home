import React from 'react';
import { fetchPlayers } from './api';
import GamePage from './game-page';

function App() {
  React.useEffect(() => {
    fetchPlayers().then(res => console.log(res)).catch(e => console.error(e));
  }, []);

  return <GamePage />;
}

export default App;
