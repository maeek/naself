import 'focus-visible';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ComponentsPreview } from './views/components';
import { Details } from './views/details';
import { Home } from './views/home';
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
          path='/properties'
          Component={Details}
        />
        <Route
          path='/components'
          Component={ComponentsPreview}
        />
      </Routes>
    </HashRouter>
  );
};
