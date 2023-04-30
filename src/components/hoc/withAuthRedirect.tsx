import React, {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';

let mapsStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as MapPropsType);

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {

}

export function withAuthRedirect <WCP extends object>(Component: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        const {isAuth, ...restProps} = props

        if (!props.isAuth) return <Navigate to='/login'/>
        return <Component {...restProps as WCP} />
    }

    const ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapsStateToPropsForRedirect, {})(RedirectComponent);

    return ConnectedAuthRedirectComponent;

}