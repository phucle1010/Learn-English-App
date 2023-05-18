import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import {
    Text,
    StyleSheet,
    ImageBackground,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
} from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import db, { auth } from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <SafeAreaView style={styles.main}>
            <ImageBackground
                style={styles.headerBackground}
                source={require('../sources/images/signup-background.png')}
            >
                <Text style={styles.appName}>EFU</Text>
            </ImageBackground>
            <View style={styles.container}>
                <Text style={styles.headingSignup}>TẠO TÀI KHOẢN MỚI</Text>
                <Text style={styles.subHeading}>Đăng ký để tiếp tục</Text>
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
                <View>
                    <TouchableOpacity style={styles.btnsignup} onPress={handleSignUp}>
                        <Text style={styles.txtbtnSignup}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.returnSigninContainer} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.txtReturnSignin}>Quay về đăng nhập tại đây</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: '#fff',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 100,
    },
    appName: {
        fontFamily: fontstyle.fontfamily_1,
        fontWeight: 600,
        fontSize: 40,
        color: color.txtbtn_color1,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 10,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingBottom: 58,
        paddingTop: 110,
        paddingHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    headingSignup: {
        position: 'absolute',
        top: 25,
        left: 40,
        fontFamily: fontstyle.fontfamily_1,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#5c5c5c',
    },
    subHeading: {
        position: 'absolute',
        top: 65,
        left: 40,
        fontFamily: fontstyle.fontfamily_1,
        fontWeight: 400,
        fontStyle: 'italic',
        color: '#797979',
    },
    txtInput: {
        width: 310,
        height: 46,
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 6,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: color.bodercolor3,
    },
    passcontainer: {
        flexDirection: 'row',
        width: 310,
        height: 46,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: color.bodercolor3,
        alignItems: 'center',
    },
    password: {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 50,
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 10,
    },
    btnsignup: {
        backgroundColor: color.btn_color1,
        width: 310,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
    },
    txtbtnSignup: {
        fontSize: 18,
        fontWeight: 300,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txtbtn_color1,
    },
    returnSigninContainer: {
        marginTop: 20,
    },
    txtReturnSignin: {
        fontFamily: color.txt2,
        fontSize: 16,
        color: color.txt3,
        fontWeight: 700,
    },
});

export default Signup;
