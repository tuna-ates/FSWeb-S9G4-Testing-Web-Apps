/* eslint-disable semi */
import React from 'react';
import IletisimFormu from './components/IletisimFormu';

const App = () => {
  return (
    <div>
      <nav data-testid="header-container" className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Entegrasyon Test Projesi</a>
      </nav>
      <div className="App">
        <IletisimFormu />
      </div>
    
    </div>
  )
}

export default App;
