import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router";
import { getGameDetail } from "../../store/actions";
import style from './DetailGame.module.css';


export default function DetailGame () {
    const {gameDetail} = useSelector((state)=> state);
    const {id} = useParams();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getGameDetail(id))   
    },[]);

    
    return (
        <div className={style.general}>
            {
            gameDetail && gameDetail.id == id?
            <div className={style.grid}>
                <p className={style.title}>{gameDetail.name}</p>
                <img className={`${style.img} ${style.sticky}`} 
                src={gameDetail.background_image} alt="imagen del juego" />
                <div className={style.info}>
                <p className={style.description}>{gameDetail.description}</p>
                <div className={style.grid2}>
                    <label>Lanzamiento:</label>    
                    <p>{gameDetail.released}</p>
                    <label>Rating:</label>
                    <p>{gameDetail.rating}</p>
                </div>
                <div className={style.grid3}>
                <label>Plataformas:</label>
                <ul>
                    {
                    id.length < 10 ?
                    gameDetail.platforms && gameDetail.platforms.map ((element,index) => (                  
                        <li key={index}>{element.name}</li>
                    ))
                    :
                    gameDetail.platforms && gameDetail.platforms.map ((element,index) => (                  
                        <li key={index}>{element}</li>
                    ))
                    }
                </ul>
                <label>Generos:</label>
                <ul>
                {
                    gameDetail.genres && gameDetail.genres.map (element => (
                        <li key={element.id}>{element.name}</li>
                ))
                }
                </ul>
                </div>
               </div>
            </div>
                : <img className={style.carga} src="https://acegif.com/wp-content/uploads/loading-87.gif" 
                alt="Imagen de carga"></img>
            }
        </div>
    )
}