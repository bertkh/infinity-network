import {FormAction, stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from '../types/types'
import {profileAPI} from '../api/profile-api'
import {BaseThunkType, InferActionsTypes} from './redux-store'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 21},
        {id: 2, message: 'It\'s my first post', likesCount: 13},
        {id: 2, message: 'Sheeeeeeesh', likesCount: 10},
        {id: 2, message: 'Hehe', likesCount: 5}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    photos: {
        small: '',
        large: '',
    },
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INF/PROFILE/ADD_POST': {
            let newPost = {
                id: 4,
                message: action.newPostText,
                likesCount: Math.floor(Math.random() * 100)
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case 'INF/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'INF/PROFILE/SET_USER_STATUS': {
            return {
                ...state,
                status: action.status,

            }
        }
        case 'INF/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case 'INF/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'INF/PROFILE/ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'INF/PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'INF/PROFILE/SET_USER_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'INF/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'INF/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
    setAuthPhoto: (photos: PhotosType) => ({type: 'INF/AUTH/SET_AUTH_PHOTO', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId)
    dispatch(actions.setUserStatus(data))
}
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateUserStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status))
        }
    } catch (error) {
    }
}
export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(photo)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
        // @ts-ignore
        dispatch(actions.setAuthPhoto(data.data.photos.small))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if (userId != null) {
            await dispatch(getUserProfile(userId))
        } else {
            throw new Error('userid can\'t be null')
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>