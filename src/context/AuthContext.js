import createDataContext from "./createDataContext";
import { auth, db } from '../firebase/fire';
import * as RootNavigation from '../RootNavigation';
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", user: action.payload };
    case "clear_error_message":
      return{ ...state, errorMessage: ''};
    case "signout":
      return{user: null, errorMessage: ''}
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'});
}

const addUsername = dispatch => ({firstName, lastName}) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var displayName = firstName + " " + lastName;
      user.updateProfile({
        displayName: displayName
      }).then(async () => {
        var jsonUser = JSON.stringify(user);
        await AsyncStorage.setItem('user', jsonUser);
        dispatch({ type: 'signin', payload: user });
      }).catch((error) => {
        console.log(error.message);
      });  
    }
  });
}

const tryLocalSignin = dispatch => async () => {
  try{
    const jsonUser = await AsyncStorage.getItem('user');
    var user = JSON.parse(jsonUser);
    if(user !== null) {
      RootNavigation.navigate('Main');
    }
    else {
      RootNavigation.navigate('Signup');
    }
  } catch(error) {
      console.log(error);
  }
};

const signup = (dispatch) => async ({ email, password, reTypePassword }) => {
  //var regExNumber = new RegExp('/[0-9]') // uppercase letter
  var regExUpper = new RegExp('/[A-Z]') // uppercase letter
  var regExLower = new RegExp('/[a-z]') // lowercase letter
  /*if (!regExNumber.test(password)) {
    var errorMessage = "Password must include a number";
    dispatch({ type: 'add_error', payload: errorMessage});
    return;
  }; */
  console.log("Password: " + password);
  console.log("retype: " + reTypePassword);
  if (password !== reTypePassword) {
    var errorMessage = "Passwords must match";
    dispatch({ type: 'add_error', payload: errorMessage});
    return;
  }
  
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
  
  if (!validPassword.test(password)) {
    var errorMessage = "Passwords must include a number, capital letter, and lowercase letter";
    dispatch({ type: 'add_error', payload: errorMessage});
    return;
  }
  /*
  if (!regExUpper.test(password)) {
    var errorMessage = "Password must include an uppercase letter";
    dispatch({ type: 'add_error', payload: errorMessage});
    return;
  };
  if (!regExLower.test(password)) {
    var errorMessage = "Password must include a lowercase letter";
    dispatch({ type: 'add_error', payload: errorMessage});
    return;
  }; */

  auth.createUserWithEmailAndPassword(email, password)
    .then( async (userCredential) => {
    })
    .catch( error => {
      var errorMessage = error.message;
      dispatch({ type: 'add_error', payload: errorMessage});
      console.log("HERE")
      console.log(errorMessage)
    });
};

const signin = (dispatch) => async ({ email, password }) => {
  auth.signInWithEmailAndPassword(email, password)
    .then( async userCredential => {
      var user = userCredential.user;
      var jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem('user', jsonUser);
      dispatch({ type: 'signin', payload: user });
      RootNavigation.navigate('Main', { screen: 'Course' });
    })
    .catch(error => {
      var errorMessage = error.message;
      dispatch({ type: 'add_error', payload: errorMessage });
      console.log(errorMessage);
    })
};

const signout = (dispatch) => async () => {
  auth.signOut().then( async () => {
    await AsyncStorage.removeItem('user');
    dispatch({ type: 'signout' });
    RootNavigation.navigate('Signup');
  }).catch(error => {
    var errorMessage = error.message;
    dispatch({ type: 'add_error', payload: errorMessage });
    console.log(errorMessage);
  })
};

const saveUserToFireStore = (dispatch) => async () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      var currentUser = auth.currentUser;
      console.log(currentUser);
      db.collection('users').doc(currentUser.uid).set({
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL
      }).then(() =>{
        console.log("user saved")
        RootNavigation.navigate('Main');
      })
      .catch(error =>{
          console.log(error.message);
      });
    }
  });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin, addUsername, saveUserToFireStore },
  { errorMessage: "", user: null }
);