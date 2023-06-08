import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import Sound from 'react-native-sound'


const WordModal = ({ searchedword }) => {
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
                <TouchableOpacity style={{
                    width: 135,
                    height: 36,
                    backgroundColor: '#FB6F43',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
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