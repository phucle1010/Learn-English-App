import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert

} from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import color from '../contains/color';
import db, { auth, doc, getDoc, getDocs, collection } from '../firebase';
import fontstyle from '../contains/fontStyle';
import { useDispatch, useSelector } from 'react-redux';
import { addUserIntoApp } from '../reducers/userSlice';


const Login = ({ navigation }) => {
    const user = useSelector(state => state.user)
    const userRef = collection(db, 'USER');
    const users = [];
    const dispatch = useDispatch();
    const initUser = {
        email: '',
        fullName: '',
        dateOfBirth: '',
        level_id: '',
        password: '',
    };

    const [userInfo, setUserInfo] = useState(initUser);
    const [successfulSignIn, setSuccessfulSignIn] = useState(false);

    // useEffect(() => {
    //     if (successfulSignIn) {

    //     }
    // }, [successfulSignIn]);


    const getUserData = async (uid) => {
        try {
            const querySnapshot = await getDocs(userRef);
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            users.forEach((element) => {
                if (element.id === uid) {
                    userInfo.dateOfBirth = element.dateOfBirth;
                    userInfo.fullName = element.fullName;
                    userInfo.level_id = element.level_id;
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserData(user.uid);
                dispatch(addUserIntoApp(userInfo));
            }
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            navigation.navigate('Home');
        }
    }, [user]);

    const handleSignIn = () => {
        if (userInfo.email === '' || userInfo.password === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin đăng ký');
        } else {
            signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid;

                    Alert.alert('Alert Title', 'Đăng nhập thành công', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: () => {
                                getUserData(uid);
                                dispatch(addUserIntoApp(userInfo));
                            },

                        },
                    ]);


                })
                .catch((error) => {
                    Alert.alert('Alert Title', 'Đăng nhập thất bại', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                });
        }
    };

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.headerBackground}>
                <Text style={styles.appName}>EFU</Text>
                <Text style={styles.appType}>Ứng dụng học Tiếng Anh</Text>
            </View>
            <View style={styles.container}>
                <View>
                    <TextInput style={styles.email} placeholder="Email" onChangeText={(email) =>
                        setUserInfo((prevUser) => {
                            return {
                                ...prevUser,
                                email,
                            };
                        })} />
                </View>
                <View style={styles.passcontainer}>
                    <TextInput style={styles.password} placeholder="Mật khẩu" secureTextEntry={true}
                        onChangeText={(password) =>
                            setUserInfo((prevUser) => {
                                return {
                                    ...prevUser,
                                    password,
                                };
                            })} />
                    <Image style={styles.icon} source={require('../sources/icons/eye.png')} />
                </View>
                <View>
                    <TouchableOpacity style={styles.btnlogin} onPress={handleSignIn}>
                        <Text style={styles.txtbtn}>Đăng nhập</Text>
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
                <TouchableOpacity style={styles.resetPassContainer} onPress={() => navigation.navigate('VerifyEmail')}>
                    <Text style={styles.txtResetPass}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <View style={styles.signUpContainer}>
                    <Text style={styles.txt2}>Chưa có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.txt1}> Đăng ký tại đây</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        alignItems: 'center',
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
        backgroundColor: '#FF77A0',
        paddingTop: 40,
        paddingHorizontal: 50,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
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
    appType: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 2,
        fontWeight: 400,
    },
    container: {
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
    email: {
        width: 310,
        height: 46,
        marginHorizontal: 19,
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
        marginBottom: 10,
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
    btnlogin: {
        backgroundColor: color.btn_color1,
        width: 310,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
    },
    btnloginGg: {
        backgroundColor: color.btn_color2,
        width: 310,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
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
    resetPassContainer: {
        marginVertical: 10,
        marginTop: 30,
    },
    txtResetPass: {
        fontFamily: color.txt2,
        fontSize: 16,
        color: color.txt3,
        fontWeight: 700,
    },
    txt1: {
        fontFamily: color.txt2,
        fontSize: 16,
        color: color.txt3,
        fontWeight: 700,
    },
    txt2: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 16,
        color: color.txt4,
    },
    signUpContainer: {
        flexDirection: 'row',
    },
    txtline: {
        marginVertical: 15,
        color: color.txtExtra,
    },
});

export default Login;