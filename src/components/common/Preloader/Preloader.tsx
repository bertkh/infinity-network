import preloader from '../../../assets/images/preloader.gif';
import React from 'react';

type PropsType = {
}

let Preloader:React.FC<PropsType> = (props) => {
   return <div>
    <img src={preloader} />
   </div>
}


export default Preloader