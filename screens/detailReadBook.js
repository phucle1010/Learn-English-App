import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const widthImage = 160;
const positionHozitalOfImage = (width - widthImage) / 2;

const DetailReadBook = ({ navigation, route }) => {
    const { itembook } = route.params

    const displayText = (text) => {
        return text.length < 240
            ? `${text}`
            : `${text.substring(0, 238)}...`
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#a1c2f7', '#f294f1']}
                style={styles.linearContainer} />
            <TouchableOpacity
                onPress={() => navigation.navigate('ReadBook')}
                style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    top: 25,
                    left: 20,
                    zIndex: 100,
                }}
            >
                <Icon name='arrow-left' style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }} />
            </TouchableOpacity>

            {/* New design */}
            <View style={styles.mainContent}>
                <Image style={styles.imgbook} source={{ uri: "https://edtechbooks.org/book_cover_images/" + itembook.cover_image_lg }} resizeMode='stretch' />
                <View
                    style={{
                        paddingHorizontal: 30,
                    }}
                >
                    <Text style={styles.txtbook} numberOfLines={3}>{itembook.title}</Text>
                    {
                        itembook.subtitle && <Text style={styles.txtauthor} numberOfLines={3}>{itembook.subtitle}</Text>
                    }
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ ...styles.viewItem, backgroundColor: '#f66' }}>
                            <IonIcon name='download-outline' size={23} color={'#fff'} style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>{itembook.pdf_downloads}</Text>
                        </View>
                        <View style={{ ...styles.viewItem, backgroundColor: '#ff8f61' }}>
                            <IonIcon name='eye-outline' size={23} color={'#fff'} style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>{itembook.page_views}</Text>
                        </View>
                        <View style={{ ...styles.viewItem, backgroundColor: '#ff4571' }}>
                            <IonIcon name='pencil-outline' size={23} color={'#fff'} style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>{itembook.minor_version}</Text>
                        </View>
                    </View>
                    <Text style={[styles.txtauthor, { marginTop: 15, fontSize: 16, lineHeight: 22 }]}>{displayText(itembook.abstract.replace(/<\/?p>/gi))}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={styles.btnQuickView}
                            onPress={() => navigation.navigate('DetailBook', { idBook: itembook.book_id, itembook })}
                        >
                            <Text style={styles.txtbtnQuickView}>Tải sách</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btnQuickView, backgroundColor: '#fff', borderColor: '#118b9e' }}>
                            <Text style={{ ...styles.txtbtnQuickView, color: '#118b9e' }}>Lưu sách</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#8fd2d9'
    },
    linearContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#4d53e3'
    },
    mainContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '70%',
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    imgbook: {
        position: 'absolute',
        top: '-25%',
        left: positionHozitalOfImage,
        // transform: [{ translateX: -75 }],
        width: widthImage,
        height: 230,
        borderRadius: 10,
        zIndex: 100,
    },
    txtbook: {
        marginTop: '38%',
        fontSize: 18,
        color: color.txt1,
        fontWeight: 500,
    },
    txtauthor: {
        marginTop: 5,
        fontSize: 15,
    },
    viewItem: {
        marginTop: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#f66',
        alignSelf: 'flex-start',
    },
    btnQuickView: {
        paddingVertical: 8,
        paddingHorizontal: 30,
        backgroundColor: '#5fc9cd',
        borderRadius: 100,
        marginTop: 13,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    txtbtnQuickView: {
        fontSize: 17,
        color: color.txtbtn_color1,
    },
});

export default DetailReadBook;
