import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, TouchableHighlightComponent, Alert } from 'react-native';
import color from '../contains/color';
import fontStyle from '../contains/fontStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import db, { collection, getDocs, doc, deleteDoc, where, query } from '../firebase';

import Header from '../components/Header';

const WordItem = ({ item, onPress }) => {
    return <View style={styles.wrapwords} >
        <Text style={styles.txtWord}>{item.word}</Text>
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginRight: 10 }} >
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

const NewsItem = ({ displayText }) => {
    return <View style={{ ...styles.wrapItem, height: 170 }}>
        <View style={styles.detailContainer}>
            <Text style={{ marginBottom: 5, paddingVertical: 3, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#dcdcdc', alignSelf: 'flex-start' }}>History</Text>
            <Text style={styles.txtname}>{displayText('Was the last battle of the American Revolution fought in India? A growing number of historians think so', 'news')}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text>Brad Lendon, </Text>
                <Text>Tue July 4, 2023</Text>
            </View>
            <TouchableOpacity style={{ ...styles.wrapbtn, backgroundColor: '#FAA0A0', alignSelf: 'flex-start', marginTop: 15, paddingVertical: 6, paddingHorizontal: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='trash' style={{ ...styles.removeIcon, color: '#fff', fontSize: 15, marginRight: 5 }} />
                <Text style={{ color: '#fff', fontSize: 15 }}>Xóa tin tức</Text>
            </TouchableOpacity>
        </View>
        <Image style={styles.img} source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/230627162557-01-last-battle-american-revolutionary-war-india-intl-hnk-ml.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp' }} />
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
            <Text style={{ marginBottom: 5, paddingVertical: 3, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#dcdcdc', alignSelf: 'flex-start' }}>{formattedDate()}</Text>
            <Text style={styles.txtname}>{displayText(item?.title, 'book')}</Text>
            <Text>{item.subtitle}</Text>
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
                    {/* <Icon name='trash' style={{ ...styles.removeIcon, color: '#fff', fontSize: 15, marginRight: 5 }} /> */}
                    <Text style={{ color: '#FAA0A0', fontSize: 15 }}>Xem ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Image style={styles.img} source={{ uri: "https://edtechbooks.org/book_cover_images/" + item.cover_image_lg }} resizeMode='stretch' />

    </View>
}

const VideoItem = ({ displayText }) => {
    return <View style={{ ...styles.wrapItem, flexDirection: 'column', width: 200 }}>
        <View>
            <Image style={{ ...styles.img, height: 200, width: 170 }} source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/230627162557-01-last-battle-american-revolutionary-war-india-intl-hnk-ml.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp' }} />
            <TouchableOpacity style={{ ...styles.wrapbtn, backgroundColor: '#FAA0A0', alignSelf: 'flex-start', padding: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10, right: -10 }}>
                <Icon name='play' style={{ ...styles.removeIcon, color: '#fff', fontSize: 15 }} />
            </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
            <Text style={styles.txtname}>{displayText('Was the last battle of the American Revolution fought in India? A growing number of historians think so', 'video')}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text>Ted-ed</Text>
            </View>
        </View>
    </View>
}

const Library = ({ navigation }) => {
    const isFocusedScreen = useIsFocused();
    const [savedVocabularies, setSavedVocabularies] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const user = useSelector(state => state.user)
    const [userID, setUserID] = useState('');

    useEffect(() => {
        if (isFocusedScreen) {
            getUserID();
            getSavedVocabularies();
            getSavedBooks();
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

    const displayText = (text, type) => {
        switch (type) {
            case 'news':
                return text.length < 35
                    ? `${text}`
                    : `${text.substring(0, 32)}...`
            case 'book':
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
        <SafeAreaView style={styles.main}>
            <Header />
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Word */}
                    {
                        savedVocabularies.length > 0 && (
                            <React.Fragment>
                                <View style={styles.containerWordGroup}>
                                    <Text style={styles.txtwordGroup} >Từ vựng đã lưu</Text>
                                </View>
                                {
                                    savedVocabularies.map((item, index) => (
                                        <WordItem key={index} item={item} onPress={() => deleteVocabulary(userID, item.id)} />
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

                    <View style={styles.containerWordGroup}>
                        <Text style={styles.txtwordGroup}>Video đã lưu</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -10 }}>
                        <VideoItem displayText={displayText} />
                        <VideoItem displayText={displayText} />
                        <VideoItem displayText={displayText} />
                    </ScrollView>
                </View>
            </ScrollView>
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
        overflow: 'hidden',
    },
    img: {
        width: 150,
        height: '100%',
        borderRadius: 20,
    },
    detailContainer: {
        marginTop: 10,
        marginLeft: 10,
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
