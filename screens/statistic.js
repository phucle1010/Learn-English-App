import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import WordGroupItem from '../components/WordGroupItem';
import db, { getDocs, collection } from '../firebase/index';
import { query, orderBy, limit } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

import Loading from '../components/Loading';

const Statistic = (props) => {
    const isFocusedScreen = useIsFocused();
    const { navigation } = props
    const [dataWord, setDataWord] = useState([])
    const [dataWG, setDataWG] = useState([])
    const [dataTimeUse, setDataTimeUse] = useState({ labels: [], datasets: [{ data: [] }] })
    const [isLoading, setIsLoading] = useState(true)



    const chartConfig = {
        backgroundGradientFrom: "#182f85",
        backgroundGradientFromOpacity: 0.9,
        backgroundGradientTo: "#364d94",
        backgroundGradientToOpacity: 0.8,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    const handleGet = async () => {
        const q = query(collection(db, "VOCABULARY"),
            orderBy("numsearch", 'desc'),
            limit(7));
        const querySnapshot = await getDocs(q);
        const newData1 = []
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            const dataWithId = { ...docData, id: doc.id };
            newData1.push(dataWithId);
        });
        setDataWord(newData1)
        console.log(dataWord)


        const q2 = query(collection(db, "TOPIC"),
            orderBy("numsearch", 'desc'),
            limit(5));
        const querySnapshot2 = await getDocs(q2);
        const newData2 = []
        querySnapshot2.forEach((doc) => {
            const docData = doc.data();
            const dataWithId2 = { ...docData, id: doc.id };
            newData2.push(dataWithId2);
        });
        setDataWG(newData2)
        console.log(dataWG)

        const q3 = query(collection(db, "USER", "iytke9JaBuoJSCsonWrV", "usage"),
            limit(7));
        const querySnapshot3 = await getDocs(q3);
        const listLabel = []
        const listdt = []
        querySnapshot3.forEach((doc) => {
            const docData = doc.data();
            listLabel.push(doc.id);
            listdt.push(docData.usageTime / 60000)
        });
        setDataTimeUse({ labels: listLabel, datasets: [{ data: listdt }] })
        console.log(listdt)
        setIsLoading(false)
    }

    useEffect(() => {
        if (isFocusedScreen) {
            handleGet();
        } else {
            setDataTopic([]);
            setIsLoading(true);
        }
    }, [isFocusedScreen])

    return (
        <View style={{ width: Dimensions.get('window').width, }}>
            {
                isLoading ? <View style={{
                    backgroundColor: '#fff',
                    width: Dimensions.get('window').width,
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <LottieView
                        source={require("../sources/lottie/bouncy-slime.json")}
                        style={styles.animation}
                        autoPlay
                    />
                </View> : (
                    <View style={styles.container}>
                        {/* <View style={styles.headcontainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Bộ từ vựng</Text>
                            <View></View>
                        </View> */}
                        <View style={styles.content}>
                            <Text style={styles.txtwordGroup}>Top từ vựng được tìm kiếm</Text>
                            <View style={styles.boxTK}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.titleTk}>Từ vựng</Text>
                                    <Text style={styles.titleTk}>Lượt tìm kiếm</Text>
                                </View>
                                <View style={{ height: 1, width: '100%', backgroundColor: 'white', marginBottom: 5 }}></View>

                                {dataWord.map((item, index) =>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }} key={index}>
                                        <Text style={styles.titleTk}>{item.word}</Text>
                                        <Text style={styles.titleTk}>{item.numsearch}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.txtwordGroup}>Top chủ đề xem nhiều nhất</Text>
                            <View style={styles.boxTK}>

                                {dataWG.map((item, index) =>
                                    <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center', marginVertical: 5 }} key={index}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginRight: 15 }}>Top {index + 1}</Text>
                                        <View style={{ height: 50, width: 80, borderRadius: 10, backgroundColor: 'white' }}>
                                            <Image source={{ uri: item.uri }} style={{ height: 50, width: 80, borderRadius: 10 }}></Image>
                                        </View>
                                        <Text style={[styles.titleTk, { width: 135, marginLeft: 5 }]} numberOfLines={2}>{item.name}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.txtwordGroup}>Thời gian sử dụng </Text>
                            <View style={{ alignItems: 'center' }}>
                                <LineChart
                                    data={dataTimeUse}
                                    width={screenWidth - 60}
                                    verticalLabelRotation={30}
                                    chartConfig={chartConfig}
                                    fromZero={true}
                                    withVerticalLabels={true}
                                    withHorizontalLines={true}
                                    verticalLabelRotation={15}
                                    bezier
                                />
                            </View>
                        </View>

                    </View>
                )
            }
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
        marginTop: 20,
        paddingLeft: 11,
        marginBottom: 10
    },
    boxTK: {
        width: Dimensions.get('window').width - 60,
        marginHorizontal: 19,
        backgroundColor: "#364d94",
        borderRadius: 15,
        padding: 15
    },
    titleTk: {
        color: 'white',
        fontSize: 16,
    }

});

export default Statistic;