import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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
        marginBottom: 80,
        backgroundColor: '#fafafa'
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