import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import {PropsType} from './ProfileInfo/ProfileInfo'


const Profile: React.FC<PropsType> = (props) => {
    return <div>
        <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner}
                     saveProfile={props.saveProfile}
                     profile={props.profile} status={props.status}
                     updateUserStatus={props.updateUserStatus}/>
        <MyPostsContainer/>
    </div>
}

export default Profile