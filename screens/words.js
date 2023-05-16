import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const Words = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.wordcontainer}>
                    <Text style={styles.word}>Open</Text>
                    <TouchableOpacity style={styles.btnsave}>
                        <Text style={styles.txtbtnsave}>Lưu từ vựng</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtspell}>/ˈoʊpən/</Text>
                    <View style={styles.soundcontainer}>
                        <Text style={styles.txticon}>UK</Text>
                        <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                        <Text style={styles.txticon}>US</Text>
                        <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                    </View>
                </View>
                <View>
                    <Text style={styles.txtcontent}>Nghĩa của từ</Text>
                    <View>
                        <View style={styles.wraptype}>
                            <Text style={styles.txttype}>Tính từ</Text>
                        </View>
                        <Text style={styles.txtmean}>Mở, ngỏ, mở rộng, không hạn chế, không cấm</Text>
                        <View style={styles.forexample}>
                            <Text style={styles.txtforexample}>Ví dụ</Text>
                            <View>
                                <Text style={styles.txtExEnglish}>An open competition </Text>
                                <Text style={styles.txtExVietnamese}>Cuộc thi mở rộng</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.wraptype}>
                            <Text style={styles.txttype}>Danh từ</Text>
                        </View>
                        <Text style={styles.txtmean}>Chỗ ngoài trời, biển khơi, sự công khai, chỗ mở</Text>
                        <View style={styles.forexample}>
                            <Text style={styles.txtforexample}>Ví dụ</Text>
                            <View>
                                <Text style={styles.txtExEnglish}>In the open</Text>
                                <Text style={styles.txtExVietnamese}>Ở ngoài trời</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.wraptype}>
                            <Text style={styles.txttype}>Động từ</Text>
                        </View>
                        <Text style={styles.txtmean}>Mở, bắt đầu, khai mạc, thổ lộ</Text>
                        <View style={styles.forexample}>
                            <Text style={styles.txtforexample}>Ví dụ</Text>
                            <View>
                                <Text style={styles.txtExEnglish}>The shop opens at 8 a.m </Text>
                                <Text style={styles.txtExVietnamese}>Cửa hàng mở cửa lúc 8 giờ sáng</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    wordcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 346,
        height: 110,
        paddingHorizontal: 20,
        //backgroundColor: color.btn_color3,
        justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 15,
        //elevation: 1,
    },
    word: {
        fontSize: 28,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        paddingTop: 10,
        fontWeight: 'bold',
    },
    btnsave: {
        width: 114,
        height: 31,
        backgroundColor: color.btn_color4,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginLeft: 80,
    },
    txtbtnsave: {
        fontSize: 14,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    txtspell: {
        fontSize: 16,
        paddingTop: 10,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt4,
    },
    soundcontainer: {
        flexDirection: 'row',
    },
    iconsound: {
        width: 24,
        height: 24,
        marginTop: 10,
        marginRight: 10,
    },
    txticon: {
        fontSize: 16,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        marginHorizontal: 10,
        paddingTop: 10,
        fontWeight: 500,
    },
    // meanwordcontainer: {
    //   width: 346,
    //   height: 93,
    //   paddingHorizontal: 20,
    //   backgroundColor: color.btn_color3,
    //   borderRadius: 10,
    //   marginTop: 15,
    //   elevation: 1,
    // },
    txtcontent: {
        paddingTop: 14,
        fontSize: 18,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        fontWeight: 'bold',
    },
    wraptype: {
        width: 68,
        height: 24,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: color.bodercolor3,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10,
    },
    txttype: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt5,
        textAlign: 'center',
    },
    txtmean: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
        marginTop: 10,
    },
    forexample: {
        marginTop: 10,
        flexDirection: 'row',
    },
    txtforexample: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_1,
        textDecorationLine: 'underline',
        marginRight: 30,
    },
    txtExEnglish: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt6,
    },
    txtExVietnamese: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
    },
});

export default Words;
