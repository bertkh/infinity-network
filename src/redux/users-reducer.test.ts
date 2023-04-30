import usersReducer, {actions, InitialState} from './users-reducer'


let state: InitialState

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Al 0', status: 'status 0',
                photos: {small: null, large: null}, followed: false
            },
            {
                id: 1, name: 'Al 1', status: 'status 0',
                photos: {small: null, large: null}, followed: false
            },
            {
                id: 2, name: 'Al 2', status: 'status 0',
                photos: {small: null, large: null}, followed: true
            },
            {
                id: 3, name: 'Al 3', status: 'status 0',
                photos: {small: null, large: null}, followed: true
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }
})

it('follow success', function () {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

it('unfollow success', function () {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})