import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);
    return (
        <View style={style.container}>
            <Text h2>Account Screen</Text>
            <Spacer/>
            <Button title="Sign Out" onPress={signout}/>
        </View>
    );
}

AccountScreen.navigationOptions = () => {
    return{
        header: { visible: true },
    };
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default AccountScreen;