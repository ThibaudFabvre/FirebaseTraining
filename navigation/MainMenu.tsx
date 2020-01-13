import React from 'react';
import { NavigationContainer } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskManager, News, AddNewsForm, NewsDetails, EditNewsForm } from '../views';

const Stack = createStackNavigator();

const MainMenu = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="News">
            <Stack.Screen name="TaskManager" component={TaskManager} options={{title: 'Task Manager'}}/>
            <Stack.Screen name="News" component={News} options={{title: 'Daily News'}}/>
            <Stack.Screen name="AddNewsForm" component={AddNewsForm} options={{title: 'Add News'}} />
            <Stack.Screen name="EditNewsForm" component={EditNewsForm} options={{title: 'Edit News'}} />
            <Stack.Screen name="NewsDetails" component={NewsDetails} options={{title: 'News Details'}} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default MainMenu;