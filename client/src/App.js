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

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />


        <Routes>
          <Route exact path="/users" element={
            <Users key="users" />}>
          </Route>

          <Route exact path="/users/edit" element={
            <EditCard key="users/edit" />}>
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

        </Routes>

      </Router>

    </div>
  );
}

export default App;
