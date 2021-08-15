import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignupAuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reTypePassword, setReTypePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { addUsername, saveUserToFireStore } = useContext(AuthContext);

    return (
        <>
            <Spacer>
            <Text h3>{headerText}</Text>
            </Spacer>
            <Input
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCorrect={false}
            />
            <Spacer/>
            <Input
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCorrect={false}
            />
            <Spacer/>
            <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            />
            <Spacer />
            <Input
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            />
            <Spacer />
            <Input
            secureTextEntry
            label="Validate Password"
            value={reTypePassword}
            onChangeText={setReTypePassword}
            autoCapitalize="none"
            autoCorrect={false}
            />
            {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Spacer>
            <Button title={submitButtonText} onPress={() => {
                onSubmit({ email, password, reTypePassword, firstName, lastName });
                addUsername({ firstName, lastName });
                saveUserToFireStore();
                }}/>
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15,
      }
});

export default SignupAuthForm;