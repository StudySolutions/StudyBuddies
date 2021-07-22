import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import SignupAuthForm from '../components/SignupAuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = () => {
    const { state, signup, clearErrorMessage} = useContext(AuthContext);
    return (
        <View style={style.container}>
            <SignupAuthForm 
            headerText="Sign Up to Create Your Account" 
            errorMessage={state.errorMessage}
            onSubmit={signup}
            submitButtonText="Sign Up"
            />
            <NavLink navigateText="Already have an account? Go to Sign In" routeName="Signin"/>
        </View>
    );
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;