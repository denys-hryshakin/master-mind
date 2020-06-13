import React from 'react';
import { shallow, render, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import usersReducer,{ initialState, SET_USERS, SET_CURRENT_PAGE, SET_TOTAL_USERS_COUNT, TOGGLE_IS_FETCHING } from '../../redux/reducers/users-reducer';
import * as ac from '../../redux/actions/actions';

const mockStore = configureMockStore();

describe('Users reducer', () => {
    const state = {
        test_list_users: [
            { id: 1, name: "NAME", surname: "SURNAME" },
            { id: 2, name: "NAME", surname: "SURNAME" },
            { id: 3, name: "NAME", surname: "SURNAME" },
            { id: 4, name: "NAME", surname: "SURNAME" },
        ],
        currentPage: 230,
        totalUsersCount: 100004343252,
        isFetching: true
    }
    it('Getting list of users', () => {
        const action = {
            type: SET_USERS,
            users: state.test_list_users
        }
        console.log("Sending the GET_REQUEST to the server with address: http://localhost:4000/api/users");
        console.log("The data on the server:");
        console.log(state);
        expect(usersReducer(initialState, action)).toEqual({
            ...initialState,
            users: action.users
        })
        console.log("Server sending this data:");
        console.log(action.users);
    })
    it('Setting current page', () => {
        const action = {
            type: SET_CURRENT_PAGE,
            currentPage: state.currentPage
        }
        expect(usersReducer(initialState, action)).toEqual({
            ...initialState,
            currentPage: action.currentPage
        })
    })
    it('Setting total users count', () => {
        const action = {
            type: SET_TOTAL_USERS_COUNT,
            currentPage: state.totalUsersCount
        }
        expect(usersReducer(initialState, action)).toEqual({
            ...initialState,
            totalUsersCount: action.totalUsersCount
        })
    })
    it('Toggle isLoading', () => {
        const action = {
            type: TOGGLE_IS_FETCHING,
            isFetching: state.isFetching
        }
        expect(usersReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: action.isFetching
        })
    })

})
