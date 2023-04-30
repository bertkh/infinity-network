import React from 'react'
import s from './DialogItem.module.css'
import {NavLink} from 'react-router-dom'

type PropsType = {
    id: number
    name: string
    message: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = '/dialogs/' + props.id
    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path} style={{padding: '8px'}}>{props.name}</NavLink>
        <div className={s.item}>
            <img src="https://olympus.crumina.net/wp-content/uploads/avatars/1/5c24a6689aa5b-bpfull.jpg" alt=""/>
            {props.message}
        </div>
    </div>
}

export default DialogItem
