import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, ScrollView, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import DetailWordGroupItem from '../components/DetailWordGroupItem';
import { getDocs, collection } from 'firebase/firestore';
import db from '../firebase';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { useIsFocused } from '@react-navigation/native';

import Loading from '../components/Loading';

const { width } = Dimensions.get('window')

const DetailWordGroup = (props) => {
    const isFocusedScreen = useIsFocused();
    const { navigation, route } = props
    const [dataVocabulary, setDataVocabulary] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const topic = route.params.item

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

    useEffect(() => {
        handleGetVocabulary();
    }, [])

    useEffect(() => {
        if (!isFocusedScreen) {
            setSearch('')
        } else {
            handleGetVocabulary();
        }
    }, [route.params.item, isFocusedScreen])

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

    const handlePressWord = (item) => {
        navigation.navigate('Words', { item, topic, prevScreen: 'DetailWordGroup' })
    }

    return (
        <React.Fragment>
            {
                isLoading ? <Loading /> : (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    left: 20,
                                    height: '100%',
                                    justifyContent: 'center',
                                }}
                                onPress={() => navigation.navigate("WordGroup")}
                            >
                                <SimpleIcon name='arrow-left' size={20} color={color.txt5} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Bộ từ vựng</Text>
                        </View>
                        <View style={styles.searchcontainer}>
                            <TextInput onChangeText={(i) => setSearch(i)} value={search} style={styles.search} placeholder="Tìm kiếm từ vựng" placeholderTextColor={'#AAAAAA'} />
                            <TouchableOpacity>
                                <Icon name='search-outline' size={28} style={{ paddingRight: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            scrollEnabled={false}
                            data={searchData}
                            renderItem={({ item }) => (
                                <DetailWordGroupItem
                                    phonetic={item.phonetic}
                                    onPressUK={() => PlayTrack(item.word.trim(), 'uk')}
                                    onPressUS={() => PlayTrack(item.word.trim(), 'us')}
                                    disUK={item.phonetics.some(obj => obj.audio.includes("uk.mp3"))}
                                    disUS={item.phonetics.some(obj => obj.audio.includes("us.mp3"))}
                                    word={item.word}
                                    onPress={() => handlePressWord(item)} />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                )
            }
        </React.Fragment>

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
        justifyContent: 'center',
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