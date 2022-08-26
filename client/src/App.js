import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { GlobalStyle } from './styles/Globalstyle';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
};

export default App;
