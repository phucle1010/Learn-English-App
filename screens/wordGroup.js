import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import WordGroupItem from '../components/WordGroupItem';
import Lottie from 'lottie-react-native';
import db, { doc, getDoc, getDocs, collection } from '../firebase/index';
import { useIsFocused } from '@react-navigation/native';

const WordGroup = (props) => {
    const isFocusedScreen = useIsFocused();
    const { navigation } = props
    const [dataTopic, setDataTopic] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const handleGetTopic = async () => {
                const querySnapshot = await getDocs(collection(db, "TOPIC"));
                const newData = []
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    const dataWithId = { ...docData, id: doc.id };
                    newData.push(dataWithId);
                });
                setDataTopic(newData)
            }
            handleGetTopic();
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }, [isFocusedScreen])

    const handlePressTopic = (item) => {
        navigation.navigate('DetailWordGroup', { item })
    }

    return (
        <View style={styles.container}>
            <View style={styles.headcontainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                </TouchableOpacity>
                <Text style={styles.txthead}>Bộ từ vựng</Text>
                <View></View>
            </View>
            <View style={styles.content}>
                <Text style={styles.txtwordGroup}>Bộ từ vựng</Text>
                <View>
                    {isLoading
                        ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Lottie
                                source={{ uri: 'https://assets5.lottiefiles.com/packages/lf20_p8bfn5to.json' }}
                                autoPlay
                                loop
                            />
                        </View>
                        : <FlatList
                            showsVerticalScrollIndicator={false}
                            data={dataTopic}
                            renderItem={({ item }) => <WordGroupItem
                                onPress={() => handlePressTopic(item)}
                                uri={item.uri}
                                name={item.name} />}
                            numColumns={2}
                            keyExtractor={item => item.id}
                        />}
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#ffff',
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
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
        color: '#BEBEBE'
    },
    content: {
        flex: 1,
        paddingHorizontal: 11,
        marginBottom: 145,
    },
    txtwordGroup: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 'bold',
        color: color.txt4,
        marginVertical: 20,
        paddingLeft: 11
    },

});

export default WordGroup;