import {InferActionsTypes} from './redux-store';

type DialogType = {
    id: number
    name: string
    message: string
}
type MessageType = {
    id: number
    message: string
}
const initialState = {
    dialogs: [
        {id: 1, name: 'Albert'},
        {id: 2, name: 'Kirill'},
        {id: 3, name: 'Tom'},
        {id: 4, name: 'Alex'},
        {id: 5, name: 'Edgar'},
        {id: 6, name: 'Dan'},
        {id: 7, name: 'Elza'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hey, sup?'},
        {id: 2, message: 'Okay'},
        {id: 3, message: 'So ROFL'},
        {id: 4, message: 'Yo!'},
        {id: 5, message: 'Heh'},
        {id: 6, message: 'Sad, but true'},
        {id: 7, message: 'Ha-ha, classic!'},
    ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INF/DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state
    }
}

export default dialogsReducer

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'INF/DIALOGS/SEND_MESSAGE', newMessageBody} as const)
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
