import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = () => {
    const { state, signin, clearErrorMessage} = useContext(AuthContext);

    return (
        <View style={style.container}>
            <AuthForm 
            headerText="Sign In to Your Account" 
            errorMessage={state.errorMessage}
            onSubmit={signin}
            submitButtonText="Sign In"
            />
            <NavLink navigateText="Don't have an account? Go to Sign Up" routeName="Signup"/>
        </View>
    );
};

SigninScreen.navigationOptions = () => {
    return{
        headerShown: false
    };
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    }
})

export default SigninScreen;