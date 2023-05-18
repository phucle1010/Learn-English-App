import React from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';

const Login = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBackground}>
                <Text style={styles.txthead}>Be Good At English</Text>
            </View>
            <View style={styles.mainSection}>
                <View>
                    <TextInput style={styles.email} placeholder="Email" />
                </View>
                <View style={styles.passcontainer}>
                    <TextInput style={styles.password} placeholder="Mật khẩu" />
                    <Image style={styles.icon} source={require('../sources/icons/eye.png')} />
                </View>
                <View>
                    <TouchableOpacity style={styles.btnlogin} onPress={() => navigation.navigate('Home')}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 250,
        backgroundColor: '#FF8080',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 50,
        paddingHorizontal: 70,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    mainSection: {
        position: 'absolute',
        top: 160,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        paddingVertical: 58,
        paddingHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 4,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_1,
        fontWeight: 600,
        fontSize: 30,
        color: color.txtbtn_color1,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    email: {
        width: 310,
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
        width: 310,
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
        width: 310,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
    },
    btnloginGg: {
        backgroundColor: color.btn_color2,
        width: 310,
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
