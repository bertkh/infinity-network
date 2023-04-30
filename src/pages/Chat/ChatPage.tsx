import React, {UIEvent, useEffect, useRef, useState} from 'react'
import {Button, Spin} from 'antd'
import {TextAreaOrInputOnChangeType} from '../../types/types'
import {outputDateSeconds} from '../../utils/validators/object-helpers'
import {useDispatch, useSelector} from 'react-redux'
import {selectIsAuth, useAppDispatch, useAppSelector} from '../../redux/auth-selectors'
import {ChatMessageAPIType} from '../../api/chat-api'
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer'
import {AppStateType} from '../../redux/redux-store'
import s from './ChatPage.module.css'
import userPhoto from '../../assets/images/ava.jpg'
import { Input } from 'antd';

const { TextArea } = Input;


const ChatPage: React.FC = () => {

    const isAuth = useSelector(selectIsAuth)

    return (
        <div>
            <div>
                {isAuth
                    ? <Chat/>
                    : <AddMessageForm
                        isAuth={isAuth}/>
                }
            </div>

        </div>
    )
}

const Chat: React.FC = () => {

    const dispatch = useAppDispatch()

    const status = useAppSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {

        console.log('старт', outputDateSeconds())

        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }

    }, [dispatch])

    return (
        <div>

            {status === 'error'
                && <div> Some error occurred. Please refresh the page </div>}

            <>
                <Messages/>
                <AddMessageForm
                    isAuth={true}/>
            </>

        </div>
    )
}

