import './App.scss';

import { HeroUIProvider } from '@heroui/react';
import React from 'react';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import { store } from './store/store';

const App: React.FC = () => (
  // const s = '2';
  <HeroUIProvider>
    <Provider store={store}>
      <div className="app">
        <Home />
      </div>
    </Provider>
  </HeroUIProvider>
);
export default App;
