import React from 'react';
import style from './ButtonHome.module.css';
import {useDispatch} from 'react-redux';
import {getAllGames , backendErros, gameCreated} from '../../store/actions';


function ButtonHome() {
  const dispatch = useDispatch();
  
  function handleOnClick() {
    dispatch(backendErros());
    dispatch(getAllGames());
    dispatch (gameCreated());
  }
  

  return (
    <div className={style.videogames}>
       <button className={style.btn} onClick={handleOnClick}>Juegos</button>
    </div>
  );
};

export default ButtonHome;