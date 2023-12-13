import 'focus-visible';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ComponentsPreview } from './views/Components';
import { Home } from './views/Home';
import './app.scss';

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path='/'
          Component={Home}
        />
        <Route
          path='/components'
          Component={ComponentsPreview}
        />
      </Routes>
    </HashRouter>
  );
};
