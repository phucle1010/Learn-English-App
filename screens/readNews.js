import React, { useState, useEffect, useRef } from 'react';
import {
    Dimensions,
    Alert,
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import { jsdom } from 'jsdom-jscore-rn';
import { Readability } from '@mozilla/readability';
import { WebView } from 'react-native-webview';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const ReadNews = ({ navigation, route }) => {
    // const currentWidth = Dimensions.get('window').width;
    const { article } = route.params;
    const [book, setBook] = useState({});
    const [selectedText, setSelectedText] = useState('');

    const handleTextLongPress = () => {
        const selectedText = textRef.current?.value;
        console.log(selectedText);
    };

    const textRef = useRef(null);

    // useEffect(() => {
    //     fetch('https://www.googleapis.com/books/v1/volumes?q=quilting', {
    //         method: 'GET',
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setBook(data.items[0]))
    //         .catch((err) => console.log(err));
    // }, []);

    const formatDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}-${convertedDate.getMonth() + 1}-${convertedDate.getUTCFullYear()}`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('News')}
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
                <Text style={styles.txthead}>Đọc tin tức</Text>
            </View>

            <ScrollView>
                <View style={styles.articleContainer}>
                    {/* <Text style={styles.source}>{article.source.name}</Text> */}
                    <Text style={styles.title}>{article.title}</Text>
                    <View style={styles.extraInfo}>
                        {article.creator.length > 0 &&
                            article.creator.map((creator, index) => (
                                <Text key={index} style={styles.author}>
                                    {index === article.creator.length - 1 ? creator : `${creator}, `}
                                </Text>
                            ))}
                    </View>
                    <Text style={styles.publishDate}>{formatDate(article.pubDate)}</Text>
                    <Image
                        style={styles.img}
                        source={{
                            uri:
                                article.image_url ||
                                'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
                        }}
                    />
                    <Text style={styles.description}>{article.description}</Text>
                    <Text
                        style={styles.content}
                        selectable={true}
                        selectionColor={'#9FE2BF'}
                        ref={textRef}
                        onPointerEnter={handleTextLongPress}
                    >
                        {article.content}
                    </Text>
                </View>
            </ScrollView>
            {/* <WebView
                source={{ uri: article.url }}
                style={{
                    width: currentWidth,
                    height: 603,
                    backgroundColor: '#fff',
                }}
                javaScriptEnabled={true}
                injectedJavaScript={`document.body.addEventListener('mousedown mouseup', 
                    function(e){
                    window.postMessage("Message from WebView","*");
                })`}
                // injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={onMessage}
            /> */}
            {/* <View
                style={{
                    width: currentWidth,
                    height: 603,
                    backgroundColor: '#fff',
                }}
            >
                <Text>{content}</Text>
            </View> */}
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
        paddingBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: color.btn_color3,
        justifyContent: 'space-between',
    },
    source: {
        paddingTop: 20,
        paddingHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 15,
    },
    title: {
        paddingTop: 10,
        paddingHorizontal: 20,
        fontSize: 22,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txt4,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    extraInfo: {
        marginBottom: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
    },
    author: {
        fontSize: 15,
        maxWidth: 250,
        // marginRight: 10,
    },
    publishDate: {
        fontStyle: 'italic',
        fontSize: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    img: {
        width: '100%',
        height: 250,
        padding: 20,
    },
    description: {
        marginTop: 20,
        paddingHorizontal: 20,
        width: '100%',
        fontSize: 17,
        fontStyle: 'italic',
    },
    content: {
        marginTop: 20,
        paddingHorizontal: 20,
        width: '100%',
        fontSize: 18,
    },
});

export default ReadNews;
