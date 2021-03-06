import createDataContext from './createDataContext';
import { db } from '../firebase/fire';
import * as RootNavigation from '../RootNavigation';
import { auth } from '../firebase/fire';
const courseReducer = (state, action) => {
 switch(action.type){
    case 'get_courses':
        return action.payload;
    case 'enroll':
        return state;
    default:
        return state;
 }
};

const enroll = dispatch => ({ id, displayName }) => {
    db.collection('courses').doc(id)
    .collection('students').doc(auth.currentUser.uid).set({
        name: displayName
    }).then(() =>{
    })
    .catch(error =>{
        console.log(error.message);
    });
};


const getCourses = dispatch => async () => {
    const courses = [];

    await db.collection('courses').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            courses.push({id: doc.id,...doc.data()})
        });
    });

    dispatch({ type: 'get_courses', payload: courses});
};

const addCourse = dispatch => async ({code, description, name, type}) => {
    await db.collection('courses').add(
        {code, description, name, type})
    .then(ref => {
        console.log("Document written with ID: ", ref.id);
    })
    .catch(error => {
        console.error("Error adding document: ", error);
    });
    RootNavigation.navigate('Home');
}; 

export const { Context, Provider } = createDataContext(
    courseReducer, 
    { getCourses, addCourse, enroll }, 
    []
);