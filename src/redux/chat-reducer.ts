import {BaseThunkType, InferActionsTypes} from './redux-store'
import {chatAPI, ChatMessageAPIType, MessagesReceivedSubscriberType, StatusType} from '../api/chat-api'
import {Dispatch} from 'redux'
import {uniqueIdGetTimeInStringPlusIndex} from '../utils/validators/object-helpers'


type ChatMessagesType = ChatMessageAPIType & {
    id: string
}


let initialState = {
    messages: [] as ChatMessagesType[],
    status: 'pending' as StatusType
}


type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>


const chatReducer = (
    state = initialState,
    action: ActionsType): InitialStateType => {

    switch (action.type) {

        case 'INF/CHAT/MESSAGES_RECEIVED':

            //region Description
            const messagesPayloadWithId = action.payload.messages.map(
                (m, index) => {
                    const uniqueId = uniqueIdGetTimeInStringPlusIndex(index)
                    return (
                        {...m, id: uniqueId})
                }
            )

            const messagesCompose = [...state.messages, ...messagesPayloadWithId]

            const messagesLast100pieces = messagesCompose.filter((m, index, array) =>
                index >= array.length - 100)

            //endregion

            return {
                ...state,
                messages: messagesLast100pieces
            }


        case
        'INF/CHAT/STATUS_CHANGED'
        :

            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state
    }

}


const actions = {

    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'INF/CHAT/MESSAGES_RECEIVED',
        payload: {messages}
    }) as const,

    statusChanged: (status: StatusType) => ({
        type: 'INF/CHAT/STATUS_CHANGED',
        payload: {status}
    }) as const

}


// Ниже санки и другое

let _newMessageHandler: MessagesReceivedSubscriberType | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {

    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {

    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

    chatAPI.start()

}


export const stopMessagesListening = (): ThunkType => async () => {

    // chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    // chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))

    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async () => {

    chatAPI.sendMessage(message)
}

export default chatReducer

















// import {BaseThunkType, InferActionsTypes} from './redux-store'
// import {Dispatch} from 'redux'
// import {FormAction} from 'redux-form/lib/actions'
// import {chatAPI, ChatMessageAPIType, StatusType} from '../api/chat-api'
// import {v1} from 'uuid'
// import {uniqueIdGetTimeInStringPlusIndex} from '../utils/validators/object-helpers'
//
// type ChatMessageType = ChatMessageAPIType & { id: string }
//
// let initialState = {
//     messages: [] as ChatMessageType[],
//     status: 'pending' as StatusType
// }
//
// const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'INF/CHAT/MESSAGES_RECEIVED':
//             const messagesPayloadWithId = action.payload.messages.map(
//                 (m, index) => {
//                     const uniqueId = uniqueIdGetTimeInStringPlusIndex(index)
//                     return (
//                         {...m, id: uniqueId})
//                 }
//             )
//
//             const messagesCompose = [...state.messages, ...messagesPayloadWithId]
//
//             const messagesLast100pieces = messagesCompose.filter((m, index, array) =>
//                 index >= array.length - 100)
//
//             return {
//                 ...state,
//                 messages: messagesLast100pieces
//             }
//
//             // return {
//             //     ...state,
//             //     messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
//             //         .filter((m, index, array) => index >= array.length - 100)
//
//         case 'INF/CHAT/STATUS_CHANGED':
//             return {
//                 ...state,
//                 status: action.payload.status
//             }
//         default:
//             return state
//     }
// }
//
// export const actions = {
//     messagesReceived: (messages: ChatMessageAPIType[]) => ({
//         type: 'INF/CHAT/MESSAGES_RECEIVED', payload: {messages}
//     } as const),
//     statusChanged: (status: StatusType) => ({
//         type: 'INF/CHAT/STATUS_CHANGED', payload: {status}
//     } as const)
// }
//
// let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
// const newMessageHandlerCreator = (dispatch: Dispatch) => {
//     if (_newMessageHandler === null) {
//         _newMessageHandler = (messages) => {
//             dispatch(actions.messagesReceived(messages))
//         }
//     }
//     return _newMessageHandler
// }
//
// let _statusChangedHandler: ((status: StatusType) => void) | null = null
// const statusChangedHandlerCreator = (dispatch: Dispatch) => {
//     if (_statusChangedHandler === null) {
//         _statusChangedHandler = (status) => {
//             dispatch(actions.statusChanged(status))
//         }
//     }
//     return _statusChangedHandler
// }
//
// export const startMessagesListening = (): ThunkType => async (dispatch) => {
//     chatAPI.start()
//     chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
//     chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
//
// }
// export const stopMessagesListening = (): ThunkType => async (dispatch) => {
//     chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
//     chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
//     chatAPI.stop()
// }
//
// export const sendMessage = (message: string): ThunkType => async (dispatch) => {
//     chatAPI.sendMessage(message)
// }
//
//
// export default chatReducer
//
// export type InitialStateType = typeof initialState;
// type ActionsType = InferActionsTypes<typeof actions>
// type ThunkType = BaseThunkType<ActionsType | FormAction>