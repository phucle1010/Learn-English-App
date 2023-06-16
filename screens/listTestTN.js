import { createEntityAdapter } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import { db, collection, query, where, getDocs, orderBy } from '../firebase/index'
const { width, height } = Dimensions.get('window');
const ListTestTN = ({ navigation, route }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        try {
            console.log("getdata")
            const collectRf = collection(db, "TEST")
            const q = query(collectRf, where("topic", "==", "multiple-choice"), orderBy("title"));
            const querySnapshot = await getDocs(q);
            const listData = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                listData.push({ id: doc.id, ...doc.data() })
                console.log(doc.data())
            });
            setTimeout(() => {
                setData(listData);
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Bài tập</Text>
                </View>
                <ScrollView style={styles.bodycontainer}>
                    {data.length > 0 ?
                        data.map((item, i) =>
                            <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('TestDetail', { idItem: item.id }) }} key={i}>
                                <Text style={[styles.txtbtn, { fontSize: 22 }]}>{item.title}</Text>
                                <Text style={[styles.txtbtn, { fontWeight: '400' }]}>Tổng số câu hỏi: {item.total_question}</Text>
                            </TouchableOpacity>)
                        : <View style={{ alignItems: 'center', marginTop: 20, width: width }}>
                            <Text style={{ fontFamily: fontstyle.fontfamily_2, fontSize: 22, color: 'black' }}>Loading...</Text>
                        </View>}

                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bodycontainer: {
        backgroundColor: '#cde7fe',
        marginTop: 5,
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
        backgroundColor: 'white',
        height: 70,
        width: 230,
        elevation: 10,
        marginVertical: 10,
        marginHorizontal: (width - 230) / 2,
        borderRadius: 5
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
export default ListTestTN;
