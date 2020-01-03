import React from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import { deleteTaskFromList } from '../api/tasklist';
interface Props {
    title: string,
    resume: string,
    id: number,
}

const Task: React.FC<Props> = ({ title, resume, id}) => {

    const handleDeletion = () => {
        try {
            deleteTaskFromList(id);
            console.log('successfuly removed task from list');
        } catch {
            console.log('could not remove task from list');
        }
    }
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
            <Button title="X" onPress={() => handleDeletion()}/>
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