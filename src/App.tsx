import React from 'react';
import TextInput from './components/gameTextField/TextInput';
import './assest/style.css'
import FinalStats from './components/endingModal/FinalStats';

function App() {
  return (
    <div className="App"
    >
      <TextInput />
      <FinalStats />
    </div>
  );
}

export default App;
