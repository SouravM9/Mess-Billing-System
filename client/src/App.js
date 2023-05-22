import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Users from './components/Users';
import Foods from './components/Foods';
import Meals from './components/Meals';
import Home from './components/Home';
import EditCard from './components/EditCard';
import MenuCard from './components/MenuCard';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />


        <Routes>
          <Route exact path="/users" element={
            <Users key="users" />}>
          </Route>

          <Route exact path="/edit" element={
            <EditCard key="edit" />}>
          </Route>

          <Route exact path="/foods" element={
            <Foods key="foods" />}>
          </Route>

          <Route exact path="/meals" element={
            <Meals key="meals" />}>
          </Route>

          <Route exact path="/" element={
            <Home key="home" />}>
          </Route>

          <Route exact path="/menu" element={
            <MenuCard key="menu" />}>
          </Route>

          <Route exact path="/register" element={
            <Register key="register" />}>
          </Route>

          <Route exact path="/login" element={
            <Login key="login" />}>
          </Route>

          <Route exact path="/forgotpassword" element={
            <ForgotPassword key="forgotpassword" />}>
          </Route>
          
        </Routes>

      </Router>

    </div>
  );
}

export default App;
