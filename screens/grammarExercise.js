import { StyleSheet, Text, SafeAreaView, View, Pressable, FlatList, Dimensions, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window')

const GrammarExercise = (props) => {
    const { questionsData } = props
    const data = questionsData;
    const totalQuestions = data.length;
    const [points, setPoints] = useState(0);
    const [indexQu, setIndexQu] = useState(0);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [counter, setCounter] = useState(15);
    const [showModal, setShowModal] = useState(false)
    const [isStart, setIsStart] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    let interval = null;

    useEffect(() => {
        if (selectedAnswerIndex !== null) {
            if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
                setPoints((points) => points + 1);
                setAnswerStatus(true);
                answers.push({ question: indexQu + 1, answer: true, selectedAnswerIndex: selectedAnswerIndex });
            } else {
                setAnswerStatus(false);
                answers.push({ question: indexQu + 1, answer: false, selectedAnswerIndex: selectedAnswerIndex });
            }
        }
    }, [selectedAnswerIndex]);

    useEffect(() => {
        setSelectedAnswerIndex(null);
        setAnswerStatus(null);
    }, [indexQu]);

    useEffect(() => {
        const myInterval = () => {
            if (counter >= 1) {
                setCounter((state) => state - 1);
            }
            if (counter === 0) {
                setIndexQu(indexQu + 1);
                setCounter(15);
            }
        };
        if (isStart) {
            if (isFinish) {
                return;
            } else {
                interval = setTimeout(myInterval, 1000);
            }
        }
        return () => {
            clearTimeout(interval);
        };
    }, [counter, isStart]);

    useEffect(() => {
        if (indexQu + 1 > data.length) {
            clearTimeout(interval)
            handleSubmit();
        }
    }, [indexQu]);

    useEffect(() => {
        if (!interval) {
            setCounter(15);
        }
    }, [indexQu]);

    const currentQuestion = data[indexQu];
    const handleSubmit = () => {
        setShowModal(true);
        setIsFinish(true)
    }
    const handleStart = () => {
        setIsStart(true);
        setIndexQu(0);
        setPoints(0);
        setAnswers([]);
        setAnswerStatus(null);
        setIsFinish(false);
        setCounter(15)

    }
    const handleReviewExecire = () => {
        setIndexQu(0);
        setShowModal(false)
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            {!isStart
                ? <View style={styles.descriptionExerciseContainer}>
                    <Text style={{ color: '#333', fontSize: 16 }}>Bạn sẽ có 15 giây cho mỗi câu hỏi, khi hết 15 giây hệ thống sẽ tự động nộp bài và chuyển sang câu hỏi tiếp theo (Nếu có)</Text>
                    <TouchableOpacity onPress={handleStart} style={[styles.modalButton, { marginTop: 50 }]}>
                        <Text style={{ color: '#fff' }}>Bắt đầu</Text>
                    </TouchableOpacity>
                </View>
                : <View style={{ flex: 1, paddingHorizontal: 22, backgroundColor: '#fff' }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginHorizontal: 16,
                            marginTop: 30
                        }}
                    >
                        <View></View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: "#333", }}>Thời gian còn lại: </Text>
                                <Pressable>
                                    <Text
                                        style={{ color: "#FF3366", fontWeight: "bold" }}
                                    >
                                        {counter}s
                                    </Text>
                                </Pressable>
                            </View>

                            <Text style={{ color: "#333", }}>
                                Số câu trả lời đúng  ({points}/{totalQuestions})
                            </Text>
                        </View>

                    </View>
                    {isFinish && <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', width: width, top: 180 }}>
                        {indexQu > 0 ? <TouchableOpacity onPress={() => setIndexQu(indexQu - 1)} style={{ padding: 10 }}>
                            <Icon name="chevron-back-outline" size={25} style={{ color: '#797979' }} />
                        </TouchableOpacity> : <View />}
                        {indexQu + 1 < totalQuestions ? <TouchableOpacity onPress={() => setIndexQu(indexQu + 1)} style={{ padding: 10 }}>
                            <Icon name="chevron-forward-outline" size={25} style={{ color: '#797979' }} />
                        </TouchableOpacity> : <View />}
                    </View>}
                    <View
                        style={{
                            borderRadius: 6,
                            // marginHorizontal: 16,
                            // paddingHorizontal: 10,
                            marginTop: 30,
                        }}
                    >
                        <View style={{ borderWidth: 1, borderColor: '#BEBEBE', width: '100%', justifyContent: 'center', alignItems: 'center', height: 82, borderRadius: 20, paddingHorizontal: 10 }}>

                            <Text style={{ fontSize: 18, fontWeight: "bold", color: '#333', }}>
                                {currentQuestion?.question}
                            </Text>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            {!isFinish ? <FlatList
                                scrollEnabled={false}
                                data={currentQuestion?.options}
                                renderItem={({ item, index }) =>
                                    <Pressable
                                        onPress={() =>
                                            selectedAnswerIndex === null && setSelectedAnswerIndex(index)
                                        }
                                        style={[styles.answer,
                                        selectedAnswerIndex === index &&
                                            index === currentQuestion?.correctAnswerIndex
                                            ? {
                                                borderWidth: 0.5,
                                                borderColor: 'green'
                                            }
                                            : selectedAnswerIndex != null &&
                                                selectedAnswerIndex === index
                                                ? {
                                                    borderWidth: 0.5,
                                                    borderColor: '#FF3366'
                                                }
                                                : {
                                                    borderWidth: 0
                                                }
                                        ]}
                                    >
                                        {selectedAnswerIndex === index &&
                                            index === currentQuestion.correctAnswerIndex ? (
                                            <Icon name="checkmark-circle-outline" size={15} style={{ color: 'green' }} />
                                        ) : selectedAnswerIndex != null &&
                                            selectedAnswerIndex === index ? (
                                            <Icon name="close-circle-outline" size={15} style={{ color: '#FF3366' }} />
                                        ) : (
                                            <View></View>
                                        )}

                                        <Text style={{ color: '#333' }}>{item.answer}</Text>
                                    </Pressable>}
                                numColumns={2}
                            />
                                : <FlatList
                                    scrollEnabled={false}
                                    data={currentQuestion?.options}
                                    renderItem={({ item, index }) =>
                                        <Pressable
                                            style={[styles.answer,
                                            answers[indexQu]?.answer == true &&
                                                answers[indexQu]?.selectedAnswerIndex === index
                                                ? {
                                                    borderWidth: 0.5,
                                                    borderColor: 'green'
                                                }
                                                : answers[indexQu]?.answer == false &&
                                                    answers[indexQu]?.selectedAnswerIndex === index
                                                    ? {
                                                        borderWidth: 0.5,
                                                        borderColor: '#FF3366'
                                                    }
                                                    : {
                                                        borderWidth: 0
                                                    }
                                            ]}
                                        >
                                            {answers[indexQu]?.answer == true &&
                                                answers[indexQu]?.selectedAnswerIndex === index ? (
                                                <Icon name="checkmark-circle-outline" size={15} style={{ color: 'green' }} />
                                            ) : answers[indexQu]?.answer == false &&
                                                answers[indexQu]?.selectedAnswerIndex === index ? (
                                                <Icon name="close-circle-outline" size={15} style={{ color: '#FF3366' }} />
                                            ) : (
                                                <View></View>
                                            )}

                                            <Text style={{ color: '#333' }}>{item.answer}</Text>
                                        </Pressable>}
                                    numColumns={2}
                                />
                            }
                            {isFinish && <TouchableOpacity onPress={() => setIsStart(false)} style={styles.modalButton}>
                                <Text style={{ fontSize: 22, color: '#fff' }}>Làm lại</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>

                    <View
                        style={
                            answerStatus === null
                                ? null
                                : {
                                    height: 230,
                                    backgroundColor: answerStatus ? "#99FF99" : "#FFCCCC",
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    zIndex: 1
                                }
                        }
                    >
                        {answerStatus === null ? null : (
                            <Text
                                style={
                                    answerStatus == null
                                        ? null
                                        : { fontSize: 17, marginTop: 25, textAlign: "center", fontWeight: "bold", color: answerStatus ? 'green' : '#FF3366' }
                                }
                            >
                                {!!answerStatus ? "Đáp án chính xác!!" : "Không chính xác!!"}
                            </Text>
                        )}

                        {indexQu + 1 >= data.length && answerStatus != null ? (
                            <Pressable
                                onPress={handleSubmit}
                                style={{ backgroundColor: answerStatus ? 'green' : '#FF3366', marginHorizontal: 22, borderRadius: 5, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', marginTop: 35 }}
                            >
                                <Text style={{ color: "#fff" }}>Done</Text>
                            </Pressable>
                        ) : answerStatus === null ? null : (
                            <Pressable
                                onPress={() => setIndexQu(indexQu + 1)}
                                style={{ backgroundColor: answerStatus ? 'green' : '#FF3366', marginHorizontal: 22, borderRadius: 5, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', marginTop: 35 }}
                            >
                                <Text style={{ color: "#fff" }}>Câu hỏi tiếp theo</Text>
                            </Pressable>

                        )}
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ color: '#FF6868' }}
                                            onPress={() => { setShowModal(false); setIsStart(false) }}>
                                            <Icon name="arrow-back-outline" size={30} style={{ color: '#FF6868' }} />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalText}>Kết quả kiểm tra</Text>
                                        <View style={styles.modalResultRow}>
                                            <View style={styles.modalResultContainer}>
                                                <Icon name="checkmark-circle-outline" size={70} style={{ color: 'green' }} />
                                                <Text style={styles.modalText}>{`${points} / ${totalQuestions}`}</Text>
                                            </View>
                                            <View style={styles.modalResultContainer}>
                                                <Icon name="close-circle-outline" size={70} style={{ color: '#FF3366' }} />
                                                <Text style={styles.modalText}>{`${totalQuestions - points} / ${totalQuestions}`}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={handleReviewExecire} style={styles.modalButton}>
                                            <Text style={{ fontSize: 22, color: '#fff' }}>Xem lại bài làm</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>}

        </SafeAreaView>
    );
};

export default GrammarExercise;

const styles = StyleSheet.create({
    answer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        width: (width - 60) / 2,
        height: 39,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        marginLeft: 5,
        marginTop: 10
    },
    modalContainer: {
        flex: 1,
        color: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        width: width,
        height: height,
        color: 'green',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 22
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    modalText: {
        fontSize: 22,
        color: '#333'
    },
    modalResultRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 100
    },
    modalResultContainer: {
        width: 136,
        height: 136,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5
    },
    modalButton: {
        width: '100%',
        backgroundColor: '#FB6F43',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        marginTop: 200
    },
    descriptionExerciseContainer: {
        marginHorizontal: 22,
        marginTop: 100,
        paddingHorizontal: 40,
        paddingVertical: 80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5
    }
});