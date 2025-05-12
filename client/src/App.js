import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from 'react';
import './App.css';
import Login from './components/pages/Login/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from "./components/pages/SignUp/Register";
import CoffeePage from "./components/pages/CoffeePage";
import BeveragePage from "./components/pages/BeveragePage";
import RecipesPage from "./components/pages/RecipesPage/RecipesListWrapper";
import Profile from "./components/pages/Profil/index";
import CartPage from "./components/pages/CartPage/Cart";
import QuizPage from "./components/pages/QuizPage/QuizPage/QuizPage";

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path='/coffees' element={<CoffeePage />} />
          <Route path='/beverages' element={<BeveragePage />} />
          <Route path='/recipes' element={<RecipesPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path="/personality-coffee" element={<QuizPage />} />
          <Route path="*" element={<NoMatch />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
