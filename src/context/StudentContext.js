import createDataContext from './createDataContext';
import { db } from '../firebase/fire';

const studentReducer = (state, action) => {
 switch(action.type){
    case 'get_students':
        return action.payload;
    default:
        return state;
 }
};

const getStudents = dispatch => async (id) => {
    const students = [];

    await db.collection('courses').doc(id).collection('students').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            students.push({id: doc.id,...doc.data()});
    });
    });

    dispatch({ type: 'get_students', payload: students});
}


export const { Context, Provider } = createDataContext(
    studentReducer, 
    { getStudents }, 
    []
);