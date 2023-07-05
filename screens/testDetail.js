import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import fontstyle from '../contains/fontStyle';
import db, { collection, query, where, getDocs, orderBy, doc } from '../firebase/index'
import { useIsFocused } from '@react-navigation/native';
import color from '../contains/color';
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
                (
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
                                        <Text style={styles.txthead}>Question {index + 1} out of {data.length}</Text>

                                        <View style={styles.body}>
                                            <View style={styles.boxQues}>
                                                <Text style={styles.txtQues}>{item.question}</Text>
                                            </View>
                                            <View style={styles.boxAnswer}>
                                                {listAns.filter((itemA, i) => { return item.id == itemA.id })
                                                    .map((itemAns, iA) => {
                                                        let keyChoice = '';
                                                        switch (iA) {
                                                            case 0:
                                                                keyChoice = 'A'
                                                                break;
                                                            case 1:
                                                                keyChoice = 'B'
                                                                break;
                                                            case 2:
                                                                keyChoice = 'C'
                                                                break;
                                                            case 3:
                                                                keyChoice = 'D'
                                                                break;
                                                            default:
                                                                break;
                                                        }

                                                        return (
                                                            <TouchableOpacity style={[styles.btnAnswer, { borderLeftWidth: lisAns[index] == itemAns.idA ? 7 : 0, backgroundColor: lisAns[index] == itemAns.idA ? '#EDF8EF' : '#FFFFFF' }]}
                                                                key={iA}
                                                                onPress={() => { handleButtonClick(index, itemAns.idA) }}>
                                                                <Text style={styles.txtbtnAnswer}>{keyChoice}. {itemAns.answer.replace(itemAns.answer[0], itemAns.answer[0].toUpperCase())}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                        {currentIndex > 0 &&
                            <TouchableOpacity style={styles.btnPre} onPress={() => { handlePrevious() }}>
                                <Text style={[styles.txthead, { fontSize: 17, marginTop: 0, color: '#fff' }]}>Previos</Text>
                            </TouchableOpacity>}
                        {currentIndex < data.length - 1 &&
                            <TouchableOpacity style={styles.btnNex} onPress={() => { handleNext() }}>
                                <Text style={[styles.txthead, { fontSize: 17, marginTop: 0, color: '#fff' }]}>Next</Text>
                            </TouchableOpacity>}
                        {currentIndex == data.length - 1 &&
                            <TouchableOpacity style={[styles.btnNex, { backgroundColor: '#FF7F50' }]} onPress={() => { handleComplete() }}>
                                <Text style={[styles.txthead, { fontSize: 17, marginTop: 0, color: '#fff' }]}>Complete</Text>
                            </TouchableOpacity>}
                        <TouchableOpacity style={styles.btnReturnHome} onPress={() => navigation.navigate("Home")}>
                            <Text style={[styles.txthead, { fontSize: 17, marginTop: 0, color: '#1c1a5e' }]}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                ) : <Loading />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c1a5e'
    },
    body: {
        flex: 1,
        width: width
    },
    boxQues: {
        marginTop: 10,
        marginBottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtQues: {
        textAlign: 'center',
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 22,
        color: "#fff",
        fontWeight: 'bold',
        lineHeight: 32
    },
    boxAnswer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnNex: {
        marginHorizontal: 30,
        marginBottom: 15,
        backgroundColor: "#4169E1",
        paddingVertical: 10,
        borderRadius: 10,
    },
    btnPre: {
        marginHorizontal: 30,
        marginBottom: 15,
        backgroundColor: "#40B5AD",
        paddingVertical: 10,
        borderRadius: 10,
    },
    btnAnswer: {
        width: width - 60,
        marginHorizontal: 30,
        backgroundColor: 'white',
        marginVertical: 10,
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 10,
        borderRadius: 5,
        elevation: 3,
        borderLeftColor: "#54b0fe"
    },
    btnReturnHome: {
        marginBottom: 50,
        marginHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    txtbtnAnswer: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: "black",
    },
    headcontainer: {
        alignItems: 'center',
        backgroundColor: "#6495ED",
        height: 55,
        width: width,
        justifyContent: 'center',
        paddingHorizontal: 38
    },
    txthead: {
        marginTop: 50,
        alignSelf: 'center',
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 16,
        color: "#aeadc6",
        fontWeight: 'bold'
    }
});

export default TestDetail;