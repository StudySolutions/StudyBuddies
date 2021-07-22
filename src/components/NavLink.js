import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { useNavigation } from '@react-navigation/core';

const NavLink = ({ navigateText, routeName }) => {
    const navigation = useNavigation();
    return (
        <>
        <Spacer/>
        <TouchableOpacity onPress={()=> navigation.navigate(routeName)}>
                <Text style={styles.link}>{navigateText}</Text>
        </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default NavLink;