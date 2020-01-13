import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity , Image, ScrollView}  from 'react-native';

const NewsCard = ({id, category, type, title, resume, imageUrl, navigation, details}) => {
    const newsDetailsProps = { id, type, title, resume, details, imageUrl, navigation, category };
    return (
        <TouchableOpacity onPress={() => navigation.navigate('NewsDetails', newsDetailsProps)} style={styles.newsCardWrapper}>
            <View style={styles.newsCardImageWrapper}>
                <Image style={styles.newsCardImage} source={{uri: imageUrl}} />
            </View>
            <View style={styles.newsCardTextWrapper}>
                <Text style={styles.newsCardTitle}>{title}</Text>
                <Text style={styles.newsCardResume}>{resume}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    newsCardWrapper: { alignSelf: 'center', marginTop: 15, width: '80%', padding: 10, backgroundColor: '#ddd', borderRadius: 10, height: 350},
    newsCardImageWrapper: { alignSelf: 'center', backgroundColor: '#fff', width: '100%', height: '50%', borderRadius: 5 },
    newsCardTextWrapper: { height: '50%'},
    newsCardTitle: {fontWeight: 'bold', backgroundColor: '#fff', borderRadius: 5, padding: 5, textAlign:'center', marginTop: 15},
    newsCardResume: {marginTop: 10, backgroundColor: '#fff', borderRadius: 5, padding: 10, height: 110 },
    newsCardImage: { resizeMode: 'cover', width: '100%', height: '100%'},
});

export default NewsCard;