import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
interface Props {
    title: string,
    resume: string,
}

const Task: React.FC<Props> = ({ title, resume}) => {
    return (
        <View style={styles.defaultCardStyle}>
                <Text style={{textAlign: 'center', padding: 10}}>{title}</Text>
                <Text style={{padding: 10}}>{resume}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{backgroundColor: '#008080', width: 80}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Edit</Text>
                </View>
                <View style={{backgroundColor: 'red', width: 80}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Delete</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    defaultCardStyle: {
        borderRadius: 15,
        backgroundColor: '#fff',
        borderWidth: 5,
        width: '80%',
        margin: 10,
    },
});

export default Task;