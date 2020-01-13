import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity , Image, ScrollView}  from 'react-native';

const NewsCard = ({id, category, type, title, resume, imageUrl, navigation, details}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('NewsDetails', { id, type, title, resume, details, imageUrl, navigation, category})} style={{ alignSelf: 'center', marginTop: 15, width: '80%', padding: 10, backgroundColor: '#ddd', borderRadius: 10, height: 350}}>
            <View style={{ alignSelf: 'center', backgroundColor: '#fff', width: '100%', height: '50%', borderRadius: 5 }}>
                <Image style={{ resizeMode: 'cover', width: '100%', height: '100%'}} source={{uri: imageUrl}} />
            </View>
            <View style={{ height: '50%'}}>
                <Text style={{fontWeight: 'bold', backgroundColor: '#fff', borderRadius: 5, padding: 5, textAlign:'center', marginTop: 15}}>{title}</Text>
                <Text style={{marginTop: 10, backgroundColor: '#fff', borderRadius: 5, padding: 10, height: 110 }}>{resume}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default NewsCard;