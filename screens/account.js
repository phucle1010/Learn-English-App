import React, { useState, useMemo, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    SafeAreaView,
    Alert,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { signOut } from 'firebase/auth';
import color from '../contains/color';
import fontStyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { addUserIntoApp } from '../reducers/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AweIcon from 'react-native-vector-icons/FontAwesome5';
import { auth, EmailAuthProvider, updatePassword, reauthenticateWithCredential } from '../firebase';
import { useIsFocused } from '@react-navigation/native';


const Account = ({ navigation }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const isFocusedScreen = useIsFocused();
    const [clickedOption, setClickedOption] = useState(false);

    const [modalVisible, setModalVisible] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');

    const snapPoints = useMemo(() => ['60%'], []);

    useEffect(() => {
        if (!isFocusedScreen) {
            setClickedOption(false)
        }
    }, [isFocusedScreen])

    const handleSignOut = async () => {
        await signOut(auth)
            .then(() => {
                dispatch(addUserIntoApp({}))
                AsyncStorage.setItem('user', JSON.stringify({}))
                AsyncStorage.setItem('device_id', JSON.stringify(''))
                Alert.alert('Thông báo', 'Đăng xuất thành công')
                setTimeout(() => { navigation.navigate("Login") }, 1000);
            })
            .catch((err) => console.log('Lỗi: ', err));
    };

    const handleShowNewPassword = (type) => {
        switch (type) {
            case 1:
                setShowPassword(!showPassword);
                break;
            case 2:
                setShowNewPassword(!showNewPassword);
                break;
            case 3:
                setShowRePassword(!showRePassword);
                break;
            default:
                break;
        }
    };
    const handleSubmit = async () => {
        if (newPassword === reNewPassword) {
            const credential = EmailAuthProvider.credential(
                user.email,
                password
            );
            try {
                await reauthenticateWithCredential(
                    auth.currentUser,
                    credential
                );
                await updatePassword(
                    auth.currentUser,
                    newPassword
                );
                setPassword('')
                setNewPassword('')
                setReNewPassword('')
                Alert.alert("Thông báo", 'Mật khẩu cập nhật thành công, xin vui lòng đăng nhập lại!!', [
                    {
                        text: 'OK',
                        onPress: handleSignOut,
                        style: 'OK',
                    },
                ],)
            } catch (error) {
                Alert.alert("Thông báo", error.code)
            }
        }
        else {
            Alert.alert("Thông báo", 'Mật khẩu mới không tương thích, vui lòng kiểm tra lại!!')
        }
    }

    return (
        <GestureHandlerRootView style={styles.main}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#ff357a', '#5235ff']}
                style={styles.linearContainer} />
            <Text style={styles.headcontainer}>Account</Text>
            <View style={{
                position: 'absolute',
                top: 20,
                right: 15,
                zIndex: 100
            }}>
                <TouchableOpacity
                    style={styles.btnOption}
                    onPress={() => setClickedOption(prev => !prev)}
                >
                    <Icon name='options-vertical' style={{
                        fontSize: 20,
                        color: '#ffffff'
                    }} />
                </TouchableOpacity>
                {
                    clickedOption && (
                        <TouchableOpacity
                            style={styles.btnLogout}
                            onPress={handleSignOut}
                        >
                            <Icon name='logout' style={{
                                ...styles.txtLogout,
                                marginHorizontal: 10,
                            }} />
                            <Text style={{
                                ...styles.txtLogout,
                                letterSpacing: 0.5
                            }}>Đăng xuất</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            <View style={{
                ...styles.InfoContainer,
            }}>
                <View style={{
                    marginTop: 80,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View style={styles.imgContainer}>
                        <Image
                            style={styles.imgItem}
                            source={{
                                uri: 'https://static8.depositphotos.com/1000792/1065/v/600/depositphotos_10659058-stock-illustration-cute-dog.jpg',
                            }}
                        />
                    </View>
                </View>
                <View style={styles.detailAccount}>
                    <Text style={styles.txtAccount}>{user.fullName}</Text>
                    <Text style={styles.txtEmail}>{user.email}</Text>
                    <View style={{ marginVertical: 10, width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{
                            width: '30%'
                        }} />
                        <TouchableOpacity style={styles.btnEdit}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                        <View style={{
                            width: '30%'
                        }} />
                    </View>
                </View>
            </View>

            <BottomSheet
                style={styles.scrollContainer}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
            >
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.levelNowContainer}>
                        <Text style={styles.txtContent}>Trình độ hiện tại</Text>
                        <View style={styles.wraplevel}>
                            <Text style={styles.txtlevel}>Trình độ</Text>
                            <TouchableOpacity style={styles.wrapAdd}>
                                <Text style={styles.txtAdd}> Thêm </Text>
                                <Image style={styles.arrowRight} source={require('../sources/icons/arrowright.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.wrapResetpass}>
                        <Text style={styles.txtContent}>Mật khẩu</Text>
                        <TouchableOpacity style={styles.wrapbtn1} onPress={() => setModalVisible(true)}>
                            <Text style={styles.txtbtn1}>Đặt lại</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.wrapItem}>
                        <Text style={styles.txtContent}>Liên hệ</Text>
                        {/* <Text style={styles.txtContact}>Fanpage: Link mạng xã hội fanpage của ứng dụng</Text> */}
                    </View>

                    <View style={styles.wrapItem}>
                        <Text style={styles.txtContent}>Hướng dẫn sử dụng</Text>
                    </View>

                    <View style={styles.wrapItem}>
                        <Text style={styles.txtContent}>Điều khoản sử dụng</Text>
                    </View>

                    <View style={styles.wrapItem}>
                        <Text style={styles.txtContent}>Phản hồi góp ý</Text>
                        <TextInput style={styles.wrapDetailFeedback} placeholder="Bạn hãy điền nội dung góp ý ở đây" />
                        <Text style={styles.txtFeedback}>
                            Đóng góp của bạn sẽ giúp ứng dụng trở nên hoàn thiện hơn với trải nghiệm từ chính bạn{' '}
                        </Text>
                        <TouchableOpacity style={styles.wrapbtn1}>
                            <Text style={styles.txtbtn1}>Gửi góp ý</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        ...styles.wrapItem,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                    }}>
                        <Text style={styles.txtContent}>Chia sẻ ứng dụng</Text>
                        <TouchableOpacity style={styles.wrapbtn1}>
                            <Text style={styles.txtbtn1}>Chia sẻ</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: '100%',
                        height: 80
                    }} />
                </BottomSheetScrollView>
            </BottomSheet>
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: '#333', fontSize: 20, marginBottom: 10 }}>Đặt lại mật khẩu</Text>
                        <View style={{ marginBottom: 15 }}>
                            <TextInput
                                style={styles.modalInput}
                                secureTextEntry={!showPassword}
                                placeholder="Nhập mật khẩu cũ"
                                placeholderTextColor={'#BEBEBE'}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity style={styles.iconButton} onPress={() => handleShowNewPassword(1)}>
                                {showPassword ? (
                                    <AweIcon style={styles.iconEye} name="eye" />
                                ) : (
                                    <AweIcon style={styles.iconEye} name="eye-slash" />
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <TextInput
                                style={styles.modalInput}
                                secureTextEntry={!showNewPassword}
                                placeholder="Nhập mật khẩu mới"
                                placeholderTextColor={'#BEBEBE'}
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TouchableOpacity style={styles.iconButton} onPress={() => handleShowNewPassword(2)}>
                                {showNewPassword ? (
                                    <AweIcon style={styles.iconEye} name="eye" />
                                ) : (
                                    <AweIcon style={styles.iconEye} name="eye-slash" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <TextInput
                                style={styles.modalInput}
                                secureTextEntry={!showRePassword}
                                placeholder="Xác nhận mật khẩu mới"
                                placeholderTextColor={'#BEBEBE'}
                                value={reNewPassword}
                                onChangeText={setReNewPassword}
                            />
                            <TouchableOpacity style={styles.iconButton} onPress={() => handleShowNewPassword(3)}>
                                {showRePassword ? (
                                    <AweIcon style={styles.iconEye} name="eye" />
                                ) : (
                                    <AweIcon style={styles.iconEye} name="eye-slash" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: color.btn_color4 }]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.modalText}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                setPassword('')
                                setNewPassword('');
                                setReNewPassword('');
                            }}
                        >
                            <Text style={styles.modalText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </GestureHandlerRootView>

    );
};

const styles = StyleSheet.create({
    main: {
        height: '100%',
    },
    scrollContainer: {

    },
    linearContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#4d53e3'
    },
    headcontainer: {
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: [{ translateX: - Dimensions.get('window').width * 0.12 }],
        fontSize: 22,
        color: '#ffffff',
        letterSpacing: 1,
    },
    btnOption: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    InfoContainer: {
        marginBottom: 10,
        paddingBottom: 20,
    },
    btnLogout: {
        position: 'absolute',
        top: '120%',
        right: 10,
        width: 160,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 10,
    },
    txtLogout: {
        fontSize: 16,
        color: '#fecb4b',
        fontWeight: 'bold'
    },
    btnEdit: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fecb4b',
    },
    txtContent: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 'bold',
        color: color.txt1,
        marginTop: 10,
    },
    wrapbtn: {
        width: 114,
        height: 31,
        borderRadius: 20,
        backgroundColor: color.btn_color4,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 216,
        marginTop: 15,
    },
    txtbtn: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    imgContainer: {
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    imgItem: {
        width: '95%',
        height: '95%',
        borderRadius: 50,
    },
    linearGradient: {
        width: 100,
        height: 100,
        borderRadius: 50,
        flex: 1,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    detailAccount: {
        paddingTop: 10,
        // flexDirection: 'row',
        justifyContent: 'center'
    },
    txtAccount: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: fontStyle.fontfamily_2,
        color: '#ffffff',
        textAlign: 'center'
    },
    txtEmail: {
        fontSize: 16,
        fontWeight: 300,
        fontFamily: fontStyle.fontfamily_2,
        fontStyle: 'italic',
        color: '#ffffff',
        textAlign: 'center'
    },
    iconEdit: {
        marginTop: 10,
        width: 16,
        height: 16,
        marginLeft: 40,
    },
    levelNowContainer: {
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    wraplevel: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fefefe',
        borderRadius: 15,
        elevation: 4,
        marginTop: 20,
        marginBottom: 5,
    },
    txtlevel: {
        fontSize: 12,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        color: color.txt7,
        marginLeft: 10,
    },
    wrapResetpass: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    wrapAdd: {
        marginLeft: 'auto',
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtAdd: {
        fontSize: 12,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 500,
        color: color.txt8,
    },
    arrowRight: {
        height: 12,
        width: 12,
    },
    wrapItem: {
        marginTop: 20,
        paddingHorizontal: 15
    },
    txtContact: {
        fontSize: 16,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        fontStyle: 'italic',
        color: color.txt7,
        paddingHorizontal: 10,
    },
    wrapDetailFeedback: {
        height: 86,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
        marginBottom: 5,
        elevation: 4,
        marginHorizontal: 5,
        marginTop: 15,
    },
    txtFeedback: {
        fontSize: 12,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        fontStyle: 'italic',
        color: color.txt7,
        marginHorizontal: 5,
    },
    txtnote: {
        fontSize: 12,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        fontStyle: 'normal',
        color: color.txt7,
    },
    wrapbtn1: {
        alignSelf: 'flex-start',
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: color.btn_color1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    txtbtn1: {
        fontSize: 15,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '90%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    textModal: {
        fontSize: 16,
        color: '#333'
    },
    modalInput: {
        color: '#333',
        borderBottomWidth: 0.5,
        paddingLeft: 10,
    },
    modalButton: {
        backgroundColor: color.btn_color1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 20
    },
    modalText: {
        color: '#fff',
        fontSize: 17,
    },
    iconButton: {
        zIndex: 10,
        position: 'absolute',
        right: 10,
        top: 8,
        padding: 5
    },
    iconEye: {
        fontSize: 22,
        color: '#797979',
    },
});

export default Account;
