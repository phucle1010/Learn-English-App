import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, ScrollView, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import DetailWordGroupItem from '../components/DetailWordGroupItem';
import { getDocs, collection } from 'firebase/firestore';
import db from '../firebase';
import Sound from 'react-native-sound';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window')


const DetailWordGroup = (props) => {
    const { navigation, route } = props
    const [dataVocabulary, setDataVocabulary] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const handleGetVocabulary = async () => {
            try {
                setIsLoading(true)
                const querySnapshot = await getDocs(collection(db, "VOCABULARY"));
                const newData = []
                querySnapshot.forEach((doc) => {
                    if (doc.data().topic_id) {
                        if (doc.data().topic_id.trim() === route.params.item.id.trim()) {
                            const docData = doc.data();
                            const dataWithId = { ...docData, id: doc.id };
                            newData.push(dataWithId);
                        }
                    }
                });
                setDataVocabulary(newData)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }
        handleGetVocabulary();
    }, [route.params.item.id])

    const PlayTrack = (word, type) => {
        const track = new Sound(`https://api.dictionaryapi.dev/media/pronunciations/en/${word}-${type}.mp3`, null, (e) => {
            if (e) {
                console.log('error loading track:', e)
            } else {
                track.play()
            }
        })
    }
    const searchData = dataVocabulary.filter(item => item.word.toLowerCase().includes(search.toLowerCase()))
    return (
        <View style={styles.container}>
            <View style={styles.headcontainer}>
                <TouchableOpacity onPress={() => navigation.navigate("WordGroup")}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                </TouchableOpacity>
                <Text style={styles.txthead}>Bộ từ vựng</Text>
                <View></View>
            </View>
            <View style={styles.searchcontainer}>
                <TextInput onChangeText={(i) => setSearch(i)} value={search} style={styles.search} placeholder="Tìm kiếm từ vựng" placeholderTextColor={'#AAAAAA'} />
                <TouchableOpacity>
                    <Icon name='search-outline' size={28} style={{ paddingRight: 10 }} />
                </TouchableOpacity>
            </View>
            {isLoading
                ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Lottie
                        source={{ uri: 'https://assets5.lottiefiles.com/packages/lf20_p8bfn5to.json' }}
                        autoPlay
                        loop
                    />
                </View>
                : <FlatList
                    scrollEnabled={false}
                    data={searchData}
                    renderItem={({ item }) => <DetailWordGroupItem
                        phonetic={item.phonetic}
                        onPressUK={() => PlayTrack(item.word.trim(), 'uk')}
                        onPressUS={() => PlayTrack(item.word.trim(), 'us')}
                        disUK={item.phonetics.some(obj => obj.audio.includes("uk.mp3"))}
                        disUS={item.phonetics.some(obj => obj.audio.includes("us.mp3"))}
                        word={item.word} />}
                    keyExtractor={item => item.id}
                />}

        </View>
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
        backgroundColor: color.btn_color3,
        height: 80,
        width: width,
        justifyContent: 'space-between',
        paddingHorizontal: 38
    },
    imgreturn: {
        width: 30,
        height: 30,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: color.txt5,
    },
    searchcontainer: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        width: width - 44,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: color.bodercolor3,
        alignItems: 'center',
    },
    search: {
        flex: 1,
        paddingHorizontal: 20,
        fontSize: 16,
        fontStyle: 'italic',
        color: '#333',
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 15,
    },

});

export default DetailWordGroup;