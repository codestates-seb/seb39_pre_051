import { Routes, Route, Navigate } from 'react-router-dom';
import Ask from './page/Ask';
import Home from './page/Home';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Question from './page/Question';
import QuestionMain from './page/QuestionMain';
import UserProfile from './page/UserProfile';
import UserPreferences from './page/UserPreferences';
import { getUserId } from './getUserInfo';

const Router = () => {
  const isLoggedIn = getUserId();

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/questions' element={<QuestionMain />} />
      <Route path='/questions/:questionId' element={<Question />} />
      {isLoggedIn ? (
        <>
          <Route path='/ask' element={<Ask />} />
          <Route path='/users/:userId' element={<UserProfile />} />
          <Route path='/users/preferences' element={<UserPreferences />} />
        </>
      ) : (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </>
      )}
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};

export default Router;
