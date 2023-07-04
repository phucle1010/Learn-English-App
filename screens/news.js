import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/Ionicons'

import Loading from '../components/Loading'

const NewsItem = ({ article, navigation }) => {
    const formatDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}-${convertedDate.getMonth() + 1}-${convertedDate.getUTCFullYear()}`;
    };

    const displayText = (text, type) => {
        switch (type) {
            case 'news':
                return text.length < 35
                    ? `${text}`
                    : `${text.substring(0, 32)}...`
            case 'video': return text.length < 20
                ? `${text}`
                : `${text.substring(0, 18)}...`
            default:
                break;
        }

    }

    return (
        <View style={{ ...styles.wrapItem, height: 180, marginBottom: 70 }}>
            <View style={styles.detailContainer}>
                {
                    article?.category !== null && article.category.length > 0 && <Text style={{ marginBottom: 5, paddingVertical: 3, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#dcdcdc', alignSelf: 'flex-start' }}>{article.category[0].replace(article.category[0][0], article.category[0][0].toUpperCase())}</Text>
                }
                <Text style={styles.txtname}>{displayText(article.title, 'news')}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {article?.creator !== null && article.creator.length > 0 &&
                        article.creator.map((author, index) => (
                            <Text key={index}>
                                {author},
                            </Text>
                        ))}
                    <Text> {formatDate(article.pubDate)}</Text>
                </View>
                <TouchableOpacity
                    style={{
                        ...styles.wrapbtn,
                        backgroundColor: '#FAA0A0',
                        alignSelf: 'flex-start',
                        marginTop: 15,
                        paddingVertical: 6,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() =>
                        navigation.navigate('ReadNews', {
                            article,
                        })
                    }
                >
                    <Text style={{ color: '#fff', fontSize: 15 }}>Đọc ngay</Text>
                </TouchableOpacity>
            </View>
            <Image
                style={{ ...styles.img }}
                source={{
                    uri: article.image_url !== null ? article.image_url : 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                }}
            />
        </View>
    )
}

const News = ({ navigation }) => {
    const isFocusedScreen = useIsFocused();
    const readmoreButtonWidth = 130;
    const currentScreenWidth = Dimensions.get('window').width;
    // const initNumberOfShowedArticles = 20;
    const [allArticles, setAllArticles] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getAllArticles = async () => {
        await fetch('https://newsdata.io/api/1/news?apikey=pub_237396fdcca083c8aa3d48ccd8eb2f4737127&country=us', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setAllArticles(data.results);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (isFocusedScreen) {
            getAllArticles();
        } else {
            setAllArticles(false);
            setLoaded(false);
        }
    }, [isFocusedScreen]);

    return (
        <React.Fragment>
            {loaded ? (
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
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
                        <Text style={styles.txthead}>Tin tức</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
                        {allArticles.length > 0 &&
                            allArticles.map((item, index) => (
                                <NewsItem article={item} key={index} navigation={navigation} />
                            ))}
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                marginBottom: 20,
                                marginHorizontal: (currentScreenWidth - readmoreButtonWidth) / 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 130,
                                paddingHorizontal: 20,
                                paddingVertical: 8,
                                borderRadius: 5,
                                backgroundColor: '#5C4AC9',
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 18 }}>Xem thêm</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            ) : (

                < Loading />
            )}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        paddingBottom: 80,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
        elevation: 10,
    },
    imgreturn: {
        width: '100%',
        height: '100%',
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: color.txt5,
    },
    articleContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingHorizontal: 30,
        backgroundColor: color.btn_color3,
        justifyContent: 'space-between',
        marginTop: 10,
        elevation: 1,
    },
    title: {
        fontSize: 22,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txt4,
        fontWeight: 'bold',
        paddingTop: 10,
        textAlign: 'justify',
    },
    extraInfo: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
    },
    author: {
        fontSize: 15,
        maxWidth: 250,
        marginRight: 50,
    },
    publishDate: {
        fontStyle: 'italic',
        fontSize: 15,
    },
    descContainer: {
        width: 220,
        marginRight: 10,
    },
    description: {
        marginTop: 10,
        width: '100%',
        fontSize: 17,
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
    btnView: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#FB6F43',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
    },
    textView: {
        color: '#fff',
        fontSize: 15,
    },
    wrapItem: {
        // backgroundColor: 'red',
        paddingRight: 20,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor: color.btn_color3,
        alignItems: 'center',
        overflow: 'hidden',
    },
    img: {
        width: 150,
        height: '100%',
        borderRadius: 20,
    },
    detailContainer: {
        marginTop: 10,
        marginLeft: 20,
        flex: 1,
        alignSelf: 'flex-start',
        marginRight: 15,
    },
    txtname: {
        fontSize: 18,
        fontWeight: 600,
        fontFamily: fontStyle.fontfamily_1,
        color: color.txt1,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default News;
