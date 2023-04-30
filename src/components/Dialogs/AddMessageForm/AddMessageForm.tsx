import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input, Textarea} from '../../common/FormsControls/FormsControls'
import React from 'react';
import {NewMessageFormValuesType} from "../Dialogs";
import {Button} from 'antd'

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                { createField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody',
                    [required, maxLength50], Input)}
            </div>
            <div>
                <Button type='primary' htmlType='submit' ghost>Send</Button>
            </div>
        </form>
        //         {createField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea)}
    )
}

export default reduxForm<NewMessageFormValuesType>({ form: 'dialogAddMessageForm' })(AddMessageForm);
