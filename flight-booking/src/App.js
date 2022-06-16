import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/login/login';
import SignIn from './pages/signIn/signIn';
import TicketBook from './pages/ticketBook/Book';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login/>} />
        <Route path='/signIn' element = {<SignIn/>} />
        <Route path='/' element = {<TicketBook/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
