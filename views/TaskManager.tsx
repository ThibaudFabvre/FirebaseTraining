import React, { useState, useEffect } from 'react';
import {View, StyleSheet }  from 'react-native';
import { getTasksList } from '../api/tasklist';
import { List } from '.';


const TaskManager: React.FC = () => {

    const [tasksList , setTasksList] = useState([{}]);
    const toDoList = tasksList.filter(element => element.status === 'to do')
    const inProgressList = tasksList.filter( element => element.status === 'in progress')
    const doneList = tasksList.filter(element => element.status === 'done')
    useEffect(() => {
        const newFunc = async () => {
            const tasksList = await getTasksList();
            setTasksList(tasksList);
        };
        try {
            newFunc();
        } catch {
            'error in fetching tasks list'
        }
    },[]);

    return (
        <View style={{flex: 1}}>
            <View style={styles.overallStyle}>
                <List list={toDoList} color={'#87CEEB'}/>
                <List list={inProgressList} color={'#FF7F00'}/>
                <List list={doneList} color={'#BFFF00'}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    overallStyle: {
        flex: 11,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 40,
        justifyContent: 'space-around',
    },
});

export default TaskManager;