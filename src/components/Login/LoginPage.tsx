import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, GetStringKeys, Input} from '../common/FormsControls/FormsControls'
import {required} from '../../utils/validators/validators'
import {connect, useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Navigate} from 'react-router-dom'
import style from '../common/FormsControls/FormsControls.module.css'
import s from './Login.module.css'
import {AppDispatch, AppStateType} from '../../redux/redux-store'
import {Button} from 'antd'

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form className={s.loginForm} onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
            <div>
                <div
                    className={s.rememberMe}>{createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'},
                    'remember me')}</div>

                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}

                {error && <div className={style.formSummaryError}>
                    {error}</div>
                }
                <div >
                    <Button htmlType={'submit'} className={s.btnLoginForm}>Login</Button>
                </div>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch: AppDispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return <div>
        <h1 className={s.loginForm}>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

