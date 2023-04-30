import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, GetStringKeys, Input} from '../../../common/FormsControls/FormsControls';
import {required} from '../../../../utils/validators/validators';
import {Button} from 'antd'

export type PropsType = {
    message: string
    likesCount: number
}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            { createField<AddPostFormValuesTypeKeys>('Your post', 'newPostText', [required], Input) }
        </div>
        <div>
            <Button type='primary' htmlType='submit'>
                Add post
            </Button>
        </div>
    </form>
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'profileAddNewPostForm'})(AddPostForm)