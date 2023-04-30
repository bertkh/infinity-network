import React from 'react';
import Profile from './Profile';
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
// @ts-ignore
import {useParams, RouteComponentProps} from 'react-router-dom';
import {compose} from 'redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect';
import {AppStateType} from '../../redux/redux-store';
import {ProfileType} from '../../types/types';


type MapPropsType = ReturnType<typeof mapsStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
            if (!userId) {
                console.error('ID should exist in URI params or in state ("authorizedUserId")')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match && this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        } else if (!this.props.match && this.props.match !== prevProps.match) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile saveProfile={function (profile: ProfileType): Promise<any> {
                throw new Error('Function not implemented.');
            }} {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}


export function withRouter<WCP extends object>(Children: React.ComponentType<WCP>) {
    return (props: WCP) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}



let mapsStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    connect(mapsStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);