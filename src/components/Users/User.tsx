import React from 'react'
import s from './Users.module.css'
import userPhoto from '../../assets/images/ava.jpg'
import {NavLink} from 'react-router-dom'
import {UserType} from '../../types/types'
import {Button} from 'antd'

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <div className={s.allUsers}>
                <span>
                    <div>
                        <NavLink to={'./../profile/' + user.id}>
                        <img src={user.photos.small != null
                            ? user.photos.small
                            : userPhoto}
                             className={s.userPhoto}/>
                            </NavLink>
                    </div>
                </span>
                <span className={s.userBLock}>
                    <span>
                        <div className={s.userName}>{user.name}<span className={s.userId}> (id: {user.id})</span></div>
                        <div className={s.userStatus}>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>

                    <div>
                        {user.followed
                            ? <Button type={'primary'} htmlType="submit"
                                      disabled={followingInProgress
                                          .some(id => id === user.id)}
                                      onClick={() => {
                                          unfollow(user.id)
                                      }}>Unfollow</Button>

                            : <Button type={'primary'} htmlType="submit"
                                      disabled={followingInProgress
                                          .some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }}>Follow</Button>}
                    </div>
                </span>
            </div>
            <hr/>
        </div>
    )
}

export default User

