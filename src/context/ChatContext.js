import { db, auth } from '../firebase/fire';
import createDataContext from './createDataContext';

const chatReducer = (state, action) => {
    switch(action.type) {
        case "get_chats":
            return action.payload;
        case "clear_chats":
                return [];
        default: 
            return state;
    }
};

const getChats = dispatch => async () => {
    const chats = [];
    db.collection('chats').where("members", "array-contains", auth.currentUser.uid)
    .orderBy("lastUpdated", "desc").get().then( snapshot => {
        snapshot.forEach(doc => {
            const mem1 = doc.data().members[0];
            const mem2 = doc.data().members[1];

            if(mem1 != auth.currentUser.displayName){
                db.collection('users').doc(mem1).get().then(user => {
                    chats.push({id: doc.id, name: user.data().name, ...doc.data()})
                    dispatch({ type: 'get_chats', payload: chats});
                })
            }
            else{
                db.collection('users').doc(mem2).get().then(user => {
                    chats.push({id: doc.id, name: user.data().name, ...doc.data()})
                    dispatch({ type: 'get_chats', payload: chats});
                })
            }
        })
    })
};

/*
const getChats = dispatch => async () => {
    const chats = [];
    await db.collection('userChats')
    .doc(auth.currentUser.uid).collection('chats')
    .get().then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
            await db.collection('chats').doc(doc.id).get().then(doc => {
                chats.push({id: doc.id,...doc.data()});
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
            dispatch({ type: 'get_chats', payload: chats});
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
};
*/

export const { Context, Provider } = createDataContext(
    chatReducer, 
    { getChats }, 
    []
);