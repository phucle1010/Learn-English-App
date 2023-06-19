import React, { useState } from 'react';
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
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { signOut } from 'firebase/auth';
import color from '../contains/color';
import fontStyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { useSelector } from 'react-redux';

const Account = () => {
    const user = useSelector(state => state.user)
    const [clickedOption, setClickedOption] = useState(false);


    const handleSignOut = async () => {
        await signOut()
            .then(() => Alert.alert('Thông báo', 'Đăng xuất thành công'))
            .catch((err) => Alert.alert('Lỗi', err));
    };

    return (
        <SafeAreaView style={styles.main}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#ff357a', '#5235ff']}
                style={{
                    position: 'absolute',
                    top: -150,
                    left: -20,
                    width: 350,
                    height: 350,
                    borderRadius: 350,
                    backgroundColor: '#4d53e3'
                }} />
            <Text style={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: [{ translateX: - Dimensions.get('window').width * 0.12 }],
                fontSize: 22,
                color: '#ffffff',
                letterSpacing: 1,
            }}>Account</Text>
            <View style={{
                position: 'absolute',
                top: 20,
                right: 15,
                zIndex: 100
            }}>
                <TouchableOpacity
                    style={{
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => setClickedOption(prev => !prev)}
                >
                    <Icon name='options-vertical' style={{
                        fontSize: 20,
                    }} />
                </TouchableOpacity>
                {
                    clickedOption && (
                        <TouchableOpacity style={{
                            position: 'absolute',
                            top: '120%',
                            right: 10,
                            width: 160,
                            paddingVertical: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#ffffff',
                            borderRadius: 10,
                            elevation: 4,
                        }}>
                            <Icon name='logout' style={{
                                fontSize: 16,
                                marginHorizontal: 10,
                                color: '#fecb4b',
                                fontWeight: 'bold'
                            }} />
                            <Text style={{
                                fontSize: 16,
                                color: '#fecb4b',
                                fontWeight: 'bold',
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
                    marginTop: 140,
                }}>
                    <View style={{
                        width: '60%',
                        flexDirection: 'row',
                        justifyContent: 'center',
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
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.detailAccount}>
                    <View style={{
                        width: '60%',
                    }}>
                        <Text style={styles.txtAccount}>Lê Thế Phúc</Text>
                        <Text style={styles.txtEmail}>lethephuc2002@gmail.com</Text>
                    </View>
                    <TouchableOpacity style={{
                        flex: 1,
                        marginVertical: 4,
                        marginRight: 20,
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fecb4b',
                    }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollContainer}>
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
                    <TouchableOpacity style={styles.wrapbtn1}>
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

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffffff',
        height: '100%',
        paddingBottom: 80,
    },
    scrollContainer: {
        borderTopWidth: 2,
        borderTopColor: '#efefef',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        elevation: 4,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        fontFamily: fontStyle.fontfamily_2,
        fontSize: 20,
        marginLeft: 80,
        color: color.txt5,
    },
    InfoContainer: {
        marginBottom: 10,
        paddingBottom: 20,
    },
    txtContent: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 'bold',
        color: color.txt1,
        marginTop: 10,
    },
    wrapAccount: {
        width: 314,
        height: 72,
        flexDirection: 'row',
        backgroundColor: color.btn_color7,
        borderRadius: 15,
        elevation: 4,
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 5,
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
        width: '94%',
        height: '94%',
        borderRadius: 50,
        borderColor: '#4d53e3',
        borderWidth: 2,
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
        flexDirection: 'row',
    },
    txtAccount: {
        fontSize: 18,
        fontWeight: 500,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
        textAlign: 'center'
    },
    txtEmail: {
        fontSize: 16,
        fontWeight: 300,
        fontFamily: fontStyle.fontfamily_2,
        fontStyle: 'italic',
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
        // width: 114,
        // height: 31,
        alignSelf: 'flex-start',
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: color.btn_color1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        // marginLeft: 15,
    },
    txtbtn1: {
        fontSize: 15,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
});

export default Account;
