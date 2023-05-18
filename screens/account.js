import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Alert,
} from 'react-native';
import { signOut } from 'firebase/auth';
import color from '../contains/color';
import fontStyle from '../contains/fontStyle';

import Header from '../components/Header';

const Account = () => {
    const handleSignOut = async () => {
        await signOut()
            .then(() => Alert.alert('Thông báo', 'Đăng xuất thành công'))
            .catch((err) => Alert.alert('Lỗi', err));
    };

    return (
        <SafeAreaView style={styles.main}>
            <Header />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.InfoContainer}>
                        <Text style={styles.txtContent}>Thông tin tài khoản</Text>
                        <View style={styles.wrapAccount}>
                            <Image
                                style={styles.imgAccount}
                                source={{
                                    uri: 'https://static8.depositphotos.com/1000792/1065/v/600/depositphotos_10659058-stock-illustration-cute-dog.jpg',
                                }}
                            />
                            <View style={styles.detailAccount}>
                                <Text style={styles.txtAccount}> Nguyễn Văn A</Text>
                                <Text style={styles.txtEmail}>nvana@gmail.com</Text>
                            </View>
                            <TouchableOpacity>
                                <Image style={styles.iconEdit} source={require('../sources/icons/edit.png')} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.wrapbtn} onPress={handleSignOut}>
                            <Text style={styles.txtbtn}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.levelNowContainer}>
                        <Text style={styles.txtContent}>Trình độ hiện tại</Text>
                        <View style={styles.wraplevel}>
                            <Text style={styles.txtlevel}>Trình độ</Text>
                            <View style={styles.wrapAdd}>
                                <Text style={styles.txtAdd}> Thêm </Text>
                                <Image style={styles.arrowRight} source={require('../sources/icons/arrowright.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.wrapResetpass}>
                        <Text style={styles.txtContent}>Cài đặt mật khẩu</Text>
                        <TouchableOpacity style={styles.wrapbtn1}>
                            <Text style={styles.txtbtn1}>Đặt lại</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapContact}>
                        <Text style={styles.txtContent}>Liên hệ</Text>
                        <Text style={styles.txtContact}>Fanpage: Link mạng xã hội fanpage của ứng dụng</Text>
                    </View>
                    <View style={styles.wrapUserManual}>
                        <Text style={styles.txtContent}>Hướng dẫn sử dụng</Text>
                    </View>
                    <View style={styles.wrapUserManual}>
                        <Text style={styles.txtContent}>Điều khoản sử dụng</Text>
                    </View>
                    <View style={styles.wrapFeedback}>
                        <Text style={styles.txtContent}>Phản hồi góp ý</Text>
                        <TextInput style={styles.wrapDetailFeedback} placeholder="Bạn hãy điền nội dung góp ý ở đây" />
                        <Text style={styles.txtFeedback}>
                            Đóng góp của bạn sẽ giúp ứng dụng trở nên hoàn thiện hơn với trải nghiệm từ chính bạn{' '}
                        </Text>
                        <TouchableOpacity style={styles.wrapbtn1}>
                            <Text style={styles.txtbtn1}>Gửi góp ý</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapShare}>
                        <Text style={styles.txtContent}>Chia sẻ ứng dụng</Text>
                        <TouchableOpacity style={styles.wrapbtn1}>
                            <Text style={styles.txtbtn1}>Chia sẻ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#f6f6f6',
        height: '100%',
        paddingBottom: 80,
    },
    scrollContainer: {
        marginTop: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
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
        marginTop: 30,
        width: 346,
        height: 204,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
        //elevation:5
    },
    txtContent: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 'bold',
        color: color.txt1,
        marginTop: 10,
        marginLeft: 10,
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
    imgAccount: {
        width: 53,
        height: 53,
        marginTop: 10,
        marginLeft: 10,
    },
    detailAccount: {
        paddingTop: 10,
        paddingLeft: 20,
    },
    txtAccount: {
        fontSize: 18,
        fontWeight: 500,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
    },
    txtEmail: {
        fontSize: 18,
        fontWeight: 300,
        fontFamily: fontStyle.fontfamily_2,
        fontStyle: 'italic',
        color: color.txt1,
    },
    iconEdit: {
        marginTop: 10,
        width: 16,
        height: 16,
        marginLeft: 40,
    },
    levelNowContainer: {
        marginTop: 30,
        width: 346,
        height: 130,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
    },
    wraplevel: {
        width: 314,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color7,
        borderRadius: 15,
        elevation: 4,
        marginTop: 20,
        marginHorizontal: 15,
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
        marginTop: 30,
        width: 346,
        height: 117,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
    },
    wrapAdd: {
        marginLeft: 190,
        width: 118,
        height: 17,
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
    wrapContact: {
        marginTop: 30,
        width: 346,
        height: 126,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
    },
    txtContact: {
        fontSize: 16,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        fontStyle: 'italic',
        color: color.txt7,
        paddingHorizontal: 10,
    },
    wrapUserManual: {
        marginTop: 30,
        width: 346,
        height: 126,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
    },
    wrapFeedback: {
        marginTop: 30,
        width: 346,
        height: 263,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
    },
    wrapDetailFeedback: {
        width: 314,
        height: 86,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
        marginBottom: 5,
        elevation: 4,
        marginHorizontal: 15,
        marginTop: 15,
    },
    txtFeedback: {
        fontSize: 12,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        fontStyle: 'italic',
        color: color.txt7,
        marginHorizontal: 15,
    },
    txtnote: {
        fontSize: 12,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        fontStyle: 'normal',
        color: color.txt7,
    },
    wrapbtn1: {
        width: 114,
        height: 31,
        borderRadius: 20,
        backgroundColor: color.btn_color1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginLeft: 15,
    },
    txtbtn1: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    wrapShare: {
        marginTop: 30,
        width: 346,
        height: 117,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
    },
});

export default Account;
