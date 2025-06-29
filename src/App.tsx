import './App.scss';

import React from 'react';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import { store } from './store/store';

const App: React.FC = () => {
  const s = '2';
  return (
    <Provider store={store}>
      <div className="app">
        <Home />
      </div>
    </Provider>
  );
};

export default App;
