import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import db, { collection, query, where, getDocs, orderBy } from '../firebase/index'
import { useIsFocused } from '@react-navigation/native';

import Loading from '../components/Loading'
const { width, height } = Dimensions.get('window');


const Test = ({ navigation, route }) => {
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
            const q = query(collectRf, where("topic", "==", "TestLevel"), orderBy("title"));
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
                            <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                            <Text style={styles.txthead}>Kiểm tra trình độ</Text>
                        </View>
                        <ScrollView style={styles.bodycontainer}>
                            {data.length > 0 &&
                                data.map((item, i) =>
                                    <TouchableOpacity style={{
                                        ...styles.btn,
                                        borderBottomWidth: i === data.length - 1 ? 1 : 0,
                                        borderBottomColor: i === data.length - 1 && '#dedede'
                                    }} onPress={() => { navigation.navigate('TestDetail', { idItem: item.id }) }} key={i}>
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
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
    },
    bodycontainer: {
        marginTop: 20,
        height: height - 65,
        width: width,
        paddingBottom: 50,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        marginLeft: 60,
        color: color.txt5,
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
});
export default Test;
