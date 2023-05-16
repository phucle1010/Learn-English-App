import React from 'react';
import { Text, StyleSheet, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';

const Signup = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={require('../sources/images/sign-language-conversation.png')} />
            </View>
            <Text style={styles.text}>Đăng ký</Text>
            <View>
                <TextInput style={styles.txtInput} placeholder="Email" />
                <TextInput style={styles.txtInput} placeholder="Họ và tên" />
            </View>
            <View style={styles.passcontainer}>
                <TextInput style={styles.password} placeholder="Mật khẩu" />
                <Image style={styles.icon} source={require('../sources/icons/eye.png')} />
            </View>
            <View style={styles.passcontainer}>
                <TextInput style={styles.password} placeholder="Xác nhận mật khẩu" />
                <Image style={styles.icon} source={require('../sources/icons/eye.png')} />
            </View>
            <View>
                <TouchableOpacity style={styles.btnsignup}>
                    <Text style={styles.txtbtnSignup}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.elevation}>
                <TouchableOpacity style={styles.btnreturn} onPress={() => navigation.navigate('Login')}>
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
        backgroundColor: '#ffff',
    },
    text: {
        fontFamily: fontstyle.fontfamily_1,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 30,
    },
    image: {
        marginTop: 30,
        width: 289,
        height: 170,
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
    passcontainer: {
        flexDirection: 'row',
        width: 350,
        height: 46,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: color.bodercolor1,
        alignItems: 'center',
    },
    password: {
        flex: 1,
        paddingHorizontal: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 10,
    },
    btnsignup: {
        backgroundColor: color.btn_color1,
        width: 346,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    btnreturn: {
        backgroundColor: color.btn_color3,
        width: 350,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
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

export default Signup;
