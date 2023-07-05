import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import fontstyle from '../contains/fontStyle';
import db, { collection, query, where, getDocs, orderBy, doc } from '../firebase/index'
import { useIsFocused } from '@react-navigation/native';
import Loading from '../components/Loading'

const { width, height } = Dimensions.get('window')

const TestDetail = (props) => {
    const { navigation, route } = props
    const { idItem } = route.params
    const isFocusedScreen = useIsFocused();
    const [data, setData] = useState([])
    const [listAns, setListAns] = useState([])
    const [lisAns, setLisAns] = useState(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    useEffect(() => {
        if (isFocusedScreen) {
            setLisAns(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
            getData()
        } else {
            setData([]);
            setListAns([]);
            setCurrentIndex(0);
        }

    }, [isFocusedScreen, idItem])

    const getData = async () => {
        setLisAns
        try {
            const docRf = doc(db, "TEST", idItem)
            const colRf = collection(docRf, "QUESTION");
            const querySnapshot = await getDocs(colRf);
            const listData = []
            const listAnswer = []
            querySnapshot.forEach(async (doc) => {
                listData.push({ id: doc.id, ...doc.data() })

                const traloiRef = collection(doc.ref, 'ANSWER');
                const q2 = query(traloiRef);
                const querySnapshot2 = await getDocs(q2);
                querySnapshot2.forEach(async (doc2) => {
                    listAnswer.push({ id: doc.id, idA: doc2.id, ...doc2.data() })
                });
            })
            setTimeout(() => {
                setData(listData);
                setListAns(listAnswer);
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const handleButtonClick = (page, value) => {
        const newLisAns = [...lisAns];
        newLisAns[page] = value;
        setLisAns(newLisAns);
    };

    const handleNext = () => {
        flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        setCurrentIndex(currentIndex + 1)
    };

    const handlePrevious = () => {
        flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
        setCurrentIndex(currentIndex - 1)

    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: true, listener: (event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / width);
                setCurrentIndex(index);
            }
        }
    );

    const handleComplete = () => {
        if (lisAns.includes("")) {
            Alert.alert("Thông báo!", "Hãy trả lời đầy đủ các câu hỏi trước khi hoàn thành")
        } else {
            navigation.navigate('TestResult', { listQuestion: data, listAnswer: listAns, listChosse: lisAns, idTest: idItem })
        }
    }
    return (
        <View style={styles.container}>
            {data.length > 0 ?
                <View>
                    <Animated.FlatList
                        ref={flatListRef}
                        data={data}
                        onScroll={handleScroll}
                        keyExtractor={(item) => item.question}
                        horizontal
                        scrollEventThrottle={32}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.screen}>
                                    <View style={styles.headcontainer}>
                                        <Text style={styles.txthead}>{index + 1}/{data.length}</Text>
                                    </View>
                                    <View style={styles.progress}>
                                        <View style={[styles.done, { width: (width / 20) * (index + 1), }]}></View>
                                        <View style={styles.donot}></View>
                                    </View>
                                    <View style={styles.body}>
                                        <View style={styles.boxQues}>
                                            <Text style={styles.txtQues}>{item.question}</Text>
                                        </View>
                                        <View style={styles.boxAnswer}>
                                            {listAns.filter((itemA, i) => { return item.id == itemA.id })
                                                .map((itemAns, iA) =>
                                                    <TouchableOpacity style={[styles.btnAnswer, { borderLeftWidth: lisAns[index] == itemAns.idA ? 7 : 0, backgroundColor: lisAns[index] == itemAns.idA ? 'yellow' : 'white' }]}
                                                        key={iA}
                                                        onPress={() => { handleButtonClick(index, itemAns.idA) }}>
                                                        <Text style={styles.txtbtnAnswer}>{itemAns.answer}</Text>
                                                    </TouchableOpacity>
                                                )}
                                        </View>
                                        <View style={styles.footer}>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    >
                    </Animated.FlatList>
                    {currentIndex > 0 &&
                        <TouchableOpacity style={styles.btnPre} onPress={() => { handlePrevious() }}>
                            <Text style={[styles.txthead, { fontSize: 17 }]}>Previous</Text>
                        </TouchableOpacity>}
                    {currentIndex < data.length - 1 &&
                        <TouchableOpacity style={styles.btnNex} onPress={() => { handleNext() }}>
                            <Text style={[styles.txthead, { fontSize: 17 }]}>Next</Text>
                        </TouchableOpacity>}
                    {currentIndex == data.length - 1 &&
                        <TouchableOpacity style={[styles.btnNex, { backgroundColor: 'orange' }]} onPress={() => { handleComplete() }}>
                            <Text style={[styles.txthead, { fontSize: 17 }]}>Complete</Text>
                        </TouchableOpacity>}
                </View>
                :
                <View style={{ alignItems: 'center', marginTop: 50, width: width }}>
                    <Text style={{ fontFamily: fontstyle.fontfamily_2, fontSize: 22, color: 'black' }}>Loading...</Text>
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignSelf: 'center',
        marginTop: 10,
        paddingVertical: 10,
        width: 220,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    txtBT: {
        fontSize: 20,
        color: '#6D7CA8',
        fontWeight: 'bold'
    },
    screen: {
        height: height,
        width: width,
        backgroundColor: 'white'
    },
    body: {
        flex: 1,
        backgroundColor: '#cde7fe',
        width: width
    },
    footer: {
        flex: 0.25,
        width: width
    },
    boxQues: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtQues: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 22,
        color: "black",
        fontWeight: 'bold'
    },
    boxAnswer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnNex: {
        width: 100,
        backgroundColor: "#54b0fe",
        paddingVertical: 7,
        borderRadius: 5,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 90,
        right: 15
    },
    btnPre: {
        width: 100,
        backgroundColor: "#54b0fe",
        paddingVertical: 7,
        borderRadius: 5,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 90,
        left: 15
    },
    btnAnswer: {
        width: width - 50,
        marginHorizontal: 25,
        backgroundColor: 'white',
        marginVertical: 10,
        paddingVertical: 7,
        paddingLeft: 15,
        paddingRight: 10,
        borderRadius: 5,
        elevation: 10,
        borderLeftColor: "#54b0fe"
    },
    txtbtnAnswer: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: "black",
    },
    headcontainer: {
        alignItems: 'center',
        backgroundColor: "#54b0fe",
        height: 55,
        width: width,
        justifyContent: 'center',
        paddingHorizontal: 38
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: "white",
        fontWeight: 'bold'
    },
    progress: {
        width: width,
        height: 3,
        flexDirection: 'row',
        backgroundColor: "silver"
    },
    done: {
        width: width / 2,
        height: 3,
        backgroundColor: "limegreen"
    },
    donot: {
        flex: 1,
        backgroundColor: "silver"
    },
});
export default TestDetail;