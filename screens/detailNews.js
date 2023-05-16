import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const DetailNews = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headcontainer}>
                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                <Text style={styles.txthead}>Tin tức</Text>
            </View>
            <View style={styles.searchcontainer}>
                <TextInput style={styles.search} placeholder="Tìm kiếm tin tức" />
                <Image style={styles.icon} source={require('../sources/icons/search.png')} />
            </View>
            <Text style={styles.txtlistnews}>Danh sách tin tức</Text>
            <View style={styles.listnewscontainer}>
                <View style={styles.itemnews}>
                    <View>
                        <Text style={styles.txtnews}>Tiêu đề tin tức</Text>
                        <Text style={styles.txttime}>8 giờ trước</Text>
                    </View>
                    <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                </View>
                <View style={styles.itemnews}>
                    <View>
                        <Text style={styles.txtnews}>Tiêu đề tin tức</Text>
                        <Text style={styles.txttime}>8 giờ trước</Text>
                    </View>
                    <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                </View>
            </View>
        </View>
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
        color: color.txt5,
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
    txtlistnews: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt4,
    },
    listnewscontainer: {
        width: 347,
        height: 408,
        // paddingHorizontal: 20,
        backgroundColor: color.btn_color3,
        //justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 20,
        elevation: 2,
    },
    itemnews: {
        flexDirection: 'row',
        width: 347,
        height: 94,
        borderBottomWidth: 1,
        borderColor: color.bodercolor3,
        justifyContent: 'space-between',
    },
    img: {
        width: 101,
        height: 66,
        borderRadius: 10,
        marginTop: 12,
        marginRight: 18,
    },
    txtnews: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 400,
        paddingLeft: 16,
        paddingTop: 12,
    },
    txttime: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_1,
        color: color.txt5,
        marginTop: 10,
        marginLeft: 16,
    },
});

export default DetailNews;
