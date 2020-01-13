import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight , Image}  from 'react-native';
import { SquareButton } from '.';

const NewsDetails = ({ route, navigation }) => {
    const { id, title, imageUrl, resume, details, category, type } = route.params;
    return (
        <View style={styles.detailsViewWrapper}>
            <View>
                <Image style={styles.fullPageImage} source={{uri: imageUrl}} />
                <Text style={styles.newsTitle} >{title}</Text>
                <Text style={styles.newsDetails}>{details}</Text>
                <View style={styles.newsInfo}>
                    <Text>{category}</Text>
                    <Text>{type}</Text>
                </View>
            </View>
            <View style={styles.bottomSectionWrapper}>
                <SquareButton text='Edit' action={() => navigation.navigate('EditNewsForm', { id, title, resume, details, type, category, imageUrl })} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullPageImage: {width: '80%' , height: 240, backgroundColor: 'white', alignSelf: 'center'},
    newsTitle: { marginTop: 10, textAlign: 'center' },
    newsDetails: {marginTop: 20},
    newsInfo: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-around'},
    bottomSectionWrapper: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'},
    detailsViewWrapper: { flex: 1, padding: 15, justifyContent: 'space-between'}
})

export default NewsDetails;