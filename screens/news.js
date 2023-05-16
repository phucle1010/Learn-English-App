import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const News = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Tin tức</Text>
                </View>
                <View style={styles.toppiccontainer}>
                    <Text style={styles.txttoppic}> Công nghệ</Text>
                    <TouchableOpacity style>
                        <Text style={styles.txtseenmore}>Xem thêm</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.toppiccontainer}>
                    <Text style={styles.txttoppic}> Thể thao</Text>
                    <TouchableOpacity style>
                        <Text style={styles.txtseenmore}>Xem thêm</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.toppiccontainer}>
                    <Text style={styles.txttoppic}> Du lịch</Text>
                    <TouchableOpacity style>
                        <Text style={styles.txtseenmore}>Xem thêm</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.toppiccontainer}>
                    <Text style={styles.txttoppic}> Kinh Doanh</Text>
                    <TouchableOpacity style>
                        <Text style={styles.txtseenmore}>Xem thêm</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.toppiccontainer}>
                    <Text style={styles.txttoppic}> Giải trí</Text>
                    <TouchableOpacity style>
                        <Text style={styles.txtseenmore}>Xem thêm</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.toppiccontainer}>
                    <Text style={styles.txttoppic}> Giáo dục</Text>
                    <TouchableOpacity style>
                        <Text style={styles.txtseenmore}>Xem thêm</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.toppiccontainer}>
                    <Text style={styles.txttoppic}> Xã hội</Text>
                    <TouchableOpacity style>
                        <Text style={styles.txtseenmore}>Xem thêm</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.toppiccontainer}>
                    <Text style={styles.txttoppic}>Khoa học</Text>
                    <TouchableOpacity style>
                        <Text style={styles.txtseenmore}>Xem thêm</Text>
                    </TouchableOpacity>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapItems}>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                        <Text style={styles.txtimg}>Tiêu đề chính</Text>
                        <TouchableOpacity style={styles.btnView}>
                            <Text style={styles.txtbtnView}>Xem ngay</Text>
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
    toppiccontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 346,
        height: 294,
        paddingHorizontal: 20,
        backgroundColor: color.btn_color3,
        justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 20,
        elevation: 1,
    },
    txttoppic: {
        fontSize: 20,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txt4,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 20,
    },
    txtseenmore: {
        fontSize: 16,
        fontFamily: fontstyle.fontfamily_2,
        color: color.btn_color4,
        paddingTop: 12,
        marginHorizontal: 20,
    },
    wrapItems: {
        width: 138,
        height: 213,
        backgroundColor: color.btn_color3,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 15,
        elevation: 2,
    },
    btnView: {
        backgroundColor: color.btn_color1,
        width: 114,
        height: 31,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 9,
        borderRadius: 30,
    },
    img: {
        width: 110,
        height: 110,
        padding: 20,
        marginTop: 15,
    },
    txtimg: {
        fontSize: 15,
        fontWeight: 400,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt4,
        marginTop: 10,
        marginBottom: 8,
    },
    btnreturn: {
        backgroundColor: color.btn_color3,
        width: 350,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 30,
        elevation: 5,
    },
    txtbtnView: {
        fontSize: 14,
        fontWeight: 300,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
});

export default News;
