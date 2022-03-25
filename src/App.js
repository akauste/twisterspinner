import { useState } from 'react';
import './App.css';
import ConfigureSpeach from './components/ConfigureSpeach';
import Spinner from './components/Spinner';

function App() {
  const [utterance, setUtterance] = useState({ voice: undefined });

  return (
    <div className="App">
      <header className="App-header">
        TwisterSpinner
      </header>
      <Spinner utterance={utterance} />
      <ConfigureSpeach setUtterance={ setUtterance } />
    </div>
  );
}

export default App;
