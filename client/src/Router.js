import { Routes, Route } from 'react-router-dom';
import Ask from './page/Ask';
import Home from './page/Home';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/ask' element={<Ask />} />
    </Routes>
  );
};

export default Router;
