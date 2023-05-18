import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { Text, StyleSheet, View, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import db, { auth } from '../firebase';

const Signup = ({ navigation }) => {
    const initUser = {
        email: '',
        full_name: '',
        password: '',
    };
    const [userInfo, setUserInfo] = useState(initUser);
    const [successfulCreate, setSuccessfulCreate] = useState(false);

    useEffect(() => {
        if (successfulCreate) {
            navigation.navigate('Login');
        }
    }, [successfulCreate]);

    const addUserCollection = (userData) => {
        addDoc(collection(db, 'USER'), userData)
            .then(() => {
                Alert.alert('Đăng ký thành công');
                setUserInfo(initUser);
                setSuccessfulCreate(true);
            })
            .catch((err) => Alert.alert('Lỗi', err));
    };

    const handleSignUp = async () => {
        const existedEmptyValue = Object.keys(userInfo).some((field) => userInfo[field] === '');
        if (existedEmptyValue) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin đăng ký');
        } else {
            try {
                await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password).then((res) => {
                    const user = res.user;
                    const userData = {
                        dateOfBirth: '',
                        email: userInfo.email,
                        field: '',
                        fullName: userInfo.full_name,
                        id: user.uid,
                        level_id: '',
                        password: '',
                        username: '',
                    };
                    addUserCollection(userData);
                });
            } catch (err) {
                Alert.alert('Lỗi', err);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={require('../sources/images/sign-language-conversation.png')} />
            </View>
            <Text style={styles.text}>Đăng ký</Text>
            <View>
                <TextInput
                    style={styles.txtInput}
                    defaultValue={userInfo.email}
                    placeholder="Email"
                    onChangeText={(email) =>
                        setUserInfo((prevUser) => {
                            return {
                                ...prevUser,
                                email,
                            };
                        })
                    }
                />
                <TextInput
                    style={styles.txtInput}
                    defaultValue={userInfo.full_name}
                    placeholder="Họ và tên"
                    spellCheck={false}
                    onChangeText={(full_name) =>
                        setUserInfo((prevUser) => {
                            return {
                                ...prevUser,
                                full_name,
                            };
                        })
                    }
                />
            </View>
            <View style={styles.passcontainer}>
                <TextInput
                    style={styles.password}
                    defaultValue={userInfo.password}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    onChangeText={(password) =>
                        setUserInfo((prevUser) => {
                            return {
                                ...prevUser,
                                password,
                            };
                        })
                    }
                />
                <Image style={styles.icon} source={require('../sources/icons/eye.png')} />
            </View>
            {/* <View style={styles.passcontainer}>
                <TextInput style={styles.password} placeholder="Xác nhận mật khẩu" />
                <Image style={styles.icon} source={require('../sources/icons/eye.png')} />
            </View> */}
            <View>
                <TouchableOpacity style={styles.btnsignup} onPress={handleSignUp}>
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
        marginTop: 24,
        borderRadius: 10,
        elevation: 4,
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
