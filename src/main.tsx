import './main.scss';
import './style.css';

import { Button } from '@heroui/button';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Button color="primary">Button</Button>
    <App />
  </StrictMode>,
);
