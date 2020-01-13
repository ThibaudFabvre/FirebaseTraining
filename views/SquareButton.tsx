import React from 'react';
import { Text, StyleSheet, TouchableHighlight }  from 'react-native';


const SquareButton = ({text, action}) => (
    <TouchableHighlight style={styles.SquareButton} onPress={action}>
        <Text style={styles.SquareButtonText}>{text}</Text>
    </TouchableHighlight>
)


const styles = StyleSheet.create({
    SquareButton: { backgroundColor: '#000', width: '80%', alignSelf: 'center', borderRadius: 10, borderWidth: 3, marginBottom: 5 },
    SquareButtonText: { textAlign: 'center', padding: 10, color: '#fff', fontWeight: 'bold' }
});

export default SquareButton