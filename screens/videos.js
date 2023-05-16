import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const Videos = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Video</Text>
                </View>
                <View style={styles.searchcontainer}>
                    <TextInput style={styles.search} placeholder="Tìm kiếm sách" />
                    <Image style={styles.icon} source={require('../sources/icons/search.png')} />
                </View>
                <Text style={styles.txtlistvideos}>Danh sách video</Text>
                <View style={styles.listvideoscontainer}>
                    <View style={styles.itemvideos}>
                        <View>
                            <Text style={styles.txtvideos}>Tiêu đề video</Text>
                            <Text style={styles.txttime}>8 giờ trước</Text>
                        </View>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                    </View>
                    <View style={styles.itemvideos}>
                        <View>
                            <Text style={styles.txtvideos}>Tiêu đề video</Text>
                            <Text style={styles.txttime}>8 giờ trước</Text>
                        </View>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                    </View>
                    <View style={styles.itemvideos}>
                        <View>
                            <Text style={styles.txtvideos}>Tiêu đề video</Text>
                            <Text style={styles.txttime}>8 giờ trước</Text>
                        </View>
                        <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                    </View>
                </View>
                <Text style={styles.txtlistvideos}>Lịch sử xem video</Text>
                <View
                    style={[styles.itemvideos, { borderRadius: 10, elevation: 2, borderBottomWidth: 0, marginTop: 15 }]}
                >
                    <View>
                        <Text style={styles.txtvideos}>Tiêu đề video</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txttime}>28/4/2023</Text>
                            <Text style={styles.txttime}>8 giờ trước</Text>
                        </View>
                    </View>
                    <Image style={styles.img} source={require('../sources/images/toppic.png')} />
                </View>
                <View
                    style={[styles.itemvideos, { borderRadius: 10, elevation: 2, borderBottomWidth: 0, marginTop: 15 }]}
                >
                    <View>
                        <Text style={styles.txtvideos}>Tiêu đề video</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txttime}>28/4/2023</Text>
                            <Text style={styles.txttime}>8 giờ trước</Text>
                        </View>
                    </View>
                    <Image style={styles.img} source={require('../sources/images/toppic.png')} />
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
    txtlistvideos: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt4,
    },
    listvideoscontainer: {
        width: 347,
        height: 408,
        // paddingHorizontal: 20,
        backgroundColor: color.btn_color3,
        //justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        elevation: 2,
    },
    itemvideos: {
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
    txtvideos: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 400,
        color: 'black',
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

export default Videos;
