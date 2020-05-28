import { newsAPI } from './../actions/actions'

const SET_NEWS = 'SET-NEWS';

let initialState = {
    news: [],
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS:
            return { ...state, news: action.news }
        default:
            return state;
    }
}

export const setNews = (news) => ({ type: SET_NEWS, news: news })

export const getNews = () => {
    return (dispatch) => {
        newsAPI.getNews()
            .then(data => {
                dispatch(setNews(data.news))
            })
    }
}

export default newsReducer;