import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import color from '../contains/color';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import db, { collection, addDoc, getDocs, doc, where, query, deleteDoc } from '../firebase';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const widthImage = 160;
const positionHozitalOfImage = (width - widthImage) / 2;

const DetailReadBook = ({ navigation, route }) => {
    const isFocusedScreen = useIsFocused();
    const { itembook, prevScreen } = route.params
    const user = useSelector(state => state.user)
    const [userID, setUserID] = useState('');
    const [likedBook, setLikedBook] = useState(false)
    const [existedBookDocument, setExistedBookDocument] = useState(false)
    const [toggleActionBook, setToggleActionBook] = useState(false)

    const getUserID = async () => {
        const querySnapshot = await getDocs(collection(db, "USER"));
        querySnapshot.forEach((doc) => {
            if (doc.data().id === user.id) {
                setUserID(doc.id);
            }
        });
    };

    useEffect(() => {
        if (isFocusedScreen) {
            getUserID();
            checkSavedBook();
        }
    }, [isFocusedScreen, toggleActionBook])

    // console.log(itembook)
    // const detail

    const saveBook = async () => {
        if (!likedBook) {
            try {
                const userRef = doc(db, 'USER', userID);
                const bookCollectionRef = collection(userRef, 'MY_BOOK');
                await addDoc(bookCollectionRef, { ...itembook });
                // Alert.alert('Thông báo', 'Sách đã được lưu thành công')
                setToggleActionBook(prev => !prev)
            } catch (error) {
                console.log('Lỗi khi lưu sách:', error);
            }
        } else {
            if (existedBookDocument) {
                deleteBook(userID, itembook.book_id)
            }
        }
    };

    const deleteBook = async (userId, bookId) => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', user.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const mybookCollectionRef = collection(userDoc.ref, 'MY_BOOK');
                const bookQuerySnapshot = await getDocs(mybookCollectionRef);

                const savedBooks = bookQuerySnapshot.docs.map((doc) => ({
                    book_document_id: doc.id,
                    ...doc.data()
                }));

                const savedBookInfo = savedBooks.filter(book => book.book_id === bookId)[0];
                const deletedBookId = savedBookInfo.book_document_id;

                const userDocRef = doc(db, 'USER', userId);
                const bookDocRef = doc(userDocRef, 'MY_BOOK', deletedBookId);
                await deleteDoc(bookDocRef);
                // Alert.alert('Thông báo', 'Sách đã được xóa thành công!');
                setToggleActionBook(prev => !prev)
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách từ vựng:', error);
        }
    };

    const checkSavedBook = async () => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', user.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const mybookCollectionRef = collection(userDoc.ref, 'MY_BOOK');
                const bookQuery = query(mybookCollectionRef, where('book_id', '==', itembook.book_id));
                const bookSnapshot = await getDocs(bookQuery);

                if (!bookSnapshot.empty) {
                    setLikedBook(true);
                    setExistedBookDocument(true)
                    console.log('Sách đã được lưu trước đó.');
                } else {
                    setLikedBook(false);
                    console.log('Sách chưa được lưu trước đó.');
                }
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra sách:', error);
        }
    }


    const displayText = (text) => {
        return text.length < 240
            ? `${text}`
            : `${text.substring(0, 238)}...`
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#a1c2f7', '#f294f1']}
                style={styles.linearContainer} />
            <TouchableOpacity
                onPress={() => navigation.navigate(prevScreen)}
                style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    top: 25,
                    left: 20,
                    zIndex: 100,
                }}
            >
                <Icon name='arrow-left' style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={saveBook}
                style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    top: 23,
                    right: 20,
                    zIndex: 100,
                }}
            >
                {
                    likedBook ? <IonIcon name='heart' style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }} /> : <IonIcon name='heart-outline' style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }} />
                }
            </TouchableOpacity>

            {/* New design */}
            <View style={styles.mainContent}>
                <Image style={styles.imgbook} source={{ uri: "https://edtechbooks.org/book_cover_images/" + itembook.cover_image_lg }} resizeMode='stretch' />
                <View
                    style={{
                        paddingHorizontal: 30,
                    }}
                >
                    <Text style={styles.txtbook} numberOfLines={3}>{itembook.title}</Text>
                    {
                        itembook.subtitle && <Text style={styles.txtauthor} numberOfLines={3}>{itembook.subtitle}</Text>
                    }
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ ...styles.viewItem, backgroundColor: '#f66' }}>
                            <IonIcon name='download-outline' size={23} color={'#fff'} style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>{itembook.pdf_downloads}</Text>
                        </View>
                        <View style={{ ...styles.viewItem, backgroundColor: '#ff8f61' }}>
                            <IonIcon name='eye-outline' size={23} color={'#fff'} style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>{itembook.page_views}</Text>
                        </View>
                        <View style={{ ...styles.viewItem, backgroundColor: '#ff4571' }}>
                            <IonIcon name='pencil-outline' size={23} color={'#fff'} style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>{itembook.minor_version}</Text>
                        </View>
                    </View>
                    <Text style={[styles.txtauthor, { marginTop: 15, fontSize: 16, lineHeight: 22 }]}>{displayText(itembook.abstract.replace(/<\/?p>/gi))}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={styles.btnQuickView}
                            onPress={() => navigation.navigate('DetailBook', { idBook: itembook.book_id, itembook })}
                        >
                            <Text style={styles.txtbtnQuickView}>Tải sách</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{ ...styles.btnQuickView, backgroundColor: '#fff', borderColor: '#118b9e' }}>
                            <Text style={{ ...styles.txtbtnQuickView, color: '#118b9e' }}>Lưu sách</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#8fd2d9'
    },
    linearContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#4d53e3'
    },
    mainContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '70%',
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    imgbook: {
        position: 'absolute',
        top: '-25%',
        left: positionHozitalOfImage,
        // transform: [{ translateX: -75 }],
        width: widthImage,
        height: 230,
        borderRadius: 10,
        zIndex: 100,
    },
    txtbook: {
        marginTop: '38%',
        fontSize: 18,
        color: color.txt1,
        fontWeight: 500,
    },
    txtauthor: {
        marginTop: 5,
        fontSize: 15,
    },
    viewItem: {
        marginTop: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#f66',
        alignSelf: 'flex-start',
    },
    btnQuickView: {
        paddingVertical: 8,
        paddingHorizontal: 30,
        backgroundColor: '#5fc9cd',
        borderRadius: 100,
        marginTop: 13,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    txtbtnQuickView: {
        fontSize: 17,
        color: color.txtbtn_color1,
    },
});

export default DetailReadBook;
