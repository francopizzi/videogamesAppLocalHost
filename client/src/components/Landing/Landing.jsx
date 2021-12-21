import { Link } from 'react-router-dom';
import React from 'react';
import style from './Landing.module.css';

function Landing() {
  return (
    <div className={style.bk}>
       <Link to="/home/videogames" className={style.btn_pos}>
            <button className={style.btn}>ENTER</button>
        </Link>
    </div>
  );
};

export default Landing;