import React from 'react';
import ButtonAddGame from '../ButtonAddGame/ButtonAddGame';
import ButtonHome from '../ButtonHome/ButtonHome';
import SearchBar from '../SearchBar/SearchBar';
import {Link} from 'react-router-dom';
import style from './Navbar.module.css';
import Logo from '../../imagen.jpg';

function Navbar() {
  return (
    <div className={style.grid}>
      <img className={style.logo} src={Logo} alt="Logo pagina web"/>
       <Link to="/home/videogames" className={style.videogames} >
        <ButtonHome />
       </Link>
       <Link to="/home/addgame" className={style.addGame} >
        <ButtonAddGame />
       </Link>
      <div className={style.searchBar}>
       <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;