import React from 'react';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';

const VerifyPhoneNumber = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Xác thực Email</Text>
                <TextInput style={styles.txtInput} placeholder="Phone" />
            </View>
            <View>
                <TouchableOpacity style={styles.btnsignup}>
                    <Text style={styles.txtbtnSignup}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.elevation}>
                <TouchableOpacity style={styles.btnreturn}>
                    <Text style={styles.txtbtnReturn}>Trở về đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontFamily: fontstyle.fontfamily_1,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        marginLeft: 20,
        marginTop: 270,
        marginBottom: 30,
    },
    image: {
        marginTop: 66,
        width: 369,
        height: 217,
    },
    txtInput: {
        width: 350,
        height: 46,
        borderRadius: 10,
        marginHorizontal: 19,
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: color.bodercolor1,
    },

    btnsignup: {
        backgroundColor: color.btn_color1,
        width: 346,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 30,
    },
    btnreturn: {
        backgroundColor: color.btn_color3,
        width: 350,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 30,
        elevation: 5,
    },
    txtbtnSignup: {
        fontSize: 18,
        fontWeight: 300,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    txtbtnReturn: {
        fontSize: 18,
        fontWeight: 300,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_color2,
    },
});

export default VerifyPhoneNumber;
