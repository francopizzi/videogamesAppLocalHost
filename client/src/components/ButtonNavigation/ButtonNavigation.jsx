import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { definePage} from '../../store/actions';
import style from './ButtonNavigation.module.css';


function ButtonNavigation({number}) {
  const [isActive, setActive] = React.useState(false);

  const reduxPage = useSelector((state)=> state.number);
  React.useEffect(() => {
    parseInt(reduxPage) !== number ? setActive(false) : setActive(true);
  },[reduxPage]); 


  const dispatch = useDispatch();

  function handlerChangePage (e) {
    dispatch(definePage(e.target.value));
  }
  return (
    <div>
       <button className={isActive ? style.btnActive : style.btn} 
       value={number} onClick={handlerChangePage}>{number}</button>
    </div>
  );
};

export default ButtonNavigation;


  