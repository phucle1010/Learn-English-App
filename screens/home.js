import React, { useState, useEffect, useMemo } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/Ionicons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addUserIntoApp } from '../reducers/userSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { getDocs, collection, updateDoc, doc, increment } from 'firebase/firestore';
import db from '../firebase';
import Statistic from './statistic'

import Loading from '../components/Loading';
import WordModal from '../components/WordModal';

import Header from '../components/Header';

const fullWidth = Dimensions.get('window').width
const wrapItemWidth = (fullWidth / 2) - 45;

const Home = ({ navigation }) => {
    const isFocusedScreen = useIsFocused();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchedWordData, setSearchedWordData] = useState({});
    const [showedWordModal, setShownWordModal] = useState(false);
    const [deviceId, setDeviceId] = useState(null);
    const [wordID, setWordID] = useState('');
    const [loaded, setLoaded] = useState(false);

    const snapPoints = useMemo(() => ['70%'], []);

    async function getDevice_Id() {
        AsyncStorage.getItem('device_id').then((uniqueId) => {
            setDeviceId(uniqueId);
        });
    }

    const getUserState = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user === null || deviceId === '') {
                AsyncStorage.setItem('user', JSON.stringify({})).then(() => {
                    navigation.navigate('Login');
                })
            } else {
                AsyncStorage.getItem('user').then((user) => {
                    const parsedUser = JSON.parse(user);
                    if (Object.keys(parsedUser).length === 0) {
                        navigation.navigate('Login');
                    } else {
                        dispatch(addUserIntoApp(parsedUser));
                        setLoaded(true);
                    }
                })
            }
        } catch (error) {
            console.log('Lỗi lấy thông tin trạng thái người dùng:', error);
        }
    };

    const handleSearchWord = async () => {
        console.log("handleSearchWord")
        const querySnapshot = await getDocs(collection(db, "VOCABULARY"));

        querySnapshot.forEach((doc) => {
            if (doc.data().word === search.toLowerCase()) {
                setSearchedWordData(doc.data());
                setWordID(doc.id);
                setShownWordModal(true);
                updatenumsearch(doc.id)
            }
        });
    };

    const updatenumsearch = async (id) => {
        const DocRef = doc(db, "VOCABULARY", id);
        const updatedocRef = await updateDoc(DocRef, {
            numsearch: increment(1)
        });
    }

    useEffect(() => {
        getDevice_Id();
    }, [])

    useEffect(() => {
        if (isFocusedScreen) {
            getUserState();
        } else {
            setSearch('');
            setSearchedWordData({})
        }
    }, [isFocusedScreen])

    return (
        <GestureHandlerRootView>
            {
                loaded ? (
                    <SafeAreaView style={styles.main}>
                        {/* <Header /> */}
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                            <View style={styles.container}>
                                <View style={styles.secsion1}>
                                    <View style={styles.headerBasic}>
                                        <View style={styles.lightMode}>
                                            <Text style={{ fontSize: 15, color: color.txt5, marginRight: 10, }}>Light Mode</Text>
                                            <SimpleIcon name='arrow-down' style={{ fontSize: 12, color: color.txt5 }} />
                                        </View>
                                        <View style={{ width: 45, height: 45, borderRadius: 10, backgroundColor: '#e0e6f3', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                style={styles.imgAccount}
                                                source={{
                                                    uri: 'https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-3d-boy-head-portrait-png-image_6514617.png',
                                                }}
                                                resizeMode='stretch'
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.headcontainer}>
                                        <Text style={styles.txthead1}>Hello {user.fullName},</Text>
                                        <Text style={styles.txthead2}>Chúc bạn có một ngày mới vui vẻ!</Text>
                                    </View>
                                </View>
                                <Text style={styles.txtContent}>Từ điển</Text>
                                <View style={styles.secsion2}>
                                    {/* <View>
                                        <Text style={styles.txtvocabulary}>Từ vựng</Text>
                                    </View> */}
                                    <View style={styles.searchcontainer}>
                                        <TextInput
                                            style={styles.search}
                                            placeholder="Nhập từ vựng"
                                            onChangeText={(input) => setSearch(input)} value={search}
                                        />
                                        <TouchableOpacity onPress={() => { handleSearchWord() }}>
                                            <Icon name='search-outline' size={28} style={{
                                                paddingRight: 10
                                            }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={styles.txtVocabularySearched}>Từ vựng tìm kiếm gần đây</Text>
                                        <View style={styles.wrapwords}>
                                            <Text style={styles.txtwords}>Hello</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.txtContent}>Khám phá</Text>
                                <View style={styles.listItem}>
                                    <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate('News')}>
                                        <Image style={styles.imgItem} source={require('../sources/images/news.png')} />
                                        <Text style={styles.txtImgItem}>Tin tức</Text>
                                        <Text style={styles.subTxtImgItemxtImgItem}>Đọc tin tức hằng ngày</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("Videos")}>
                                        <Image
                                            style={styles.imgItem}
                                            source={require('../sources/images/video-marketing.png')}
                                        />
                                        <Text style={styles.txtImgItem}>Video</Text>
                                        <Text style={styles.subTxtImgItemxtImgItem}>Video sống động và thú vị</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.wrapItems} onPress={() => { navigation.navigate("ReadBook") }}>
                                        <Image style={styles.imgItem} source={require('../sources/images/book-stack.png')} />
                                        <Text style={styles.txtImgItem}>Đọc sách</Text>
                                        <Text style={styles.subTxtImgItemxtImgItem}>Đọc sách ngoại tuyến</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("WordGroup")}>
                                        <Image style={styles.imgItem} source={require('../sources/images/dictionary.png')} />
                                        <Text style={styles.txtImgItem}>Bộ từ vựng</Text>
                                        <Text style={styles.subTxtImgItemxtImgItem}>Chủ đề phong phú</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("Grammar")}>
                                        <Image style={styles.imgItem} source={require('../sources/images/grammar.png')} />
                                        <Text style={styles.txtImgItem}>Ngữ pháp</Text>
                                        <Text style={styles.subTxtImgItemxtImgItem}>Ngữ pháp trực quan</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("Exercise")}>
                                        <Image style={styles.imgItem} source={require('../sources/images/homework.png')} />
                                        <Text style={styles.txtImgItem}>Bài tập</Text>
                                        <Text style={styles.subTxtImgItemxtImgItem}>Bài tập bổ trợ các kỹ năng</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.wrapItems}>
                                        <Image style={styles.imgItem} source={require('../sources/images/joystick.png')} />
                                        <Text style={styles.txtImgItem}>Game</Text>
                                        <Text style={styles.subTxtImgItemxtImgItem}>Chơi game giải trí</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.wrapItems} onPress={() => navigation.navigate("Test")}>
                                        <Image style={styles.imgItem} source={require('../sources/images/test.png')} />
                                        <Text style={styles.txtImgItem}>Kiểm tra</Text>
                                        <Text style={styles.subTxtImgItemxtImgItem}>Đánh giá trình độ hiện tại</Text>

                                    </TouchableOpacity>
                                </View>
                                {/* <View>
                                    <Text style={styles.txtContent}>Thống kê sử dụng</Text>
                                </View> */}
                                <View style={{
                                }}>
                                    <Statistic navigation={navigation} />
                                </View>
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
                                    <WordModal searchedword={searchedWordData} userID={user.id} wordId={wordID} />
                                </BottomSheetScrollView>
                            </BottomSheet>
                        }
                    </SafeAreaView>
                ) : <Loading />
            }

        </GestureHandlerRootView>

    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#f2f5fc',
        height: '100%',
    },
    scrollContainer: {
        marginTop: 1,
    },
    container: {

    },
    secsion1: {
        paddingTop: 20,
        width: '100%',
        backgroundColor: color.btn_color3,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerBasic: {
        width: '100%',
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lightMode: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: color.txt5,
        borderRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: 10
    },
    headcontainer: {
        marginTop: 30,
        marginBottom: 40,
        width: '100%',
        paddingHorizontal: 30,
    },
    txthead1: {
        marginBottom: 6,
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
        width: 35,
        height: 35,
    },
    txtContent: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txt1,
        marginTop: 30,
        marginHorizontal: 30,
        marginBottom: 10,
    },
    secsion2: {
        marginHorizontal: 30,
        marginTop: 10,
        paddingVertical: 20,
        backgroundColor: color.btn_color3,
        borderRadius: 20,
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
        paddingHorizontal: 30,
        backgroundColor: color.btn_color3,
        borderRadius: 10,
    },
    listItem: {
        marginTop: -20,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    wrapItems: {
        padding: 20,
        backgroundColor: color.btn_color3,
        width: wrapItemWidth,
        height: wrapItemWidth,
        marginTop: 30,
        borderRadius: 20,
        justifyContent: 'center'
    },
    imgItem: {
        width: 35,
        height: 35,
        marginBottom: 10,
    },
    txtImgItem: {
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        fontSize: 16,
        fontWeight: 'bold'
    },
    subTxtImgItem: {
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt5,
        fontSize: 16,
        fontWeight: 300
    },
    chart: {
        width: '100%',
        height: 232,
    },
});

export default Home;
