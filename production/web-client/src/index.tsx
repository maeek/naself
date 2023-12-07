// import React from 'react';
import { createRoot } from 'react-dom/client';
import './app.scss';

function App() {
  return (
    <div>
      <h1>Hello, React 18!</h1>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
