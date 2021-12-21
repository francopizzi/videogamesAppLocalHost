import React from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { orderGamesAlf , deleteFilters , createdType, gameByRating , genreFilter} 
from '../../store/actions';
import style from './EachFilter.module.css'

export default function EachFilter ({name, lista}) {
    const {genres , videogames } = useSelector(state => state);
    const dispatch = useDispatch();
    
    function handlerFilters (e) {
        // despacho un filtro con el nombre
        if (e.target.name === "Alfabético" && e.target.value) {
            dispatch(orderGamesAlf(e.target.value));
        }
        if (e.target.name === "Quitar filtros") {
            dispatch(deleteFilters());
        }
        if (e.target.name === "¿Dónde se creó?" && e.target.value ) {
            dispatch(createdType(e.target.value))
        }
        if (e.target.name === "Rating" && e.target.value) {
            dispatch(gameByRating(e.target.value , videogames))
        }
        if (e.target.name === "Género" && e.target.value) {
            dispatch(genreFilter(e.target.value , videogames)) 
        }
    }

    return (
        <div className={style.eachFilter}>
                <li className={style.li}>
                    <button name={name} onClick={handlerFilters} className= {style.btn}>{name}</button>
                    <ul>
                    {
                        lista && lista.map ((element,index) => 
                        <li key={index} className={style.li}>
                            <button  className= {style.btn2} name={name} value={element} onClick={handlerFilters}>
                            {element}
                            </button>
                        </li>)
                    }
                    </ul>
                    {
                    name === "Género" && <ul>{genres.map (element => 
                        <li className= {style.li} key={element.id} >
                            <button 
                            className= {style.btn2}
                            name={name} 
                            value={element.name} 
                            onClick={handlerFilters}>
                            {element.name}
                            </button>
                        </li>)
                    }</ul>
                }
                </li>
            </div>
    )
}