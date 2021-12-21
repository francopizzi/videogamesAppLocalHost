import React from 'react-redux';
import EachFilter from '../EachFilter/EachFilter';
import style from './Filters.module.css';
import { useSelector } from 'react-redux';

export default function Filters () {
     const {filtersapplied} = useSelector(state => state);
    return (
        <div className={style.sticky}>
            <div className={style.selectedFilters}>
            {
                filtersapplied[0] &&
                <div className={style.r1}>
                    <label className={style.label}>- Alfabético: </label>
                    <label className={style.label}>{filtersapplied[0]}</label>
                </div>
            }
            {
                filtersapplied[1] &&
                <div className={style.r2}>
                    <label className={style.label}>- Rating:  </label>
                    <label className={style.label}>{filtersapplied[1]}</label>
                </div>
            }
            {
                filtersapplied[2] &&
                <div className={style.r3}>
                    <label className={style.label}>- ¿Dónde se creó?:  </label>
                    <label className={style.label}>{filtersapplied[2]}</label>
                </div>
            }
            {
                filtersapplied[3] &&
                <div className={`${style.genresGrid} ${style.r4}`}>
                    <label className={style.labelGenres} >- Géneros: </label>
                    <ul>
                    {
                        filtersapplied.map((element, index)=> index>2 && 
                        <li className={style.list} key={index}>{element}</li> )
                    }
                    </ul>
                </div>
            }
            </div>
                <ul className={style.filters}>
                    <li className={style.li}><button className={style.btn}>Filtros</button>
                        <ul>
                            <EachFilter key={1} name="Quitar filtros"/>
                            <EachFilter key={2} name="Alfabético" lista={["Ascendente","Descendente"]}/>
                            <EachFilter key={3} name="Rating" lista={["Ascendente","Descendente"]} />
                            <EachFilter key={4} name="¿Dónde se creó?" lista={["Base de datos","API"]}/>
                            <EachFilter key={5} name="Género"/>
                        </ul>
                    </li>
                </ul>
        </div>
    )
}