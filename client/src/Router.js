import { Routes, Route } from 'react-router-dom';
import Ask from './page/Ask';
import Home from './page/Home';
import Login from './page/Login';
import SignUp from './page/SignUp'
import Question from './page/Question'
import QuestionMain from './page/QuestionMain';
import UserProfile from './page/UserProfile';


const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/ask' element={<Ask />} />
      <Route path='/questions' element={<QuestionMain/>} />
      <Route path='/questions/:questionId' element={<Question />} />
      <Route path='/users' element={<UserProfile />} />
    </Routes>
  );
};

export default Router;
