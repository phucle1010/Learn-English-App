import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import db from '../firebase';
import Sound from 'react-native-sound';
import { collection, query, where, getDocs, getDoc, doc } from '../firebase';

const Words = (props) => {
    const { navigation, route } = props;
    const word = route.params.item;
    const [idioms, setIdioms] = useState([]);
    const [level, setLevel] = useState();

    const loadLevel = async () => {
        try {
            console.log(word.level_id);
            if (word.level_id) {
                const docRef = doc(db, "LEVEL_ENG", word.level_id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docSnap.data());
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

    const sound1 = new Sound(word.phonetics[0]?.audio, null, (error) => {
        if (error) {
            // Xử lý lỗi nếu có
            console.log('failed to load the sound', error);
            return;
        }
    });

    const sound2 = new Sound(word.phonetics[1]?.audio, null, (error) => {
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
            console.log(word.idiom);
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
                console.log(idioms);
                setIdioms(idioms);
            } else {
                setIdioms([]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        loadLevel();
        loadIdioms();
    }, [word]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                </TouchableOpacity>
                <View style={styles.wordcontainer}>
                    <Text style={styles.word}>{word.word}</Text>
                    <TouchableOpacity style={styles.btnsave}>
                        <Text style={styles.txtbtnsave}>Lưu từ vựng</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtspell}>{word.phonetic}</Text>
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
                <View>
                    <Text style={styles.txtcontent}>Nghĩa của từ</Text>
                    {word.meaning?.map((mea, index) =>
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
                                {mea.synonyms?.map((syn, index2) => <Text style={styles.txtmean} key={index2}>{syn + ', '}</Text>)}
                            </View>
                            <Text style={styles.txtsynonyms}>Từ trái nghĩa</Text>
                            <View>
                                {mea.antonyms?.map((syn, index2) => <Text style={styles.txtmean} key={index2}>{syn}</Text>)}
                            </View>

                        </View>
                    )}
                    <Text style={styles.txtcontent}>Từ ghép</Text>
                    <View>
                        {word.collocations?.map((col, index) => <Text style={styles.txtmean} key={index}>{col}</Text>)}
                    </View>
                    <Text style={styles.txtcontent}>Cụm động từ</Text>
                    <View>
                        {word.phrase_verb?.map((phv, index) =>
                            <View key={index}>
                                <Text style={styles.txtmean} >cụm động từ: {phv.phrase}</Text>
                                <Text style={styles.txtmean} >ex: {phv.example}</Text>
                                <Text style={styles.txtmean} >Nghĩa: {phv.meaning}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.txtcontent}>Thành ngữ</Text>
                    {idioms?.map((idiom, index) =>
                        <View key={index}>
                            <Text style={styles.txtmean} >phrase: {idiom.phrase}</Text>
                            <Text style={styles.txtmean} >example: {idiom.example}</Text>
                            <Text style={styles.txtmean} >meaning: {idiom.meaning}</Text>
                        </View>
                    )}
                    <Text style={styles.txtcontent}>Level</Text>
                    <View>
                        <Text style={styles.txtmean} >Level name: {level?.name}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 22,
    },
    wordcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 346,
        height: 110,
        paddingHorizontal: 20,
        //backgroundColor: color.btn_color3,
        justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 15,
        //elevation: 1,
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
    // meanwordcontainer: {
    //   width: 346,
    //   height: 93,
    //   paddingHorizontal: 20,
    //   backgroundColor: color.btn_color3,
    //   borderRadius: 10,
    //   marginTop: 15,
    //   elevation: 1,
    // },
    txtcontent: {
        paddingTop: 14,
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
        paddingLeft: 5,
        fontSize: 16,
        color: '#000000'
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
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
        marginTop: 8,
        paddingLeft: 10,
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
});

export default Words;
