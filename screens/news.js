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

import Loading from '../components/Loading'

const Article = ({ article, navigation }) => {
    const formatDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}-${convertedDate.getMonth() + 1}-${convertedDate.getUTCFullYear()}`;
    };

    return (
        <View style={styles.articleContainer}>
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.extraInfo}>
                {/* {article.creator.length > 0 &&
                    article.creator.map((author, index) => (
                        <Text key={index} style={styles.author}>
                            {author}
                        </Text>
                    ))} */}
                <Text style={styles.publishDate}>{formatDate(article.pubDate)}</Text>
            </View>
            <Image
                style={styles.img}
                source={{
                    uri:
                        article.image_url ||
                        'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
                }}
            />
            <Text style={styles.description}>{article.description}</Text>
            <TouchableOpacity
                style={styles.btnView}
                onPress={() =>
                    navigation.navigate('ReadNews', {
                        article,
                    })
                }
            >
                <Text style={styles.textView}>Đọc ngay</Text>
            </TouchableOpacity>
        </View>
    );
};

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
                    <ScrollView>
                        {allArticles.length > 0 &&
                            allArticles.map((item, index) => (
                                <Article article={item} key={index} navigation={navigation} />
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
        alignItems: 'center',
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
    img: {
        width: '100%',
        height: 180,
        padding: 20,
        borderRadius: 10,
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
});

export default News;
