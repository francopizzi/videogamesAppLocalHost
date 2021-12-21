import { Route } from 'react-router-dom';
import React from 'react';

import { getAllGames, getAllGenres } from '../src/store/actions';
import { useDispatch} from 'react-redux';

import Landing from './components/Landing/Landing';
import Videogames from './components/Videogames/Videogames';
import Navbar from './components/Navbar/Navbar';
import Filtersbar from './components/Filtersbar/Filtersbar'
import FormAddGame from './components/FormAddGame/FormAddGame';
import DetailGame from './components/DetailGame/DetailGame';


import style from './App.module.css';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
      dispatch(getAllGames()) 
      dispatch(getAllGenres())
    },[]);
  return (
    <div className={`${style.grid} ${style.bk}`}>
        <Route
        path="/home"
        component={Navbar}
        />
        <Route 
        exact path="/"
        component={Landing}>
        </Route>
        <Route 
        exact
        path="/home/videogames"
        component={Videogames}/>
        <Route
        exact 
        path="/home/addgame"
        component={FormAddGame}
        />
        <Route
        exact
        path = "/home/detailgame/:id"
        component={DetailGame}
        />
        <Route
        exact path= "/home/videogames"
        component={Filtersbar}
        />
    </div>
  );
}

export default App;
