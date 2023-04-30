type FriendsType = {
    id: number
    name: string
}
let initialState = {
    friends: [
        {id: 1, name: 'Al'},
        {id: 1, name: 'Keyreal'},
        {id: 1, name: 'Tom'},
        {id: 1, name: 'Ork'},
        {id: 1, name: 'Garakiro'},
        {id: 1, name: 'Dan'},
        {id: 1, name: 'Elza'},
    ] as Array<FriendsType>
};
type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer;