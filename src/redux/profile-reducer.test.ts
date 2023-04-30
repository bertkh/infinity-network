import profileReducer, {actions} from './profile-reducer'

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: ' 10'},
        {id: 2, message: 'It\'s my first post', likesCount: ' 12'},
        {id: 2, message: 'Sheeeeeeesh', likesCount: ' 11'},
        {id: 2, message: 'Hehe', likesCount: ' 9'}
    ],
    profile: null,
    status: '',
}

test('length of posts should be incremented', () => {
    //1. test data
    let action = actions.addPostActionCreator('bertwrld')
    //2. action
    // @ts-ignore
    let newState = profileReducer(state, action)
    //3. expectations
    expect(newState.posts.length).toBe(5)
})


test('after deleting length of messages should be decrement', () => {
    //1. test data
    let action = actions.deletePost(1)
    //2. action
    // @ts-ignore
    let newState = profileReducer(state, action)
    //3. expectations
    expect(newState.posts.length).toBe(3)
})

test('after deleting length should not be decrement if id is incorrect', () => {
    //1. test data
    let action = actions.deletePost(1000)
    //2. action
    // @ts-ignore
    let newState = profileReducer(state, action)
    //3. expectations
    expect(newState.posts.length).toBe(4)
})
