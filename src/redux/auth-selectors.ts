import {AppDispatch, AppStateType} from './redux-store'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login
}
export const selectUserAva = (state: AppStateType) => {
    return state.auth.photo
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector