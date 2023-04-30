import React, {lazy, Suspense, useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter, Link, NavLink, Route, Routes} from 'react-router-dom'
import News from './components/News/News'
import {LoginPage} from './components/Login/LoginPage'
import {initializeApp} from './redux/app-reducer'
import {selectIsAuth, useAppDispatch, useAppSelector} from './redux/auth-selectors'
import Preloader from './components/common/Preloader/Preloader'
import {AppHeader} from './components/Header/AppHeader'
import {Breadcrumb, Layout, Menu} from 'antd'
import {GithubOutlined, LaptopOutlined, SettingOutlined, MessageOutlined,
    AppstoreOutlined, PlayCircleOutlined, FireOutlined, HomeOutlined, UnorderedListOutlined,
    TeamOutlined, UserOutlined, SolutionOutlined, CommentOutlined} from '@ant-design/icons'
import {UsersPage} from './components/Users/UsersContainer'
import Profile from './components/Profile/Profile'
import {NotFound} from './components/common/NotFound/NotFound'
import {AppStateType} from './redux/redux-store'
import {withSuspense} from './components/hoc/withSuspense'
import type {MenuProps} from 'antd/es/menu'


const DialogsContainer = withSuspense(lazy(() => import('./components/Dialogs/DialogsContainer')))
const ProfileContainer = withSuspense(lazy(() => import('./components/Profile/ProfileContainer')))
const ChatPage = withSuspense(lazy(() => import('./pages/Chat/ChatPage')))

// ant design

const {Content, Footer, Sider} = Layout

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(label: React.ReactNode,
                        key?: React.Key | null,
                        icon?: React.ReactNode,
                        children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}
const itemsSideMenu: MenuItem[] = [

    getItem('My Profile', 'MyProfile', <UserOutlined/>, [
        getItem(
            <Link to='/profile'>
                <SolutionOutlined /> Profile
            </Link>,
            'Profile'),
        getItem(
            <Link to="/dialogs">
                <MessageOutlined /> Messages
            </Link>,
            'Messages')
    ]),

    getItem('Developers', 'Developers', <LaptopOutlined/>, [
        getItem(
            <Link to='/developers'>
                <TeamOutlined /> Developers list
            </Link>,
            'DevelopersList'),
        getItem(
            <Link to='/chat'>
                <CommentOutlined /> Developers chat
            </Link>,
            'DevelopersChat')
    ]),

    getItem('Settings', 'Settings', <SettingOutlined/>, [
        getItem(
            <Link to='/news'>
                <FireOutlined /> News
            </Link>,
            'News'),
        getItem(
            <Link to="/22404">
                <PlayCircleOutlined /> Music
            </Link>,
            'Music')
    ])
]

export const App = () => {
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(selectIsAuth)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    return (
        // <BrowserRouter basename="/Samurai-way">
        <div className={'app-wrapper'}>
            <Layout>

                <AppHeader />
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>
                            <Link to="/">
                                <HomeOutlined /> Home
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='/developers'>
                                <UnorderedListOutlined /> List
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item><AppstoreOutlined /> App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className='site-layout-background' style={{padding: '24px 0'}}>
                        <Sider className='site-layout-background' width={200}>
                            <Menu mode='inline' style={{height: '100%'}} items={itemsSideMenu}/>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>

                            <Suspense fallback={<Preloader/>}>
                                <Routes>
                                    <Route
                                        path='/'
                                        element={<News/>}
                                    />
                                    <Route
                                        path='/profile/:userId'
                                        element={<ProfileContainer/>}/>
                                    <Route
                                        path='/profile'
                                        element={<ProfileContainer/>}/>
                                    <Route/>
                                    <Route
                                        path='/dialogs/*'
                                        element={<DialogsContainer/>}/>
                                    <Route
                                        path='/developers'
                                        element={<UsersPage
                                            pageTitle={'Developers'}/>}/>
                                    <Route
                                        path='/login'
                                        element={<LoginPage/>}/>
                                    <Route
                                        path='/news'
                                        element={<News/>}/>
                                    <Route
                                        path='/chat'
                                        element={<ChatPage/>}/>
                                    <Route
                                        path='*'
                                        element={<NotFound/>}/>
                                </Routes>
                            </Suspense>


                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center', marginBottom: '10px'}}>
                    <div className='created-by'>
                        Infinity Social Network ©2023 Created by

                        <a
                            href={`https://bertkh.github.io/personal-folio/`}
                            target='_blank' rel='noopener noreferrer'
                            className='pad-left-10px'
                        >
                            Albert Khamzin
                        </a>

                        <span className='pad-left-10px'>| </span>
                        <GithubOutlined />
                        <a
                            href={'https://github.com/bertkh/'}
                            target='_blank' rel='noopener noreferrer'
                            className='pad-left-10px'
                        >
                            GitHub
                        </a>

                    </div>
                </Footer>
            </Layout>
        </div>
        // </BrowserRouter>
    )
}







//раньше была классовая компонента

// class App extends React.Component<MapPropsType & DispatchPropsType> {
//
//     catchAllUnhandledErrors = (
//         promiseRejectionEvent: PromiseRejectionEvent) => {
//         console.log('Some error')
//         console.log(promiseRejectionEvent)
//     }
//
//     componentDidMount() {
//         this.props.initializeApp()
//         window.addEventListener('unhandledrejection',
//             this.catchAllUnhandledErrors)
//     }
//
//     componentWillUnmount() {
//         window.removeEventListener('unhandledrejection',
//             this.catchAllUnhandledErrors)
//     }
//
//     render() {
//         if (!this.props.initialized) {
//             return (
//                 <div className='containerMy'>
//                     <Preloader/>
//                     <News/>
//                 </div>)
//         }
//
//         return (
//
//         )
//     }
// }
//

// type MapPropsType = ReturnType<typeof mapStateToProps>
//
// type DispatchPropsType = { initializeApp: () => void }
//
// const mapStateToProps = (state: AppStateType) => ({
//     initialized: state.app.initialized
// })


// export default connect(mapStateToProps, {initializeApp})(App)