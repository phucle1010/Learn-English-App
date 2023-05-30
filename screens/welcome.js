import React from 'react';
import { Text, StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';

const Welcome = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={require('../sources/images/background.png')} />
                <Text style={styles.text}>Chào mừng bạn đến với Ứng dụng học tiếng anh EFU</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.txtbtn}>Khám phá</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontFamily: fontstyle.fontfamily_1,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#7B78FF',
        textAlign: 'center',
        marginHorizontal: 30,
        marginTop: 30,
    },
    image: {
        marginTop: 180,
        width: 390,
        height: 273,
    },
    btn: {
        backgroundColor: color.btn_color1,
        width: 350,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        borderRadius: 30,
    },
    txtbtn: {
        fontSize: 20,
        fontWeight: 300,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txtbtn_color1,
    },
});

export default Welcome;
