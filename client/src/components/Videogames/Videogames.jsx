import React from 'react';
import { useDispatch} from 'react-redux';
import { getGamesxPage } from '../../store/actions';
import CardVideogame from '../CardVideogame/CardVideogame.jsx';
import Filters from '../Filters/Filters';
import { useSelector } from 'react-redux';
import style from './Videogames.module.css';


    
function Videogames() {
  let {videogamesXpage , number , flagFilter , videogames , filtersapplied} = useSelector ((state)=> state)
  const dispatch = useDispatch();
  React.useEffect(() => {
      dispatch(getGamesxPage(number))
    },[number, flagFilter , videogames ]); 

  return (
    <div className={style.grid}>
        <div className={style.filters} >
          <Filters/>
        </div>
      {
        videogamesXpage.length?
       <div className={style.conteiner}>
        {
         videogamesXpage.map ( (element) =>(
            <CardVideogame
            key = {element.id}
            id={element.id}
            name = {element.name}
            backgroundImage = {element.background_image}
            genres = {element.genres}
            />   
        ))
        }
       </div>
        : 
        (filtersapplied[0] !== '' || filtersapplied[1] !== '' || filtersapplied[2] !== '' || filtersapplied[3] )?
        <div className={style.alert}>
          <h1 className={style.gameOver}>GAME OVER</h1> 
          <h1 className={style.text}>No existen juegos con los filtros seleccionados</h1> 
        </div>
        :<img className={style.carga}src="https://acegif.com/wp-content/uploads/loading-87.gif" 
        alt="Imagen de carga"></img> 
      }
    </div>
  );
};

export default Videogames;