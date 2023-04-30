import React from 'react'
import styles from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import {FieldValidatorType} from '../../../utils/validators/validators'
import {LoginFormValuesType} from '../../Login/LoginPage'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={hasError ? styles.error : ' '}>
            {children}
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props

    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>

}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validators: Array<FieldValidatorType>,
                                                         component: React.FC<WrappedFieldProps>,
                                                         props = {},
                                                         text = '') {
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators} component={component}
               {...props} /> {text}
    </div>

}

export type GetStringKeys<T> = Extract<keyof T, string>

