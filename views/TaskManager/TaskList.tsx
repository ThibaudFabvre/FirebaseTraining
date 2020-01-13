import React from 'react';
import { View} from 'react-native';
import { Task } from '..';

interface Props {
    list: any,
    color: string,
    deleteTaskFromList: void;
    reloadTasksList: void;
}

const TaskList: React.FC<Props> = ({ list, color, deleteTaskFromList, reloadTasksList }) => {
    return (
        <View style={{backgroundColor: color, justifyContent: 'space-around', alignItems: 'center'}}>
            {list.map(
                ({title, resume, id}) => <Task key={id} reloadTasksList={reloadTasksList} deleteTask= {deleteTaskFromList} id={id} title={title} resume={resume}/>
            )}
        </View>
    );
}


export default TaskList;