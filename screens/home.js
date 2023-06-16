import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native';

import Header from '../components/Header';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
    const isFocusedScreen = useIsFocused();
    const user = useSelector(state => state.user)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [isFocusedScreen]);

    return (
        <React.Fragment>
            {
                loaded ? (
                    <SafeAreaView style={styles.main}>
                        <Header />
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                            <View style={styles.container}>
                                <View style={styles.secsion1}>
                                    <View style={styles.headcontainer}>
                                        <Text style={styles.txthead1}>Xin chào {user.fullName},</Text>
                                        <Image
                                            style={styles.imgAccount}
                                            source={{
                                                uri: 'https://static8.depositphotos.com/1000792/1065/v/600/depositphotos_10659058-stock-illustration-cute-dog.jpg',
                                            }}
                                        />
                                    </View>
                                    <View style={{
                                        width: '100%',
                                        paddingHorizontal: 10,
                                    }}>
                                        <Text style={styles.txthead2}>Chúc bạn có một ngày mới vui vẻ!</Text>
                                    </View>
                                </View>
                                <Text style={styles.txtContent}>Từ điển</Text>
                                <View style={styles.secsion2}>
                                    <View>
                                        <Text style={styles.txtvocabulary}>Từ vựng</Text>
                                    </View>
                                    <View>
                                        <View style={styles.searchcontainer}>
                                            <TextInput style={styles.search} placeholder="Nhập từ vựng" />
                                            <TouchableOpacity>
                                                <Icon name='search-outline' size={28} style={{
                                                    paddingRight: 10
                                                }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.txtVocabularySearched}>Từ vựng tìm kiếm gần đây</Text>
                                        <View style={styles.wrapwords}>
                                            <Text style={styles.txtwords}>Hello</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.txtContent}>Khám phá</Text>
                                <View style={styles.secsion3}>
                                    <View style={styles.listItem}>
                                        <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate('News')}>
                                            <Image style={styles.imgItem} source={require('../sources/images/news.png')} />
                                            <Text style={styles.txtimgItem}>Tin tức</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("Videos")}>
                                            <Image
                                                style={styles.imgItem}
                                                source={require('../sources/images/video-marketing.png')}
                                            />
                                            <Text style={styles.txtimgItem}>Video</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.wrapItems} onPress={() => { navigation.navigate("ReadBook") }}>
                                            <Image style={styles.imgItem} source={require('../sources/images/book-stack.png')} />
                                            <Text style={styles.txtimgItem}>Đọc sách</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("WordGroup")}>
                                            <Image style={styles.imgItem} source={require('../sources/images/dictionary.png')} />
                                            <Text style={styles.txtimgItem}>Bộ từ vựng</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.listItem}>
                                        <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("Grammar")}>
                                            <Image style={styles.imgItem} source={require('../sources/images/grammar.png')} />
                                            <Text style={styles.txtimgItem}>Ngữ pháp</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("Exercise")}>
                                            <Image style={styles.imgItem} source={require('../sources/images/homework.png')} />
                                            <Text style={styles.txtimgItem}>Bài tập</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.wrapItems}>
                                            <Image style={styles.imgItem} source={require('../sources/images/joystick.png')} />
                                            <Text style={styles.txtimgItem}>Game</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.wrapItems}>
                                            <Image style={styles.imgItem} source={require('../sources/images/test.png')} />
                                            <Text style={styles.txtimgItem}>Kiểm tra</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.txtContent}>Thống kê sử dụng</Text>
                                </View>
                                <View style={{
                                    width: 370,
                                }}>
                                    <Image
                                        style={styles.chart}
                                        source={require('../sources/images/Statistical-Graph-Flat-Icon-Graphics-13805472-1-580x387.png')}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                ) : <View
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ fontSize: 20, color: '#767676' }}>Loading...</Text>
                </View>
            }
        </React.Fragment>

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
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    secsion1: {
        marginTop: 20,
        width: 370,
        height: 132,
        backgroundColor: color.btn_color3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headcontainer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txthead1: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: '#3B3B3B',
    },
    txthead2: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: '#3B3B3B',
        fontWeight: 'bold',
    },
    imgAccount: {
        width: 53,
        height: 53,
        marginLeft: 100,
        marginBottom: 10,
    },
    txtContent: {
        alignSelf: 'flex-start',
        width: 346,
        fontSize: 20,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txt1,
        fontWeight: '300',
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    secsion2: {
        marginTop: 10,
        width: 370,
        height: 180,
        backgroundColor: color.btn_color3,
        borderRadius: 10,
    },
    txtvocabulary: {
        marginTop: 10,
        marginLeft: 18,
        marginBottom: 8,
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 18,
    },
    txtVocabularySearched: {
        marginLeft: 18,
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 16,
        color: color.txt4,
    },
    searchcontainer: {
        flexDirection: 'row',
        width: 306,
        height: 44,
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 17,
        borderWidth: 1,
        borderColor: color.bodercolor1,
        alignItems: 'center',
    },
    search: {
        flex: 1,
        paddingHorizontal: 20,
        fontSize: 15,
        fontStyle: 'italic',
        // backgroundColor: 'red'
    },
    icon: {
        width: 22,
        height: 22,
        marginHorizontal: 7,
    },
    txtwords: {
        fontSize: 16,
        fontWeight: 300,
        fontFamily: fontstyle.fontfamily_2,
        color: 'black',
    },
    wrapwords: {
        backgroundColor: color.btn_color5,
        width: 81,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 18,
        marginTop: 10,
        borderRadius: 100,
        elevation: 2,
    },
    secsion3: {
        width: 370,
        height: 200,
        backgroundColor: color.btn_color3,
        borderRadius: 10,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    wrapItems: {
        backgroundColor: color.btn_color3,
        width: 70,
        height: 70,
        marginLeft: 15,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 2,
    },

    imgItem: {
        width: 30,
        height: 30,
    },
    txtimgItem: {
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt5,
        fontSize: 13,
        paddingTop: 5,
        textAlign: 'center',
    },
    chart: {
        width: '100%',
        height: 232,
    },
});

export default Home;
