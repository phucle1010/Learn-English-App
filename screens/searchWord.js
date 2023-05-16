import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const SearchWord = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Từ điển</Text>
                </View>

                <View style={styles.wordcontainer}>
                    <Text style={styles.word}>Hello</Text>
                    <TouchableOpacity style={styles.btnsave}>
                        <Text style={styles.txtbtnsave}>Lưu từ vựng</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtspell}>/həˈloʊ/</Text>
                    <View style={styles.soundcontainer}>
                        <Text style={styles.txticon}>UK</Text>
                        <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                        <Text style={styles.txticon}>US</Text>
                        <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                    </View>
                </View>
                <View style={styles.typewordcontainer}>
                    <Text style={styles.txtcontent}>Từ loại</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.wraptype}>
                            <Text style={styles.txttype}>Danh từ</Text>
                        </View>
                        <View style={styles.wraptype}>
                            <Text style={styles.txttype}>Thán từ</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.typewordcontainer}>
                    <Text style={styles.txtcontent}>Nghĩa của từ</Text>
                </View>
                <View style={styles.typewordcontainer}>
                    <Text style={styles.txtcontent}>Từ đồng nghĩa</Text>
                </View>
                <View style={styles.typewordcontainer}>
                    <Text style={styles.txtcontent}>Cụn từ</Text>
                </View>
                <View style={styles.typewordcontainer}>
                    <Text style={styles.txtcontent}>Thành ngữ</Text>
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
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        marginLeft: 100,
    },
    wordcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 346,
        height: 110,
        paddingHorizontal: 20,
        backgroundColor: color.btn_color3,
        justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 15,
        elevation: 1,
    },
    word: {
        fontSize: 28,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        paddingTop: 10,
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
    typewordcontainer: {
        width: 346,
        height: 93,
        paddingHorizontal: 20,
        backgroundColor: color.btn_color3,
        borderRadius: 10,
        marginTop: 15,
        elevation: 1,
    },
    txtcontent: {
        paddingTop: 14,
        paddingLeft: 14,
        fontSize: 18,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        fontWeight: 600,
    },
    wraptype: {
        width: 68,
        height: 24,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: color.bodercolor3,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 14,
        marginTop: 10,
    },
    txttype: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt5,
        textAlign: 'center',
    },
});

export default SearchWord;
