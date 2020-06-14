import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";

const USER_LOADING = "USER_LOADING";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const GET_ERRORS = "GET_ERRORS";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
export const updateUser = (userData, history) => dispatch => {
  axios
    .post(`/api/users/edit/${userData.id}`, userData)
    .then(res => history.push("/profile/" + res.data._id)) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};





// POSTS //////////////////////////////////////////////////////////////////////////////////////// 
export const getPosts = (userId) => {
  return (
    axios.get(`http://localhost:4000/api/posts/` + userId)
      .then(response => {
        return response.data
      })
  )
}
export const getComments = (postId) => {
  return (
    axios.get(`http://localhost:4000/api/comments/` + postId)
      .then(response => {
        return response.data
      })
  );
}
export const getPost = (postId) => {
  return (
    axios.get(`http://localhost:4000/api/posts/userpost/` + postId)
      .then(response => {
        return response.data
      })
  )
}
export const uploadPhoto = (photoData) => {
  axios.post("/api/posts/upload", photoData)
    .then(res => {
      console.warn(res.data)
    })
    .catch(error => {
      console.warn(error)
    })
}
export const addPost = (postData, history) => dispatch => {
  axios
    .post("/api/posts/new/" + postData.userId, postData)
    .then(res => {
      history.push("/profile/" + res.data.userId)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
export const updatePost = (updateData, history) => dispatch => {
  axios
    .put(`/api/posts/update/${updateData.userId}/${updateData.postId}`, updateData)
    .then(res => {
      history.push("/profile/" + res.data.userId)
      // window.location.reload();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
export const deleteAPI = {
  deletePostReq(id) {
    return (
      axios.delete("/api/posts/" + id)
        .then(res => {
          return res.data
        })
    );
  }
}





// USERS //////////////////////////////////////////////////////////////////////////////////////// 
export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return (
      axios.get(`/api/users/pagination/?page=${currentPage}&count=${pageSize}`)
        .then(response => {
          return response.data
        })
    );
  }
}


// NEWS ////////////////////////////////////////////////////////////////////////////////////////
export const newsAPI = {
  getNews() {
    return (
      axios.get(`/api/news/`)
        .then(response => {
          return response.data
        })
    );
  }
}


// PROFILE //////////////////////////////////////////////////////////////////////////////////////// 
export const profileAPI = {
  getProfile(userId) {
    return (
      axios.get(`http://localhost:4000/api/users/profile/` + userId)
        .then(response => {
          return response.data
        })
    );
  },
  sendComment(newComment) {
    return axios.post(`http://localhost:4000/api/comments/new/${newComment.userId}/${newComment.postId}`, newComment)
  },
  getStatus(userId) {
    return axios.get('http://localhost:4000/api/users/profile/status/' + userId)
  },
  updateStatus(userId, status) {
    return axios.put('http://localhost:4000/api/users/profile/status/' + userId, status)
  },
  getName(userId) {
    return axios.get('http://localhost:4000/api/users/profile/name/' + userId)
  },
  updateName(userId, name) {
    return axios.put('/api/users/profile/name/' + userId, name)
  },
  getSurname(userId) {
    return axios.get('http://localhost:4000/api/users/profile/surname/' + userId)
  },
  updateSurname(userId, surname) {
    return axios.put('/api/users/profile/surname/' + userId, surname)
  },
  getCountry(userId) {
    return axios.get('http://localhost:4000/api/users/profile/country/' + userId)
  },
  updateCountry(userId, country) {
    return axios.put('/api/users/profile/country/' + userId, country)
  },
  getCity(userId) {
    return axios.get('http://localhost:4000/api/users/profile/city/' + userId)
  },
  updateCity(userId, city) {
    return axios.put('/api/users/profile/city/' + userId, city)
  },

  setAddress(userId, locationData) {
    return axios.put('/api/users/geolocation/address/' + userId, locationData)
  },
  getAddress(userId) {
    return axios.get('/api/users/geolocation/address/' + userId)
  },
}