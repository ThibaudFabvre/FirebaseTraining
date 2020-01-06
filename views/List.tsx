import React from 'react';
import { View} from 'react-native';
import { Task } from '.';

interface Props {
    list: any,
    color: string,
    deleteTaskFromList: void;
}

const List: React.FC<Props> = ({ list, color, deleteTaskFromList }) => {
    return (
        <View style={{backgroundColor: color, justifyContent: 'space-around', alignItems: 'center'}}>
            {list.map(
                ({title, resume, id, status}) => <Task deleteTask= {deleteTaskFromList} id={id} status={status} title={title} resume={resume}/>
            )}
        </View>
    );
}


export default List;