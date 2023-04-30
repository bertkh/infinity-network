import React from 'react';
import s from './Sidebar.module.css';


const SidebarContainer = (props) => {
    let friendsList = () => {
        props.state.friends();
    }

    return <div className={s.friends}>
        {friendsList}
    </div>


}
export default SidebarContainer;