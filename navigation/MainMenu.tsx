import React from 'react';
import { NavigationContainer } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';

import { TaskManager } from '../views';

const Stack = createStackNavigator();

const MainMenu = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="TaskManager" component={TaskManager} options={{title: 'Task Manager'}}/>
        </Stack.Navigator>
    </NavigationContainer>
);

export default MainMenu;