import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContextProvider';
import GameContextProvider from './contexts/GameContextProvider';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <GameContextProvider>
          <Home />
        </GameContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
