import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import ConfigureSpeach from './components/ConfigureSpeach';
import Spinner from './components/Spinner';

function App() {
  const [utterance, setUtterance] = useState({ voice: undefined });
  const { i18n } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <h1>TwisterSpinner</h1>
        <select onClick={(e) => { i18n.changeLanguage(e.target.value) }}>
          <option value="en">English</option>
          <option value="fi">Suomi</option>
        </select>
      </header>
      <Spinner utterance={utterance} />
      <ConfigureSpeach setUtterance={ setUtterance } />
    </div>
  );
}

export default App;
