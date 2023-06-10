import { async } from '@firebase/util';
import { set } from 'immer/dist/internal';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native';

const width = Dimensions.get('window').width;
import Loading from '../components/Loading'

let listData = []


const ReadBook = ({ navigation, route }) => {
    const isFoucesedScreen = useIsFocused();
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [dataDis, setDataDis] = useState([])

    useEffect(() => {
        if (isFoucesedScreen) {
            getdata();
        } else {
            setDataDis([])
            setLoading(true)
        }
    }, [isFoucesedScreen])

    const searched = (text) => {
        setSearch(text)
        setDataDis(listData.filter(item => item.title.toLowerCase().includes(text.toLowerCase())))
    }
    const getdata = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://edtechbooks.org/api.php?action=search_books&offset=0&limit=30')
                .then(response => response.json())
                .then(data => {
                    const listkey = Object.keys(data.books)
                    listkey.forEach((key) => {
                        listData.push(data.books[key])
                    })
                })
            setTimeout(() => {
                setDataDis(listData)
                setLoading(false)
            }, 2000);
            // xử lý dữ liệu ở đây
        } catch (error) {
            console.error(error);
            // xử lý lỗi ở đây
        }
    }

    return (
        <React.Fragment>
            {
                loading === false ? (
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.headcontainer}>
                                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                                </TouchableOpacity>
                                <Text style={styles.txthead}>Đọc sách</Text>
                            </View>
                            <View style={styles.searchcontainer}>
                                <TextInput value={search}
                                    onChangeText={(text) => { searched(text) }} style={styles.search} placeholder="Tìm kiếm sách" placeholderTextColor={'#AAAAAA'} />
                                <TouchableOpacity onPress={() => { }}>
                                    <Icon name='search-outline' size={26} style={{ paddingRight: 10 }} />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width: 350,
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Text style={styles.txtlistbooks}>Danh sách quyển sách</Text>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    dataDis.map((item, index) => (
                                        <View style={styles.itemcontainer} key={index}>
                                            <Image style={styles.imgbook} source={{ uri: "https://edtechbooks.org/book_cover_images/" + item.cover_image_lg }} />
                                            <View style={styles.infBookContainer}>
                                                <View style={{ width: 210, marginTop: 5 }}>
                                                    <Text style={styles.txtbook} numberOfLines={3}>{item.title}</Text>
                                                    <Text style={styles.txtauthor} numberOfLines={2}>{item.subtitle}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.btnQuickView} onPress={() => { navigation.navigate('DetailReadBook', { itembook: item }) }}>
                                                    <Text style={styles.txtbtnQuickView}>Xem nhanh</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </ScrollView>) : (
                    <Loading />
                )
            }
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffff'
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 60,
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
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 22,
        height: 42,
        flexDirection: 'row',
        width: width - 44,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: color.bodercolor3,
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    search: {
        flex: 1,
        paddingHorizontal: 20,
        fontSize: 16,
        fontStyle: 'italic',
        color: '#333',
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
        fontFamily: fontstyle.fontfamily_2,
        color: color.txt4,
    },
    itemcontainer: {
        width: 346,
        height: 210,
        padding: 10,
        backgroundColor: color.btn_color3,
        //justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 18,
        marginBottom: 10,
        elevation: 4,
        flexDirection: 'row'
    },
    imgbook: {
        width: '40%',
        height: '100%',
        borderRadius: 10,
        marginRight: 5
    },
    infBookContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    txtbook: {
        fontSize: 18,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        fontWeight: 400,
    },
    txtauthor: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: fontstyle.fontfamily_2,
    },
    // btnReadNow: {
    //     // width: 114,
    //     height: 31,
    //     marginLeft: 20,
    //     backgroundColor: color.btn_color4,
    //     borderRadius: 10,
    //     marginTop: 13,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    txtbtnReadNow: {
        fontSize: 14,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    btnQuickView: {
        // width: 200,
        height: 31,
        // marginRight: 20,
        backgroundColor: color.btn_color1,
        borderRadius: 10,
        marginTop: 13,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtbtnQuickView: {
        fontSize: 14,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
});

export default ReadBook;
