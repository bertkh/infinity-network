import React from 'react'
import s from './Header.module.css'
import {Link} from 'react-router-dom'
import {getItem, MenuItem} from '../../App'
import {
    selectCurrentUserLogin,
    selectIsAuth,
    selectUserAva,
    useAppDispatch,
    useAppSelector
} from '../../redux/auth-selectors'
import {logout} from '../../redux/auth-reducer'
import logo from '../../assets/images/AppLogo.png'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {TeamOutlined, UserOutlined} from '@ant-design/icons'
import userPhoto from '../../assets/images/Al.jpg'

export type MapPropsType = {}

const itemsHeader: MenuItem[] = [
    getItem(
        <Link to="/developers">
            Developers
        </Link>,
        'DevelopersHeader',
        <TeamOutlined/>
    )
]

export const AppHeader: React.FC<MapPropsType> = () => {

    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectCurrentUserLogin)
    const ava = useAppSelector(selectUserAva)

    const dispatch = useAppDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const {Header} = Layout

    return (
        <Header className="header">
            <header>
                <Row>
                    <Col span={4}>
                        <a
                            href={`#`}
                        >
                            <img className={s.headerPhoto}
                                 src={logo}
                                 alt={'header-illustration-logo'}
                            />
                        </a>

                    </Col>

                    <Col span={16}>
                        <Menu theme='dark' mode='horizontal'
                              items={itemsHeader}
                              selectedKeys={['DevelopersHeader']}
                        />
                    </Col>

                    <Col span={4} >
                        {isAuth
                            ? <div>
                                <Link to={'/profile'}>
                                    <Avatar
                                        src={ava ? ava : userPhoto} size={40}
                                        alt={login || ''}
                                        // icon={<UserOutlined/>}
                                    />
                                </Link>

                                <span className={s.loginBlockIsAuth}>
                           {login} <Button type='primary' className={s.button}
                                           onClick={logoutCallback}>
                           Log out</Button>
                        </span>
                            </div>
                            : <div>
                                <Button type='primary' className={s.loginBlockNotAuth}>
                                    <Link to={'/login'}>Login</Link>
                                </Button>
                            </div>
                        }
                    </Col>

                </Row>
            </header>
        </Header>
    )
}
