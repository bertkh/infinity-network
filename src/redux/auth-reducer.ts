// import {authAPI} from '../api/auth-api';
// import {profileAPI} from '../api/profile-api'
// import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../api/api';
// import {FormAction, stopSubmit} from 'redux-form';
// import {securityAPI} from '../api/security-api';
//
// import {BaseThunkType, InferActionsTypes} from './redux-store';
//
//
//
// let initialState = {
//     userId: null as number | null,
//     email: null as string | null,
//     login: null as string | null,
//     isAuth: false as boolean,
//     captchaUrl: null as string | null, //if null then captcha is not required
//     photo: null as string | null
// }
//
//
// export const getAuthUserData = ():ThunkType => async (dispatch) => {
//     const meData = await authAPI.me()
//     if (meData.resultCode === ResultCodesEnum.Success) {
//         let {id, email, login} = meData.data
//         dispatch(actions.setAuthUserData(id, email, login, true))
//     }
// }
//
//
// //action
// export const setAuthData = (
//     id: string,
//     login: string,
//     email: string,
//     isAuth: boolean,
//     photo: string
// ) =>
//     ({
//         type: 'auth/SET-AUTH-DATA',
//         id,
//         login,
//         email,
//         isAuth,
//         photo,
//     } as const)
//
// export const setAuthPhoto = (photo: string) =>
//     ({
//         type: 'auth/SET-AUTH-PHOTO',
//         photo,
//     } as const)
//
// export const setErrorLogin = (error: string) =>
//     ({
//         type: 'auth/SET-ERROR-LOGIN',
//         error,
//     } as const)
//
// // export const setAuthIsFatchingValue = (isFetching: boolean) => ({
// //   type: "auth/SET-AUTH-ISFATCHING-VALUE" as const, isFetching,
// // })
//
// //thunk
// export const authMeThunk = (): BaseThunkType => async dispatch => {
//     // dispatch(setAuthIsFatchingValue(true))
//     try {
//         const res = await authAPI.me()
//         const ava = await profileAPI.getUserProfile(res.data.id)
//         console.log(ava)
//         if (res.resultCode === 0) {
//             // @ts-ignore
//             dispatch(setAuthData(res.data.id, res.data.login, res.data.email, true, ava.photos.small))
//         }
//         // dispatch(setAuthIsFatchingValue(false))}
//     } catch (e) {
//         console.log(e)
//     }
// }
//
//
//
// export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
//     const responseData = await securityAPI.getCaptchaUrl()
//     const captchaUrl = responseData.url
//     dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
// }
//
// export const login =
//     (email: string, password: string, rememberMe: boolean, captcha: null | string = null): ThunkType =>
//         async dispatch => {
//             const loginData = await authAPI.login(email, password, rememberMe, captcha)
//             const res = await authAPI.login(email, password, rememberMe)
//             if (res.resultCode === 0) {
//                 await dispatch(authMeThunk())
//             } else {
//                 let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
//                 dispatch(stopSubmit('login', {_error: message}))
//             }
//         }
//
// export const logout = (): ThunkType => async dispatch => {
//     const response = await authAPI.logout()
//     if (response.data.resultCode === ResultCodesEnum.Success) {
//         dispatch(setAuthData('', '', '', false, ''))
//     }
// }
//
// const initialAuthState: AuthStateType = {
//     id: '',
//     login: '',
//     email: '',
//     // isFetching: true,
//     isAuth: false,
//     errorLogin: '',
//     photo: '',
// }
//
//
// //reducer
// export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'INF/AUTH/SET_AUTH_PHOTO':
//             return { ...state, photo: action.photo }
//         case 'INF/AUTH/SET_USER_DATA':
//         case 'INF/AUTH/GET_CAPTCHA_URL_SUCCESS':
//             return {
//                 ...state,
//                 ...action.payload,
//                 // id: action.id,
//                 // login: action.login,
//                 // email: action.email,
//                 // isAuth: action.isAuth,
//             }
//         // case "auth/SET-AUTH-ISFATCHING-VALUE":
//         //   return {
//         //     ...state,
//         //     isFetching: action.isFetching
//         //   }
//         default:
//             return state
//     }
// }
//
// //types
// export type AuthStateType = {
//     id: string
//     login: string
//     email: string
//     // isFetching: boolean
//     isAuth: boolean
//     photo: string
//     errorLogin?: string
// }
//
// export type AuthReducerStateType =
//     | ReturnType<typeof setAuthData>
//     | ReturnType<typeof setAuthPhoto>
//     // | ReturnType<typeof setAuthIsFatchingValue>
//     | ReturnType<typeof setErrorLogin>
//
//
//
//
//
//
// export type InitialStateType = typeof initialState
// type ActionsType = InferActionsTypes<typeof actions>
// type ThunkType = BaseThunkType<ActionsType | FormAction>
//


import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';
import {authAPI} from '../api/auth-api';
import {securityAPI} from '../api/security-api';
import {BaseThunkType, InferActionsTypes} from './redux-store';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null, //if null then captcha is not required
    photo: null as string | null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INF/AUTH/SET_AUTH_PHOTO':
            return {
                ...state, photo: action.photo
            }
        case 'INF/AUTH/SET_USER_DATA':
        case 'INF/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
                // isAuth: true
            }
        default:
            return state;
    }
}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string = null): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        //success, get auth loginData
        await dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }

        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const responseData = await securityAPI.getCaptchaUrl()
    const captchaUrl = responseData.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'INF/AUTH/SET_USER_DATA', payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'INF/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const),
    setAuthPhoto: (photo: string) => ({
        type: 'INF/AUTH/SET_AUTH_PHOTO', photo,
    } as const),

}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

