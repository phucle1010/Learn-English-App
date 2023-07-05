import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import WordGroupItem from '../components/WordGroupItem';
import db, { getDocs, collection } from '../firebase/index';
import { updateDoc, doc, increment } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Loading from '../components/Loading';

const WordGroup = (props) => {
    const isFocusedScreen = useIsFocused();
    const { navigation } = props
    const [dataTopic, setDataTopic] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleGetTopic = async () => {
        const querySnapshot = await getDocs(collection(db, "TOPIC"));
        const newData = []
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            const dataWithId = { ...docData, id: doc.id };
            newData.push(dataWithId);
        });
        setDataTopic(newData)
        setIsLoading(false)
    }

    useEffect(() => {
        handleGetTopic();
    }, [])

    const updatenumsearch = async (id) => {
        console.log("updatenumsearch")
        console.log(id)
        const DocRef = doc(db, "TOPIC", id);
        const updatedocRef = await updateDoc(DocRef, {
            numsearch: increment(1)
        });
    }

    const handlePressTopic = (item) => {
        updatenumsearch(item.id)
        navigation.navigate('DetailWordGroup', { item })
    }

    return (
        <React.Fragment>
            {
                isLoading ? <Loading /> : (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: 20,
                                    height: '100%',
                                    justifyContent: "center",
                                }}
                                onPress={() => navigation.navigate("Home")}
                            >
                                <Icon name='arrow-left' size={20} color={color.txt5} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Bộ từ vựng</Text>
                            <View></View>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.txtwordGroup}>Danh sách chủ đề</Text>
                            <View>
                                {isLoading
                                    ? <Loading />
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
                )
            }
        </React.Fragment>

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
        color: '#BEBEBE'
    },
    content: {
        flex: 1,
        paddingHorizontal: 11,
        paddingBottom: 60,
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