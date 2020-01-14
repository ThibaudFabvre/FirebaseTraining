
import React, {useState}  from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TouchableHighlight , ScrollView}  from 'react-native';
import { SquareButton } from '../';

const Register = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const register = () => {
        try {
            registerUserInDatabase();
        } catch {
            console.log('could not register user in database');
        }
    }

    return (
        <View>
            <TextInput placeholder='username' onChangeText={input => setUsername(input)} value={username}/>
            <TextInput placeholder='password' onChangeText={input => setPassword(input)} value={password}/>
            <SquareButton text='Register' action={register()}/>
        </View>
    );
};

export default Register;