const Messages: React.FC = () => {

    console.log('>>>Messages')

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)

    const onScrollHandler = (e: UIEvent<HTMLDivElement>) => {

        const element = e.currentTarget

        let differenceWhatWeSee = element.scrollHeight - element.scrollTop
        //element.scrollHeight - высота всей таблицы пикселей - 3800 например
        // element.scrollTop - сколько сейчас в
        // верхней точке длинна пикселей - 3400 например
        // прокрутка вверх то тут уже 3300 и разница уже 500 пикселей

        let value = Math.abs(differenceWhatWeSee - element.clientHeight)
        //let value = differenceWhatWeSee - element.clientHeight
        // element.clientHeight - всегда как у див тоесть = 400
        // 500 - 400 = 100

        if (value < 300) {
            if (!isAutoScrollActive) {

                setIsAutoScrollActive(true)
                //console.log('Включили автоскролл')
            }
        } else {
            if (isAutoScrollActive) {
                setIsAutoScrollActive(false)
                //console.log('ВЫКЛЮЧИЛИ автоскролл')
            }
        }
        // console.log(element.scrollHeight, element.scrollTop,
        //    differenceWhatWeSee, element.clientHeight, value)
    }

    useEffect(() => {

        if (isAutoScrollActive) {
            setTimeout(() => {
                messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
            }, 500)
        }
        // eslint-disable-next-line
    }, [messages])

    return (
        <div style={{height: '500px', overflowY: 'auto'}} onScroll={onScrollHandler}>
            {messages.map((m) => {
                return <Message key={m.id} message={m}/>
            })}
            <div ref={messagesAnchorRef}>
            </div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = ({message}) => {
    return (
        <div>
            <div className={s.messageBlock}>
                <span>
                    <img src={message.photo != null
                        ? message.photo
                        : userPhoto}/>
                </span>
                <span>
                    <div><b> {message.userName}</b> (userId: {message.userId})</div>
                    <div className={s.messageText}>{message.message}</div>
                </span>
            </div>
            <hr/>
        </div>
    )
}

const AddMessageForm: React.FC<{ isAuth: boolean }> = ({isAuth}) => {

    const [message, setMessage] = useState('')

    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch = useDispatch()

    // Description
    const onChangeTextArea = (event: TextAreaOrInputOnChangeType) => {
        setMessage(event.target.value)
    }

    const onSendMassagesButton = () => {
        onSendMessage()
    }

    const isDisabledButton = status !== 'ready'

    const onKeyPressInTextArea = (event: any) => {

        if (event.ctrlKey && event.code === 'Enter') {

            if (isDisabledButton) {

                console.log(
                    'хотел отправить сообщение через Ctrl + Enter в момент подключения')
                return

            } else {
                onSendMessage()
            }
        }
    }

    const onSendMessage = () => {

        if (!message) {
            alert('Пустое сообщение невозможно отправить!')
            return
        }

        const date = new Date()
        const time = String(
            date.getHours()
            + ':' + date.getMinutes()
        )

        const messageWithTime = `${message} (${time})`

        if (messageWithTime.length > 100) {
            alert(
                `Можно отправлять не более 100 знаков,
            а сейчас уже ${messageWithTime.length}`)
            return
        }
        console.log('отправили сообщение', outputDateSeconds())

        // @ts-ignore
        dispatch(sendMessage(message))

        setMessage('')
    }

    const placeholderText =
        `Press Ctrl + Enter to send a message or button "Send".\nYou can't send more than 100 symbols.`
    //endregion

    return (
        <div>
            <div>
            <TextArea
                style={{height: '100px', width: '1150px'}}
                onChange={onChangeTextArea}
                value={message}
                placeholder={placeholderText}
                onKeyPress={onKeyPressInTextArea}
            />
            </div>

            <div>
                {isAuth
                    ? ''
                    : 'Chat works only for login users!'

                }
            </div>

            <div>
                {isDisabledButton
                    ? <Spin/>
                    : <Button
                        onClick={onSendMassagesButton}>Send
                    </Button>
                }
            </div>
        </div>
    )
}


export default ChatPage


// import React, {useEffect, useRef, useState} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer'
// import {AppStateType} from '../../redux/redux-store'
// import {ChatMessageAPIType} from '../../api/chat-api'
// import {Button} from 'antd'
//
// const ChatPage: React.FC = () => {
//     return <div>
//         <Chat/>
//     </div>
// }
//
// const Chat: React.FC = () => {
//     const dispatch = useDispatch()
//     const status = useSelector((state: AppStateType) => state.chat.status)
//
//
//     useEffect(() => {
//         // @ts-ignore
//         dispatch(startMessagesListening())
//         return () => {
//             // @ts-ignore
//             dispatch(stopMessagesListening())
//         }
//     }, [])
//
//     return <div>
//         {status === 'error' && <div>Some error occured. Please refresh the page</div>}
//         <>
//             <Messages/>
//             <AddMessageForm/>
//         </>
//     </div>
// }
//
// const Messages: React.FC = () => {
//     const messages = useSelector((state: AppStateType) => state.chat.messages)
//     const messagesAnchorRef = useRef<HTMLDivElement>(null)
//     const [isAutoScroll, setIsAutoScroll] = useState(false)
//
//     const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
//         const element = e.currentTarget
//         if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
//             !isAutoScroll && setIsAutoScroll(true)
//         } else {
//             isAutoScroll && setIsAutoScroll(false)
//         }
//     }
//
//     useEffect(() => {
//         messagesAnchorRef.current?.scrollIntoView(true)
//     }, [messages])
//
//     return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
//         {messages.map((m, index) => <Message key={m.id} message={m}/>)}
//         <div ref={messagesAnchorRef}></div>
//     </div>
// }
//
// const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
//     return <div>
//         <img src={message.photo} style={{width: '35px'}}/><b> {message.userName} (userId: {message.userId}) </b>
//         <br />
//         {message.message}
//         <hr />
//     </div>
// })
//
// const AddMessageForm: React.FC = () => {
//     const [message, setMessage] = useState('')
//     const dispatch = useDispatch()
//     const status = useSelector((state: AppStateType) => state.chat.status)
//
//     const sendMessageHandler = () => {
//         if (!message) {
//             return
//         }
//         // @ts-ignore
//         dispatch(sendMessage(message))
//         setMessage('')
//     }
//
//     return <div>
//         <div>
//             <textarea style={{height: '80px', width: '1150px'}} onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
//         <div>
//             <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
//         </div>
//
//     </div>
// }
//
// export default ChatPage
//
