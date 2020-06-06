import profileReducer, { deletePost, setPosts, setUserProfile } from './profile-reducer'
import { addPost } from '../actions/actions';

const state = {
    posts: [
       { id: 1, title: "TITLE_1", text: "TEXT_1" },
       { id: 2, title: "TITLE_2", text: "TEXT_2" },
       { id: 3, title: "TITLE_3", text: "TEXT_3" },
       { id: 4, title: "TITLE_4", text: "TEXT_4" },
    ],
    profile: [
        {id: 1, name: "Dennis", surname: "Gryshakin", email: "dgrishakin12@gmail.com"}
    ], 
    succesUser: [
        {id: 1, name: "Dennis", surname: "Gryshakin", email: "dgrishakin12@gmail.com"}
    ], 
    notSuccesUser: [
        {id: 2, name: "VAdim", surname: "324342", email: "dfdfdfdf@gmail.com"}
    ], 

}

it('after deleting length of posts should be decrement', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3)
});

it('getting posts', () => {
    let action = setPosts(state.posts)
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4)
})

it('getting user profile', () => {
    let action = setUserProfile(state.profile)
    let newState = profileReducer(state, action);
    expect(newState.profile).toEqual(state.succesUser)
})

it('getting error profile', () => {
    let action = setUserProfile(state.profile)
    let newState = profileReducer(state, action);
    expect(newState.profile).toEqual(state.notSuccesUser)
})

