import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";

const USER_LOADING = "USER_LOADING";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const GET_ERRORS = "GET_ERRORS";
const DELETE_POST = "DELETE-POST";

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

export const updateUser = (userData, history) => dispatch => {
  axios
    .post(`/api/users/edit/${userData.id}`, userData)
    .then(res => history.push("/profile/"+ res.data._id)) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addPost = (postData, history) => dispatch => {
  axios
    .post("/api/posts/new/"+postData.userId, postData)
    .then(res => {
      history.push("/profile/"+res.data.userId)
      window.location.reload();
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
    .post(`/api/posts/update/${updateData.userId}/${updateData.postId}`, updateData)
    .then(res => {
      history.push("/profile/"+res.data.userId)
      window.location.reload();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const deletePostReq = (id) => dispatch => {
  axios.delete("/api/posts/" + id)
    .then(res => {
      console.log(res.data)
      dispatch(deletePost(res.data._id))
    })
}

export const deletePost = (id) => {
  return ({
    type: DELETE_POST,
    id: id
  })
}
// export const updatePost = (updatePostData, history) => dispatch => {
//   axios
//     .post("/api/posts/update/", updatePostData)
//     .then(res => history.push("/profile"))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// }

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


// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};