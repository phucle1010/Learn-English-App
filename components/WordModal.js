import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import Sound from 'react-native-sound';
import React, { useState, useEffect } from 'react';
import db, { collection, addDoc, getDocs, doc, where, query } from '../firebase';

const WordModal = (props) => {
    const [userID, setUserID] = useState('');
    const [vocabularySaved, setVocabularySaved] = useState(false);
    const searchedword = props.searchedword;
    const userId = props.userID;
    const wordID = props.wordId;
    const word = props.searchedword.word;

    Sound.setCategory('Playback', true);

    const playSound = (index) => {
        const sound = searchedword.phonetics[index]?.audio || searchedword.phonetics[0].audio;
        const whoosh = new Sound(sound, Sound.MAIN_BUNDLE, (err) => {
            if (err) {
                Alert.error("Error when access voice", err.toString());
            }
            whoosh.setVolume(2);
            whoosh.play()
        })
    }

    useEffect(() => {
        getUserID();
        checkVocabularySaved();
    }, [])

    const getUserID = async () => {
        const querySnapshot = await getDocs(collection(db, "USER"));
        querySnapshot.forEach((doc) => {
            if (doc.data().id === userId) {
                setUserID(doc.id);
            }
        });
        console.log(userID);
    };

    const saveUserVocabulary = async () => {
        if (!vocabularySaved) {
            try {
                const userRef = doc(db, 'USER', userID);
                const vocabularyCollectionRef = collection(userRef, 'MY_VOCABULARY');
                const newVocabularyRef = await addDoc(vocabularyCollectionRef, { wordID, word });
                Alert.alert('Thông báo', 'Từ vựng đã được lưu thành công')
            } catch (error) {
                console.log('Lỗi khi lưu từ vựng:', error);
            }
        }
        else {
            Alert.alert('Thông báo', 'Từ vựng đã được lưu sẵn')
        }

    };

    const checkVocabularySaved = async () => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const myVocabularyCollectionRef = collection(userDoc.ref, 'MY_VOCABULARY');
                const vocabularyQuery = query(myVocabularyCollectionRef, where('wordID', '==', wordID));
                const vocabularySnapshot = await getDocs(vocabularyQuery);

                if (!vocabularySnapshot.empty) {
                    setVocabularySaved(true);
                    console.log('Từ vựng đã được lưu trước đó.');
                } else {
                    setVocabularySaved(false);
                    console.log('Từ vựng chưa được lưu trước đó.');
                }
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra từ vựng:', error);
        }
    }

    return (
        <View style={{
            marginTop: 10,
            paddingHorizontal: 20,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 28,
                }}>
                    {searchedword.word.replace(searchedword.word[0], searchedword.word[0].toUpperCase())}
                </Text>
                <TouchableOpacity
                    style={{
                        width: 135,
                        height: 36,
                        backgroundColor: '#FB6F43',
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={saveUserVocabulary}
                >
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,

                    }}>Lưu từ vựng</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 300,
                    fontSize: 20
                }}>{searchedword.phonetic}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 20,
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginRight: 3,
                        }}>UK</Text>
                        <TouchableOpacity onPress={() => playSound(0)}>
                            <Image source={require('../sources/icons/volumehigh.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginRight: 3,
                        }}>US</Text>
                        <TouchableOpacity onPress={() => playSound(1)}>
                            <Image source={require('../sources/icons/volumehigh.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text style={{
                marginTop: 10,
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 20,
            }}>Nghĩa của từ</Text>
            <View style={{
                marginTop: 10,
            }}>
                {
                    searchedword.meaning.map((type, index) => (
                        <View key={index}>
                            <Text style={{
                                marginRight: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 3,
                                alignSelf: 'flex-start',
                                backgroundColor: '#ffff',
                                color: '#bebebe',
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: '#bebebe',
                                fontSize: 16
                            }}>{type.partOfSpeech}</Text>
                            <Text style={{
                                marginTop: 8,
                                marginBottom: 20,
                                paddingLeft: 10,
                                fontSize: 16
                            }}>{type.definitions[0]}</Text>
                        </View>
                    ))
                }
            </View>

        </View>
    )

}

export default WordModal;