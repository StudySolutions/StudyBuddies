import createDataContext from './createDataContext';
import { db } from '../firebase/fire';
import * as RootNavigation from '../RootNavigation';

const groupReducer = (state, action) => {
 switch(action.type){
    case 'get_groups':
        return action.payload;
    default:
        return state;
 }
};

/** 
const enroll = dispatch => ({ id, displayName }) => {
    db.collection('courses').doc(id)
    .collection('students').add({
        name: displayName
    }).then(() =>{
    })
    .catch(error =>{
        console.log(error.message);
    });
};
*/

const getGroups = dispatch => async () => {
    const groups = [];

    await db.collection('groups').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            groups.push({id: doc.id,...doc.data()})
        });
    });

    dispatch({ type: 'get_groups', payload: groups});
};

const addGroup = dispatch => async ({course, description, name}) => {
    await db.collection('groups').add(
        {course, description, name, type})
    .then(ref => {
        console.log("Document written with ID: ", ref.id);
    })
    .catch(error => {
        console.error("Error adding document: ", error);
    });
    RootNavigation.navigate('Group');
}; 

export const { Context, Provider } = createDataContext(
    groupReducer, 
    { getGroups, addGroup }, 
    []
);