import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const ReadBook = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Đọc sách</Text>
                </View>
                <View style={styles.searchcontainer}>
                    <TextInput style={styles.search} placeholder="Tìm kiếm sách" />
                    <Image style={styles.icon} source={require('../sources/icons/search.png')} />
                </View>
                <View
                    style={{
                        width: 350,
                        alignItems: 'flex-start',
                    }}
                >
                    <Text style={styles.txtlistbooks}>Danh sách quyển sách</Text>
                </View>

                <View style={styles.itemcontainer}>
                    <Image style={styles.imgbook} source={require('../sources/images/toppic.png')} />
                    <View style={styles.infBookContainer}>
                        <Text style={styles.txtbook}>Tên sách</Text>
                        <Text style={styles.txtauthor}>Tác giả</Text>
                        <TouchableOpacity style={styles.btnReadNow}>
                            <Text style={styles.txtbtnReadNow}>Đọc ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnQuickView}>
                            <Text style={styles.txtbtnQuickView}>Xem nhanh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.itemcontainer}>
                    <Image style={styles.imgbook} source={require('../sources/images/toppic.png')} />
                    <View style={styles.infBookContainer}>
                        <Text style={styles.txtbook}>Tên sách</Text>
                        <Text style={styles.txtauthor}>Tác giả</Text>
                        <TouchableOpacity style={styles.btnReadNow}>
                            <Text style={styles.txtbtnReadNow}>Đọc ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnQuickView}>
                            <Text style={styles.txtbtnQuickView}>Xem nhanh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.itemcontainer}>
                    <Image style={styles.imgbook} source={require('../sources/images/toppic.png')} />
                    <View style={styles.infBookContainer}>
                        <Text style={styles.txtbook}>Tên sách</Text>
                        <Text style={styles.txtauthor}>Tác giả</Text>
                        <TouchableOpacity style={styles.btnReadNow}>
                            <Text style={styles.txtbtnReadNow}>Đọc ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnQuickView}>
                            <Text style={styles.txtbtnQuickView}>Xem nhanh</Text>
                        </TouchableOpacity>
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
    searchcontainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: 306,
        height: 40,
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 17,
        borderWidth: 1,
        borderColor: color.bodercolor3,
        alignItems: 'center',
    },
    search: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 14,
        fontStyle: 'italic',
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 15,
    },
    txtlistbooks: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt4,
    },
    itemcontainer: {
        width: 346,
        height: 255,
        // paddingHorizontal: 20,
        backgroundColor: color.btn_color3,
        //justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 18,
        marginBottom: 10,
        elevation: 2,
        alignItems: 'center',
    },
    imgbook: {
        width: 300,
        height: 127,
        marginTop: 20,
    },
    infBookContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    txtbook: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_1,
        color: color.txt1,
        fontWeight: 400,
        marginLeft: 20,
        marginRight: 60,
    },
    txtauthor: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        color: color.txt5,
        marginRight: 15,
        marginLeft: 30,
        paddingRight: 10,
    },
    btnReadNow: {
        width: 114,
        height: 31,
        marginLeft: 20,
        backgroundColor: color.btn_color4,
        borderRadius: 30,
        marginTop: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtbtnReadNow: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    btnQuickView: {
        width: 114,
        height: 31,
        marginRight: 20,
        backgroundColor: color.btn_color1,
        borderRadius: 30,
        marginTop: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtbtnQuickView: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
});

export default ReadBook;
