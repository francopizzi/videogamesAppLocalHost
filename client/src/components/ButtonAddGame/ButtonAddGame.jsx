import React from 'react';
import style from './ButtonAddGame.module.css';
import {useDispatch} from 'react-redux';
import { backendErros, gameCreated} from '../../store/actions';


function ButtonAddGame() {
  const dispatch = useDispatch();
  
  function handleOnClick() {
    dispatch(backendErros());
    dispatch (gameCreated());
  }
  

  return (
    <div>
       <button onClick={handleOnClick} className={style.btn}>Agregar juego</button>
    </div>
  );
};

export default ButtonAddGame;