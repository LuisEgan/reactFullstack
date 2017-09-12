import axios from 'axios';
import { FETCH_USER } from './types';

//ES6 Syntax

//Even more
export const fetchUser = () => async dispatch => dispatch({
    type: FETCH_USER,
    payload: (await axios.get('/api/current_user')).data
});

export const handleToken = token => async dispatch => dispatch({
    type: FETCH_USER,
    payload: (await axios.post('/api/stripe', token)).data
});


// export const fetchUser = () => async dispatch => {
//     const res = await axios.get('/api/current_user');
//     dispatch({
//         type: FETCH_USER,
//         payload: res.data
//     });
// }

// export const fetchUser = () => {
//     //With redux-thunk
//     //It is passed to the middle in the createStore() func in index.js
//     //Which inspects whatever value is returned by the action creator (fetchUser)
//     //If redux thunk sees that a function was returned it automatically
//     //calls the function and passes the dispatch() function as an argument
//     //Which (dispatch()) forwards the actions to all different reducers in the app
//     //So...
//     //1 The action creator is called (fetchUser())
//     //2 It returns a function
//     //3 redux-thunk sees that a func was returned
//     //4 calls it with the dispatch func passed as an argument
//     //5 then the request is made with axios
//     //6 we wait until we get a response (.then())
//     //7 then the action is dispatched
//     return function(dispatch) {
//         axios
//             .get('/api/current_user')
//             .then(res => dispatch({
//                 type: FETCH_USER,
//                 payload: res
//             }));
//     }

//     //Without redux-thunk
//     // const request = axios.get('/api/current_user');
//     // return({
//     //     type: FETCH_USER,
//     //     payload: request
//     // });
// };