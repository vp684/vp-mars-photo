import React from 'react';
import SearchView from './components/search/SearchView'

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Mars Photo API</h1>
      <h3>Curiosity Rover</h3>
      <h5>Search by Sol day number and camera</h5>
      <SearchView/>     
    </div>
  );
}

export default App;
