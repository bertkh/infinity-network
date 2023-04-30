import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from './api'

type LoginResponseDataType = {
    userId: number
}
type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResultCode = ResultCodesEnum | ResultCodeForCaptchaEnum

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`, {})
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, LoginResultCode>>(`auth/login/`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}