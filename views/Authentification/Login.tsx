
import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TouchableHighlight , ScrollView}  from 'react-native';
import { SquareButton } from '../';

const Login = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        try {
            authenticateUser();
        } catch {
            console.log('could not login using the specified credentials');
        }
    }

    return (
        <View>
            <TextInput placeholder='username' onChangeText={input => setUsername(input)} value={username}/>
            <TextInput placeholder='password' onChangeText={input => setPassword(input)} value={password}/>
            <SquareButton text='Login' action={() => login()}/>
        </View>
    );
};

export default Login;