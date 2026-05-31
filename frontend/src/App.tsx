import AppRouter from './router';
import useAOS from './hooks/useAOS';
import './App.css';

function App() {
  useAOS();
  
  return (
    <AppRouter />
  );
}

export default App;