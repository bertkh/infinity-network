import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';


const Navbar:React.FC = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' className={navData => navData.isActive ? s.activeLink : s.item}> Profile </NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/users' className={navData => navData.isActive ? s.activeLink : s.item}> Users </NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/dialogs' className={navData => navData.isActive ? s.activeLink : s.item}> Messages </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' className={navData => navData.isActive ? s.activeLink : s.item}> Settings </NavLink>
            </div>

{/*            <div className={s.item}>
                <NavLink to='/news' className={navData => navData.isActive ? s.activeLink : s.item}> News </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' className={navData => navData.isActive ? s.activeLink : s.item}> Music </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/friends' className={navData => navData.isActive ? s.activeLink : s.item}> Friends </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' className={navData => navData.isActive ? s.activeLink : s.item}> Settings </NavLink>
            </div>*/}

            <Sidebar />
        </nav>)

}
export default Navbar