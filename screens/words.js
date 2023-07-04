import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import db from '../firebase';
import Sound from 'react-native-sound';
import { collection, query, where, getDocs, getDoc, doc } from '../firebase';

import Loading from '../components/Loading'
import { useIsFocused } from '@react-navigation/native';

const Words = (props) => {
    const isFocusedScreen = useIsFocused();
    const { navigation, route } = props;
    const word = route.params.item;
    const topic = route.params.topic;
    const [idioms, setIdioms] = useState([]);
    const [level, setLevel] = useState(null);
    const [loaded, setLoaded] = useState(false)

    const loadLevel = async () => {
        try {
            if (word.level_id) {
                const docRef = doc(db, "LEVEL_ENG", word.level_id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setLevel(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } else {
                setLevel();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const sound1 = new Sound(word?.phonetics[0]?.audio, null, (error) => {
        if (error) {
            // Xử lý lỗi nếu có
            console.log('failed to load the sound', error);
            return;
        }
    });

    const sound2 = new Sound(word?.phonetics[1]?.audio || word?.phonetics[0]?.audio, null, (error) => {
        if (error) {
            // Xử lý lỗi nếu có
            console.log('failed to load the sound', error);
            return;
        }
    });

    // Hàm xử lý sự kiện click vào icon 1
    const handleIcon1Click = () => {
        // Phát đoạn âm thanh
        sound1.play((success) => {
            if (!success) {
                console.log('playback failed due to audio decoding errors');
            }
        });
    }

    // Hàm xử lý sự kiện click vào icon 2
    const handleIcon2Click = () => {
        // Phát đoạn âm thanh
        sound2.play((success) => {
            if (!success) {
                console.log('playback failed due to audio decoding errors');
            }
        });
        console.log(word.phonetics[1]?.audio);
    }

    const loadIdioms = async () => {
        try {
            if (word.idiom?.length > 0) {
                const querySnapshot = await getDocs(collection(db, "IDIOM"));
                const idioms = [];
                querySnapshot.forEach((doc) => {
                    if (word.idiom.includes(doc.id)) {
                        const docData = doc.data();
                        const dataWithId = { ...docData, id: doc.id };
                        idioms.push(dataWithId);
                    }
                });
                setIdioms(idioms);
                setLoaded(true)
            } else {
                setIdioms([]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (isFocusedScreen) {
            loadLevel();
            loadIdioms();
        } else {
            setIdioms([])
            setLevel(null)
        }
    }, [word, isFocusedScreen]);

    return (
        <React.Fragment>
            {
                loaded ? (
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                            <TouchableOpacity style={{ position: 'absolute', top: 8, left: 10 }} onPress={() => navigation.navigate('DetailWordGroup', { item: topic })}>
                                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20 }}>Chi tiết từ vựng</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.wordcontainer}>
                                <View>
                                    <Text style={styles.word}>{word.word}</Text>
                                    <Text style={styles.txtspell}>{word.phonetic}</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={styles.btnsave}>
                                        <Text style={styles.txtbtnsave}>Lưu từ vựng</Text>
                                    </TouchableOpacity>

                                    <View style={styles.soundcontainer}>
                                        <Text style={styles.txticon}>UK</Text>
                                        <TouchableOpacity onPress={() => handleIcon1Click()}>
                                            <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                                        </TouchableOpacity>
                                        <Text style={styles.txticon}>US</Text>
                                        <TouchableOpacity onPress={() => handleIcon2Click()}>
                                            <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                                <Text style={{ ...styles.txtcontent, marginTop: 0 }}>Nghĩa của từ</Text>
                                {loaded && word.meaning?.map((mea, index) =>
                                    <View key={index}>
                                        <View style={styles.wraptype}>
                                            <Text style={styles.txttype}>{mea.partOfSpeech}</Text>
                                        </View>
                                        {mea.definitions?.map((def, index1) =>
                                            <Text key={index1} style={styles.txtmean}>{def}</Text>
                                            // <Text style={styles.txtmean}>Mở, ngỏ, mở rộng, không hạn chế, không cấm</Text>
                                        )}
                                        <Text style={styles.txtsynonyms}>Từ đồng nghĩa</Text>
                                        <View style={styles.containersynomyms}>
                                            {mea.synonyms?.map((syn, index2) => <Text style={{ ...styles.txtmean, ...styles.wordItem }} key={index2}>{syn}</Text>)}
                                        </View>
                                        <Text style={styles.txtsynonyms}>Từ trái nghĩa</Text>
                                        <View>
                                            {mea.antonyms?.map((syn, index2) => <Text style={{ ...styles.txtmean, ...styles.wordItem }} key={index2}>{syn}</Text>)}
                                        </View>

                                    </View>
                                )}
                                <Text style={styles.txtcontent}>Từ ghép</Text>
                                <View>
                                    {word.collocations?.map((col, index) => <Text style={{ ...styles.txtmean, ...styles.wordItem }} key={index}>{col}</Text>)}
                                </View>
                                <Text style={styles.txtcontent}>Cụm động từ</Text>
                                <View>
                                    {word.phrase_verb?.map((phv, index) =>
                                        <View key={index}>
                                            <Text style={{ ...styles.txtmean, ...styles.wordItem }} >{phv.phrase}</Text>
                                            <Text style={{ ...styles.txtmean }} >Ex: {phv.example}</Text>
                                            <Text style={{ ...styles.txtmean }} >Meaning: {phv.meaning}</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.txtcontent}>Thành ngữ</Text>
                                {idioms?.map((idiom, index) =>
                                    <View key={index}>
                                        <Text style={{ ...styles.txtmean, backgroundColor: '#efefef', paddingVertical: 4, paddingHorizontal: 15, borderRadius: 20, marginRight: 10, alignSelf: 'flex-start' }} >{idiom.phrase}</Text>
                                        <Text style={{ ...styles.txtmean }} >Ex: {idiom.example}</Text>
                                        <Text style={{ ...styles.txtmean }} >Meaning: {idiom.meaning}</Text>
                                    </View>
                                )}
                                <Text style={styles.txtcontent}>Cấp độ của từ</Text>
                                <View>
                                    <Text style={styles.txtmean}>Mức độ: {level?.name}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                ) : <Loading />
            }
        </React.Fragment>

    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 20,
        backgroundColor: '#FFFFFF',
    },
    wordcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 346,
        height: 110,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 15,
    },
    word: {
        fontSize: 28,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        paddingTop: 10,
        fontWeight: 'bold',
    },
    btnsave: {
        width: 114,
        height: 31,
        backgroundColor: color.btn_color4,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginLeft: 80,
    },
    txtbtnsave: {
        fontSize: 14,
        fontFamily: fontstyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    txtspell: {
        fontSize: 16,
        paddingTop: 10,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt4,
    },
    soundcontainer: {
        flexDirection: 'row',
    },
    iconsound: {
        width: 24,
        height: 24,
        marginTop: 10,
        marginRight: 10,
    },
    txticon: {
        fontSize: 16,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        marginHorizontal: 10,
        paddingTop: 10,
        fontWeight: 500,
    },
    txtcontent: {
        marginTop: 40,
        fontSize: 18,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        fontWeight: 'bold',
    },
    wraptype: {
        width: 68,
        height: 24,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: color.bodercolor3,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10,
    },
    txtsynonyms: {
        marginTop: 10,
        paddingLeft: 5,
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
        color: color.txt1,
    },
    containersynomyms: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    txtitemsynonyms: {

    },

    txttype: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt5,
        textAlign: 'center',
    },
    txtmean: {
        fontSize: 16,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
        marginTop: 8,
        paddingLeft: 10,
        lineHeight: 20,
        textAlign: 'justify'
    },
    forexample: {
        marginTop: 10,
        flexDirection: 'row',
    },
    txtforexample: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_1,
        textDecorationLine: 'underline',
        marginRight: 30,
    },
    txtExEnglish: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt6,
    },
    txtExVietnamese: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
    },
    imgreturn: {
        width: 30,
        height: 30,
    },
    wordItem: {
        backgroundColor: '#efefef',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 10,
        alignSelf: 'flex-start'
    }
});

export default Words;