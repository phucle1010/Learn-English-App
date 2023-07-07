import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, TouchableHighlightComponent, Alert } from 'react-native';
import color from '../contains/color';
import fontStyle from '../contains/fontStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import db, { collection, getDocs, doc, deleteDoc, where, query, getDoc } from '../firebase';

import Header from '../components/Header';
import Loading from '../components/Loading'

const WordItem = ({ item, onPress, onNavigate }) => {
    return <View style={styles.wrapwords} >
        <Text style={styles.txtWord}>{item.word}</Text>
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={onNavigate}>
                <Icon name='eye' style={{ ...styles.removeIcon, color: '#FAA0A0' }} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.wrapbtn}
                onPress={onPress}
            >
                <Icon name='trash' style={styles.removeIcon} />
            </TouchableOpacity>
        </View>
    </View>
}

const BookItem = ({ item, onPress, displayText, onNavigate }) => {
    function formattedDate() {
        const newDate = new Date(Date.parse(item.last_updated))
        const date = newDate?.getDate();
        const month = newDate?.getMonth() + 1;
        const year = newDate?.getUTCFullYear();
        const fullDate = `${date}-${month}-${year}`;
        return fullDate;
    }


    return <View style={{ ...styles.wrapItem, height: 200 }}>
        <View style={styles.detailContainer}>
            <Text
                style={{
                    marginBottom: 5,
                    paddingVertical: 3,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    backgroundColor: '#efefef',
                    alignSelf: 'flex-start'
                }}
            >
                {formattedDate()}
            </Text>
            <Text style={styles.txtname}>{displayText(item?.title, 'book')}</Text>
            <Text>{displayText(item?.subtitle, 'bookSubTitle')}</Text>
            <View style={{ flex: 1, marginTop: 10, justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={{
                        ...styles.wrapbtn,
                        backgroundColor: '#FAA0A0',
                        paddingVertical: 6,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={onPress}
                >
                    <Icon name='trash' style={{ ...styles.removeIcon, color: '#fff', fontSize: 15, marginRight: 5 }} />
                    <Text style={{ color: '#fff', fontSize: 15 }}>Bỏ yêu thích</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        ...styles.wrapbtn,
                        borderWidth: 1,
                        borderColor: '#FAA0A0',
                        backgroundColor: '#ffffff',
                        paddingVertical: 6,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={onNavigate}
                >
                    <Text style={{ color: '#FAA0A0', fontSize: 15 }}>Xem ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Image style={styles.img} source={{ uri: "https://edtechbooks.org/book_cover_images/" + item.cover_image_lg }} resizeMode='stretch' />

    </View>
}

const VideoItem = ({ item, displayText, onNavigate }) => {
    return (
        <View style={{ ...styles.wrapItem, flexDirection: 'column', width: 250, marginHorizontal: 10 }}>
            <View>
                <Image style={{ ...styles.img, height: 200, width: 250 }} source={{ uri: item.snippet.thumbnails.medium.url }} resizeMode='stretch' />
                <TouchableOpacity
                    style={{
                        ...styles.wrapbtn,
                        backgroundColor: '#FAA0A0',
                        alignSelf: 'flex-start',
                        padding: 10,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: 10,
                        right: -10
                    }}
                    onPress={onNavigate}
                >
                    <Icon name='play' style={{ ...styles.removeIcon, color: '#fff', fontSize: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.txtname}>{displayText(item?.snippet?.title, 'video')}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text>{item?.snippet?.channelTitle}</Text>
                </View>
            </View>
        </View>
    )
}

const Library = ({ navigation }) => {
    const isFocusedScreen = useIsFocused();
    const user = useSelector(state => state.user)
    const [savedVocabularies, setSavedVocabularies] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [savedVideos, setSavedVideos] = useState([]);
    const [userID, setUserID] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (isFocusedScreen) {
            getUserID();
            getSavedVocabularies();
            getSavedBooks();
            getSavedVideos();
            setLoaded(true);
        }
    }, [isFocusedScreen])

    const getUserID = async () => {
        const querySnapshot = await getDocs(collection(db, "USER"));
        querySnapshot.forEach((doc) => {
            if (doc.data().id === user.id) {
                setUserID(doc.id);
            }
        });
    };

    const getSavedVocabularies = async () => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', user.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const myVocabularyCollectionRef = collection(userDoc.ref, 'MY_VOCABULARY');
                const vocabularyQuerySnapshot = await getDocs(myVocabularyCollectionRef);

                const savedVocabularies = vocabularyQuerySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSavedVocabularies(savedVocabularies);
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách từ vựng:', error);
        }
    };

    const deleteVocabulary = async (userId, vocabularyId) => {
        try {
            const userDocRef = doc(db, 'USER', userId);
            const vocabularyDocRef = doc(userDocRef, 'MY_VOCABULARY', vocabularyId);

            await deleteDoc(vocabularyDocRef);
            Alert.alert('Thông báo', 'Từ vựng đã được xóa khỏi thư viện thành công!');
            getSavedVocabularies();
        } catch (error) {
            console.error('Lỗi khi xóa từ vựng:', error);
        }
    };

    const handleNavigateWord = async (id) => {
        const wordCollectionRef = collection(db, 'VOCABULARY');
        const vocabularyQuerySnapshot = await getDocs(wordCollectionRef);
        const word = vocabularyQuerySnapshot.docs.filter((word) => word.id === id)[0].data();
        navigation.navigate('Words', { item: word, topic: '', prevScreen: 'Library' })
    }

    const getSavedBooks = async () => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', user.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const myBookCollectionRef = collection(userDoc.ref, 'MY_BOOK');
                const bookQuerySnapshot = await getDocs(myBookCollectionRef);
                const savedBooks = bookQuerySnapshot.docs.map((doc) => ({
                    book_document_id: doc.id,
                    ...doc.data()
                }));
                setSavedBooks(savedBooks);
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quyển sách:', error);
        }
    };

    const deleteBook = async (userId, bookId) => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', user.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const savedBookInfo = savedBooks.filter(book => book.book_id === bookId)[0];
                const deletedBookId = savedBookInfo.book_document_id;

                const userDocRef = doc(db, 'USER', userId);
                const bookDocRef = doc(userDocRef, 'MY_BOOK', deletedBookId);
                await deleteDoc(bookDocRef);
                Alert.alert('Thông báo', 'Sách đã được gỡ khỏi danh sách yêu thích!');
                getSavedBooks();
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách từ vựng:', error);
        }
    };

    const getSavedVideos = async () => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', user.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const myVideoCollectionRef = collection(userDoc.ref, 'MY_VIDEO');
                const videoQuerySnapshot = await getDocs(myVideoCollectionRef);
                const savedVideos = videoQuerySnapshot.docs.map((doc) => ({
                    video_document_id: doc.id,
                    ...doc.data()
                }));
                setSavedVideos(savedVideos);
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quyển sách:', error);
        }
    };

    const displayText = (text, type) => {
        switch (type) {
            case 'news':
                return text?.length < 35 ? `${text}` : `${text.substring(0, 32)}...`
            case 'book':
                return text?.length < 35 ? `${text}` : `${text.substring(0, 32)}...`
            case 'bookSubTitle':
                return text?.length < 20 ? `${text}` : `${text.substring(0, 18)}...`
            case 'video':
                return text?.length < 25 ? `${text}` : `${text.substring(0, 23)}...`
            default:
                break;
        }

    }

    return (
        <SafeAreaView style={styles.main}>
            <Header />
            {
                loaded ? <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        {/* Word */}
                        {
                            savedVocabularies.length > 0 && (
                                <React.Fragment>
                                    <View style={styles.containerWordGroup}>
                                        <Text style={styles.txtwordGroup} >Từ vựng đã lưu</Text>
                                    </View>
                                    {
                                        savedVocabularies.map((word, index) => (
                                            <WordItem key={index} item={word} onPress={() => deleteVocabulary(userID, word.id)} onNavigate={() => handleNavigateWord(word.wordID)} />
                                        ))
                                    }
                                </React.Fragment>

                            )
                        }

                        {/* Book */}
                        {
                            savedBooks.length > 0 && (
                                <React.Fragment>
                                    <View style={styles.containerWordGroup}>
                                        <Text style={styles.txtwordGroup} >Sách yêu thích</Text>
                                    </View>
                                    {
                                        savedBooks.map((book, index) => (
                                            <BookItem key={index} item={book} onPress={() => deleteBook(userID, book.id)} onNavigate={() => { navigation.navigate('DetailReadBook', { itembook: book, prevScreen: 'Library' }) }} displayText={displayText} />
                                        ))
                                    }
                                </React.Fragment>

                            )
                        }

                        {
                            savedVideos.length > 0 && (
                                <React.Fragment>
                                    <View style={styles.containerWordGroup}>
                                        <Text style={styles.txtwordGroup} >Video yêu thích</Text>
                                    </View>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ alignSelf: 'flex-start', marginHorizontal: -10 }}>
                                        {
                                            savedVideos.map((video, index) => (
                                                <VideoItem key={index} item={video} onNavigate={() => navigation.navigate("DetailVideo", { video, prevScreen: 'Library' })} displayText={displayText} />
                                            ))
                                        }
                                    </ScrollView>
                                </React.Fragment>

                            )
                        }
                    </View>
                </ScrollView> : <Loading />
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        height: '100%',
    },
    scrollContainer: {
        marginTop: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        fontFamily: fontStyle.fontfamily_2,
        fontSize: 20,
        marginLeft: 80,
        color: color.txt5,
    },
    containerWordGroup: {
        width: '100%',
        alignItems: 'flex-start',
    },
    txtwordGroup: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 'bold',
        color: color.txt4,
        marginTop: 30,
        marginBottom: 20,
    },
    wrapwords: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        elevation: 2,
    },
    txtWord: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 600,
        color: color.txt1,
        marginLeft: 20,
    },
    wrapbtn: {
        marginRight: 20,
    },
    removeIcon: {
        fontSize: 24,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_2,
        color: color.btn_color4,
    },
    wrapItem: {
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 20,
        backgroundColor: color.btn_color3,
        alignItems: 'center',
        // overflow: 'hidden',
    },
    img: {
        width: 150,
        height: '100%',
        borderRadius: 20,
    },
    detailContainer: {
        marginTop: 10,
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

export default Library;
