import AppRouter from './router';
import useAOS from './hooks/useAOS';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  useAOS();
  
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;