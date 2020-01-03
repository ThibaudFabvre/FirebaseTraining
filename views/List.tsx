import React from 'react';
import { View} from 'react-native';
import { Task } from '.';

interface Props {
    list: any,
    color: string,
}

const List: React.FC<Props> = ({ list, color }) => {
    return (
        <View style={{backgroundColor: color, justifyContent: 'space-around', alignItems: 'center'}}>
            {list.map(
                ({title, resume, id}) => <Task id={id} title={title} resume={resume}/>
            )}
        </View>
    );
}


export default List;