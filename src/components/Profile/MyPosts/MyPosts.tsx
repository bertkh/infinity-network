import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostForm, {AddPostFormValuesType} from './Post/AddPostForm';
import {PostType} from '../../../types/types';

export type MapMyPostsPropsType = {
    posts: Array<PostType>
}
export type DispatchMyPostsPropsType = {
    addPost: (newPostText: string) => void
}
type PropsType = MapMyPostsPropsType & DispatchMyPostsPropsType

const MyPost: React.FC<PropsType> = props => {
    const postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost} message={''} likesCount={0}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPost)

export default MyPostsMemorized
