import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import StyledText from 'react-native-styled-text';
const GrammarTheory = (props) => {
    const { content } = props
    return (
        <ScrollView style={styles.container}>
            <StyledText textStyles={textStyles} style={styles.content}>{content}</StyledText>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        marginBottom: 80
    },
    content: {
        color: '#333'
    }
});
const textStyles = StyleSheet.create({
    h1: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'normal'
    },
});
export default GrammarTheory;
