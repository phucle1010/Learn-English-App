import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>EFU</Text>
            <View>
                <Icon name="bell" size={30} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 5,
    },
    appName: {
        fontSize: 26,
        color: '#FF8080',
    },
});

export default Header;
