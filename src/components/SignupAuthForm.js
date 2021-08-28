import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const SignupAuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { addUsername, saveUserToFireStore } = useContext(AuthContext);

    return (
        <SafeAreaView>
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
            {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Spacer>
<<<<<<< Updated upstream
            <Button title={submitButtonText} onPress={() => {
<<<<<<< Updated upstream
                onSubmit({ email, password, firstName, lastName });
=======
                onSubmit({ email, password, reTypePassword, firstName, lastName });
=======
            <TouchableOpacity onPress={()=> {
               onSubmit({ email, password, firstName, lastName });
>>>>>>> Stashed changes
>>>>>>> Stashed changes
                addUsername({ firstName, lastName });
            }}>
                <LinearGradient 
                    colors={['#c0392b', '#f1c40f']}
                    start={{x: 0, y: 0.5}}
                    end={{x:1, y:1}}
                    style={styles.button}>
                    
                        <Text style={styles.bottomText}>Sign Up</Text>
                </LinearGradient>
            </TouchableOpacity>
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15,
      },
      button:{
        marginTop: 50,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10
      },
      bottomText:{
          textAlign: 'center',
          fontSize: 24,
          color: '#fff'
      }
});

export default SignupAuthForm;