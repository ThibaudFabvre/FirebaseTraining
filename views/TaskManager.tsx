import React, { useState, useEffect } from 'react';
import {View, StyleSheet }  from 'react-native';
import { getTasksList } from '../api/tasklist';
import { List, AddTaskForm } from '.';


const TaskManager: React.FC = () => {

    const [tasksList , setTasksList] = useState([{}]);
    const toDoList= tasksList.filter(element => element.status === 'to do');
    const inProgressList = tasksList.filter( element => element.status === 'in progress')
    const doneList = tasksList.filter(element => element.status === 'done')

    const reloadList = async () => {
        const tasksList = await getTasksList();
        console.log('successfuly retrieved task list');
        setTasksList(tasksList);
    }

    const deleteTask = async (id) => {
        try {
            const newList = tasksList.filter(task => task.id !== id);
            console.log(newList);
            setTasksList(newList);
        } catch {

        }
    }

    const addTaskToList = (task) => {
        setTasksList(tasksList.concat(task));
        reloadList();
    }
    
    const deleteTaskFromList = (taskId) => {
        deleteTask(taskId);
        reloadList();
    }

    useEffect(() => {
        const newFunc = async () => {
            await reloadList();
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
                <List deleteTaskFromList={deleteTaskFromList} list={toDoList} color={'#87CEEB'}/>
                <List deleteTaskFromList={deleteTaskFromList} list={inProgressList} color={'#FF7F00'}/>
                <List deleteTaskFromList={deleteTaskFromList} list={doneList} color={'#BFFF00'}/>
            </View>
            <AddTaskForm addTaskToList={addTaskToList} />
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