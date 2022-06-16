import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/homePage/home';
import AddFlight from './pages/addFlight/addFlight';
import BookingList from './pages/bookingList/bookingList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-flight" element={<AddFlight />} />
        <Route path="/booking-list/:id" element={<BookingList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
