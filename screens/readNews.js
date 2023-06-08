import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Alert
} from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import db from '../firebase';
import Icon from 'react-native-vector-icons/Ionicons'
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native'

import WordModal from '../components/WordModal';

const width = Dimensions.get('window').width;

const ReadNews = ({ navigation, route }) => {
    const { article } = route.params;
    const [search, setSearch] = useState('');
    const [searchedWordData, setSearchedWordData] = useState({});
    const [showedWordModal, setShownWordModal] = useState(false);

    const handleSearchWord = async () => {
        const querySnapshot = await getDocs(collection(db, "VOCABULARY"));
        querySnapshot.forEach((doc) => {
            if (doc.data().word === search.toLowerCase()) {
                setSearchedWordData(doc.data())
                setShownWordModal(true)
            }
        });
    };

    const snapPoints = useMemo(() => ['45%', '70%'], []);

    const formatDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}-${convertedDate.getMonth() + 1}-${convertedDate.getUTCFullYear()}`;
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View >
                <TouchableOpacity
                    onPress={() => {
                        setSearch('')
                        setSearchedWordData({})
                        setShownWordModal(false)
                        navigation.navigate('News')
                    }}
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
                <View style={styles.searchcontainer}>
                    <TextInput onChangeText={(input) => setSearch(input)} value={search} style={styles.search} placeholder="Tìm kiếm từ vựng" placeholderTextColor={'#AAAAAA'} />
                    <TouchableOpacity onPress={handleSearchWord}>
                        <Icon name='search-outline' size={26} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.articleContainer}>
                        <Text style={styles.title}>{article.title}</Text>
                        <View style={styles.extraInfo}>
                            {article.creator?.length > 0 &&
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
                        >
                            {article.content}
                        </Text>
                    </View>
                </ScrollView>
                {
                    showedWordModal && <BottomSheet
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onClose={() => {
                            setShownWordModal(false)
                            setSearchedWordData({})
                        }}
                        style={{
                            elevation: 8
                        }}
                    >
                        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                            <WordModal searchedword={searchedWordData} />
                        </BottomSheetScrollView>
                    </BottomSheet>
                }

            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
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
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: color.txt5,
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
