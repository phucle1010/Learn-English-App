import React from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';

const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerBackground}></View>
            <View style={styles.mainSection}>
                <View>
                    <Text style={styles.txthead}>ỨNG DỤNG HỌC TIẾNG ANH 'X'</Text>
                </View>
                <View>
                    <TextInput style={styles.email} placeholder="Email" />
                </View>
                <View style={styles.passcontainer}>
                    <TextInput style={styles.password} placeholder="Mật khẩu" />
                    <Image style={styles.icon} source={require('../sources/icons/eye.png')} />
                </View>
                <View>
                    <TouchableOpacity style={styles.btnlogin}>
                        <Text style={styles.txtbtn}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.txt1}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpContainer}>
                    <Text style={styles.txt2}>Chưa có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.txt1}> Đăng ký tại đây</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.txtline}> ──────── Hoặc ────────</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.btnloginGg}>
                        <Text style={styles.txtbtngg}>Đăng nhập bằng Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
    },
    mainSection: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_1,
        fontWeight: 600,
        fontSize: 30,
        color: color.txt1,
        textAlign: 'center',
        marginHorizontal: 68,
        // marginTop: 140,
        marginBottom: 50,
    },
    email: {
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
        marginBottom: 10,
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
    btnlogin: {
        backgroundColor: color.btn_color1,
        width: 350,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
    },
    btnloginGg: {
        backgroundColor: color.btn_color2,
        width: 350,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
    },
    txtbtn: {
        fontSize: 18,
        fontWeight: 300,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    txtbtngg: {
        fontSize: 18,
        fontWeight: 300,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_gg,
    },
    txt1: {
        marginTop: 15,
        fontFamily: color.txt2,
        fontSize: 16,
        color: color.txt3,
    },
    txt2: {
        marginTop: 15,
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 16,
        color: color.txt4,
    },
    signUpContainer: {
        flexDirection: 'row',
    },
    txtline: {
        marginTop: 15,
        color: color.bodercolor1,
    },
});

export default Login;
