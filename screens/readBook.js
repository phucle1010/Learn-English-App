import { async } from '@firebase/util';
import { set } from 'immer/dist/internal';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
import Loading from '../components/Loading'

let listData = []

const itemBookWidth = 200;
const imageBookWidth = 160;
const positionOfBookImage = (itemBookWidth - imageBookWidth) / 2;

const BookItem = ({ book, displayText, type, navigation }) => {
    return <View style={styles.itemcontainer} >
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#ffffff', type === 'main' ? '#cbffd1' : '#fae8ea']}
            style={styles.linearContainer} />
        <Image style={styles.imgbook} source={{ uri: "https://edtechbooks.org/book_cover_images/" + book.cover_image_lg }} resizeMode='stretch' />
        <TouchableOpacity style={styles.viewBtn} onPress={() => { navigation.navigate('DetailReadBook', { itembook: book }) }}>
            <Icon name='play' style={{
                fontSize: 30,
                color: type === 'main' ? '#80eb8c' : '#ff7c90',
                fontWeight: 'bold'
            }} />
        </TouchableOpacity>
        <View style={{ marginHorizontal: positionOfBookImage }}>
            <Text style={styles.txtbook} >{displayText(book.title, 'main')}</Text>
            <Text style={styles.txtauthor} >{displayText(book.subtitle || 'No Subscription', 'sub')}</Text>
        </View>
    </View>

}

const ReadBook = ({ navigation, route }) => {
    const isFoucesedScreen = useIsFocused();
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [dataDis, setDataDis] = useState([])

    useEffect(() => {
        getdata();
    }, [])

    useEffect(() => {
        if (!isFoucesedScreen) {
            setSearch('')
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


    const displayText = (text, type) => {
        switch (type) {
            case 'main': return text.length < 25
                ? `${text}`
                : `${text.substring(0, 23)}...`
            case 'sub': return text.length < 30
                ? `${text}`
                : `${text.substring(0, 28)}...`
            default:
                break;
        }

    }

    return (
        <React.Fragment>
            {
                loading === false ? (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Home")}
                                style={{
                                    width: '100%',
                                    height: 30,
                                    position: 'absolute',
                                    top: 20,
                                    left: 20,
                                    zIndex: 100,
                                }}
                            >
                                <SimpleIcon name='arrow-left' style={{ color: color.txt5, fontSize: 23, fontWeight: 'bold' }} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Đọc sách</Text>
                        </View>
                        <View style={styles.searchcontainer}>
                            <TouchableOpacity onPress={() => { }}>
                                <Icon name='search-outline' size={26} style={{ paddingHorizontal: 10 }} />
                            </TouchableOpacity>
                            <TextInput value={search}
                                onChangeText={(text) => { searched(text) }} style={styles.search} placeholder="Tìm kiếm" placeholderTextColor={color.txt2} />
                        </View>
                        <ScrollView>
                            {/* Sách dành cho bạn */}
                            <View>
                                <Text style={styles.txtlistbooks}>Dành cho bạn</Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 30 }}>
                                {
                                    dataDis.map((item, index) => <BookItem key={index} book={item} displayText={displayText} type={'main'} navigation={navigation} />)
                                }

                            </ScrollView>
                            {/* Sách gợi ý */}
                            <View>
                                <Text style={styles.txtlistbooks}>Gợi ý sách</Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 30 }}>
                                <BookItem book={dataDis[0]} displayText={displayText} navigation={navigation} />
                            </ScrollView>
                        </ScrollView>
                    </View>
                ) : (
                    <Loading />
                )
            }
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#ffff'
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.btn_color3,
        height: 60,
        width: 390,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
    },
    searchcontainer: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        height: 48,
        width: width - 40,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6f6f6'
    },
    search: {
        flex: 1,
        paddingLeft: 0,
        paddingRight: 20,
        fontSize: 16,
        color: '#333',
    },
    txtlistbooks: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 700,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txt4,
    },
    itemcontainer: {
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
        width: itemBookWidth,
        height: 340,
        borderRadius: 10,
    },
    linearContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#4d53e3',
        borderRadius: 10,
    },
    imgbook: {
        position: 'absolute',
        top: '-10%',
        left: positionOfBookImage,
        width: imageBookWidth,
        height: 220,
        borderRadius: 10,
        zIndex: 100,
    },
    txtbook: {
        marginTop: 200,
        fontSize: 18,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        fontWeight: 700,
    },
    txtauthor: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: fontstyle.fontfamily_2,
    },
    viewBtn: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        alignSelf: 'flex-start',
        padding: 6,
        paddingVertical: 4,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        zIndex: 1000
    }
});

export default ReadBook;
