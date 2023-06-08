import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
const { width, height } = Dimensions.get('window');

const DetailReadBook = ({ navigation, route }) => {
    const { itembook } = route.params
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ReadBook')}
                style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    top: 25,
                    left: 30,
                    zIndex: 100,
                }}
            >
                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
            </TouchableOpacity>
            <View style={styles.headcontainer}>
                <Text style={styles.txthead}>Đọc sách</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 3, marginBottom: 5, paddingVertical: 5, paddingLeft: 10, width: width, borderBottomColor: '#fafafa', borderBottomWidth: 3 }}>
                    <Image style={styles.imgbook} source={{ uri: "https://edtechbooks.org/book_cover_images/" + itembook.cover_image_lg }} />
                    <View style={styles.infBookContainer}>
                        <View style={{ width: 210, marginTop: 5 }}>
                            <Text style={styles.txtbook} numberOfLines={3}>{itembook.title}</Text>
                            <Text style={styles.txtauthor} numberOfLines={3}>{itembook.subtitle}</Text>
                        </View>
                        <TouchableOpacity style={styles.btnQuickView} onPress={() => { navigation.navigate('DetailBook', { idBook: itembook.book_id }) }}>
                            <Text style={styles.txtbtnQuickView}>Tải sách</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingVertical: 15, marginBottom: 5, width: width }}>

                    <View style={{ width: width / 3, alignItems: 'center', }}>
                        <Text style={[styles.txtauthor, { fontSize: 17, fontWeight: 'bold' }]}>LƯỢT XEM</Text>
                        <Text style={[styles.txtbook, { fontSize: 22, fontWeight: 'bold' }]}>{itembook.page_views}</Text>
                    </View>
                    <View style={{ width: width / 3, alignItems: 'center', }}>
                        <Text style={[styles.txtauthor, { fontSize: 17, fontWeight: 'bold' }]}>LƯỢT TẢI</Text>
                        <Text style={[styles.txtbook, { fontSize: 22, fontWeight: 'bold' }]}>{itembook.pdf_downloads}</Text>
                    </View>
                    <View style={{ width: width / 3, alignItems: 'center', }}>
                        <Text style={[styles.txtauthor, { fontSize: 17, fontWeight: 'bold' }]}>TÁI BẢN</Text>
                        <Text style={[styles.txtbook, { fontSize: 22, fontWeight: 'bold' }]}>{itembook.minor_version}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', paddingVertical: 15, marginBottom: 5, width: width, paddingHorizontal: 10 }}>
                    <Text style={[styles.txtbook, { fontSize: 20, fontWeight: 'bold' }]}>Tóm tắt</Text>
                    <Text style={[styles.txtauthor, { fontSize: 17 }]}>{itembook.abstract.replace(/<\/?p>/gi, '')}</Text>
                </View>
            </ScrollView>
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
        justifyContent: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
    },
    imgreturn: {
        width: '100%',
        height: '100%',
        // marginLeft: 38,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: color.txt5,
    },

    imgbook: {
        width: 150,
        height: 230,
        marginRight: 5
    },
    infBookContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    txtbook: {
        fontSize: 19,
        color: color.txt1,
        fontWeight: 400,
    },
    txtauthor: {
        marginTop: 10,
        fontSize: 15,
    },
    btnQuickView: {
        paddingVertical: 8,
        backgroundColor: color.btn_color1,
        borderRadius: 10,
        marginTop: 13,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtbtnQuickView: {
        // paddingVertical: 15,
        fontSize: 16,
        color: color.txtbtn_color1,
    },
});

export default DetailReadBook;
