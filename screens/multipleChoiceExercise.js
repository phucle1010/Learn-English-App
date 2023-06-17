import { createEntityAdapter } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import db, { collection, query, where, getDocs, orderBy } from '../firebase/index'
import { useIsFocused } from '@react-navigation/native';

import Loading from '../components/Loading'

const { width, height } = Dimensions.get('window');

const MultipleChoiceExercise = ({ navigation, route }) => {
    const isFocusedScreen = useIsFocused();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isFocusedScreen) {
            getData();
        } else {
            setData([])
            setIsLoading(true)
        }
    }, [isFocusedScreen])

    const getData = async () => {
        try {
            const collectRf = collection(db, "TEST")
            const q = query(collectRf, where("topic", "==", "multiple-choice"), orderBy("title"));
            const querySnapshot = await getDocs(q);
            const listData = []
            querySnapshot.forEach((doc) => {
                listData.push({ id: doc.id, ...doc.data() })
            });
            setTimeout(() => {
                setData(listData);
                setIsLoading(false);
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            {
                isLoading ? <Loading /> : (
                    <React.Fragment>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Exercise")}>
                                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Bài tập</Text>
                        </View>
                        <ScrollView style={styles.bodycontainer}>
                            {data.length > 0 &&
                                data.map((item, i) =>
                                    <TouchableOpacity style={{
                                        ...styles.btn,
                                        borderBottomWidth: i === data.length - 1 ? 1 : 0,
                                        borderBottomColor: i === data.length - 1 && '#dedede'
                                    }} onPress={() => { navigation.navigate('DetailMultipleChoiceExercise', { idItem: item.id }) }} key={i}>
                                        <Text style={[styles.txtbtn, { fontSize: 22 }]}>{item.title}</Text>
                                        <Text style={[styles.txtbtn, { fontWeight: '400' }]}>Tổng số câu hỏi: {item.total_question}</Text>
                                    </TouchableOpacity>)
                            }
                        </ScrollView>
                    </React.Fragment>
                )
            }

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    bodycontainer: {
        marginTop: 20,
        height: height - 65,
        width: width,
        paddingBottom: 50,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 60,
        width: 390,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#dedede',
        paddingVertical: 20,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    img: {
        width: 60,
        height: 60,
    },
    txtbtn: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 5
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 22,
        marginLeft: 60,
        color: 'black',
        marginLeft: 100,
    },
});
export default MultipleChoiceExercise;