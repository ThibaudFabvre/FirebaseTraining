import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight , Image, ScrollView}  from 'react-native';

const NewsDetails = ({ route, navigation }) => {
    const { id, title, imageUrl, resume, details, category, type } = route.params;
    return (
        <View style={{flex: 1, padding: 15, justifyContent: 'space-between'}}>
            <View>
                <Image style={{width: '80%' , height: 240, backgroundColor: 'white', alignSelf: 'center'}} source={{uri: imageUrl}} />
                <Text style={{marginTop: 10, textAlign: 'center'}} >{title}</Text>
                <Text style={{marginTop: 20}}>{details}</Text>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Text>{category}</Text>
                    <Text>{type}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                <TouchableHighlight style={{backgroundColor: '#000', borderRadius: 5, padding: 10, width: 140}} onPress={() => navigation.navigate('EditNewsForm', { id, title, resume, details, type, category, imageUrl })}>
                    <Text style={{fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Edit</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default NewsDetails;