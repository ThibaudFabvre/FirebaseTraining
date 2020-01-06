import React from 'react';
import { NavigationContainer } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';

import { TaskManager } from '../views';

const Stack = createStackNavigator();

const MainMenu = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Task Manager" component={TaskManager}/>
        </Stack.Navigator>
    </NavigationContainer>
);

export default MainMenu;