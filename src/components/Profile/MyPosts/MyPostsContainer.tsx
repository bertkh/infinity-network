import React from 'react'
import {actions} from '../../../redux/profile-reducer'
import MyPosts, {DispatchMyPostsPropsType, MapMyPostsPropsType} from './MyPosts'
import {connect} from 'react-redux'
import {AppStateType} from '../../../redux/redux-store'

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<MapMyPostsPropsType,
    DispatchMyPostsPropsType, {}, AppStateType>
(mapStateToProps,
    {addPost: actions.addPostActionCreator}
)(MyPosts)

export default MyPostsContainer