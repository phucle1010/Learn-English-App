import React, { useState, useEffect, useCallBack } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import db, { getDocs, collection } from '../firebase/index';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import Sound from 'react-native-sound'
import TrackPlayer, { useProgress, RepeatMode } from 'react-native-track-player';
import Pdf from 'react-native-pdf';

import Loading from '../components/Loading'

const QuestionItem = ({ question, index, setAnswerList, answerList, clickedOKOnAlert, clickedReset }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const indexOfAnswer = () => {
        for (let i = 0; i < answerList.length; i++) {
            if (answerList[i].id === index) {
                return i;
            }
        }
        return -1;
    }

    useEffect(() => {
        if (clickedReset) {
            setSelectedAnswer(null);
        }
    }, [clickedReset])

    useEffect(() => {
        const existedAnswer = answerList.length > 0 && answerList.filter(answer => answer.id === index).length > 0;
        if (existedAnswer) {
            if (selectedAnswer !== null) {
                const indexOfAnswerInAnswerList = indexOfAnswer();
                setAnswerList(prev => {
                    prev.splice(indexOfAnswerInAnswerList, 1, {
                        id: index,
                        content: question.content,
                        is_corrected: selectedAnswer === question.correct_answer ? true : false,
                    })
                    return [
                        ...prev,

                    ]
                })
            }
        } else {
            setAnswerList(prev => {
                return [
                    ...prev,
                    {
                        id: index,
                        content: question.content,
                        is_corrected: false,
                    }
                ]
            })
        }
    }, [selectedAnswer])

    return (
        <View style={{
            marginVertical: 15
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginRight: 10
                }}>Question {`${index}`}:</Text>
                <Text style={{
                    flex: 1,
                    fontSize: 16,
                    flexWrap: 'wrap',
                    // paddingRight: 30,
                }}>{question.content}</Text>
            </View>
            <View style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    style={{
                        marginRight: 10,
                        width: 20,
                        height: 20,
                        backgroundColor: clickedOKOnAlert && question.correct_answer === true ? 'green' : '#ffff',
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#cdcdcd',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => setSelectedAnswer(true)}
                >
                    <View style={{
                        width: 10,
                        height: 10,
                        backgroundColor: selectedAnswer === true ? '#cdcdcd' : '#ffff',
                        borderRadius: 100,
                    }} />
                </TouchableOpacity>
                <Text>True</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    style={{
                        marginRight: 10,
                        width: 20,
                        height: 20,
                        backgroundColor: clickedOKOnAlert && question.correct_answer === false ? 'green' : '#ffff',
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#cdcdcd',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => setSelectedAnswer(false)}
                >
                    <View style={{
                        width: 10,
                        height: 10,
                        backgroundColor: selectedAnswer === false ? '#cdcdcd' : '#ffff',
                        borderRadius: 100,
                    }} />
                </TouchableOpacity>
                <Text>False</Text>
            </View>
        </View>
    )
}

const DetailListenExercise = ({ navigation, route }) => {

    const isFocusedScreen = useIsFocused();
    const { level_id, level_name, testId, levelIdInFB, question } = route.params;
    const { audio, image, title } = question;
    const [completedSetup, setCompletedSetup] = useState(false);
    const [isPlayed, setIsPlayed] = useState(null);
    const { position, duration } = useProgress(200)
    const [detailQuestions, setDetailQuestions] = useState([])
    const [openedTranscript, setOpenedTranscript] = useState(false);
    const [openedExercises, setOpenedExercises] = useState(false);
    const [openedAnswers, setOpenedAnswers] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [answerList, setAnswerList] = useState([]);
    const [clickedOKOnAlert, setClickedOKOnAlert] = useState(false);
    const [clickedReset, setClickedReset] = useState(false);

    const setUpAudio = async () => {
        try {
            await TrackPlayer.setupPlayer().then(() => setCompletedSetup(true)).catch(err => console.log(err));
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setUpAudio();
    }, [])

    const addAudio = async () => {
        await TrackPlayer.add([
            {
                id: 1,
                url: audio,
                title
            }
        ])
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
    }

    useEffect(() => {
        if (completedSetup) {
            addAudio();
        }
    }, [completedSetup])

    const getQuestionList = async () => {
        getDocs(collection(db, "TEST", `${testId}`, "QUESTION_LEVEL", `${levelIdInFB}`, "QUESTION_LIST", `${question.id}`, "DETAIL_QUESTION")).then(questionQuery => {
            const questions = []
            questionQuery.forEach(questionItem => questions.push({
                id: questionItem.id,
                ...questionItem.data()
            }))
            setDetailQuestions(questions)
            setLoaded(true)
        })
    }

    useEffect(() => {
        if (isFocusedScreen) {
            getQuestionList();
            setCompletedSetup(true);
        } else {
            setDetailQuestions([]);
            setAnswerList([]);
            setOpenedAnswers(false);
            setOpenedExercises(false);
            setOpenedTranscript(false);
            setClickedOKOnAlert(false);
            setIsPlayed(false);
            setCompletedSetup(false);
            setLoaded(false);
            TrackPlayer.reset();
        }
    }, [isFocusedScreen])

    const handleSubmitAnswer = () => {
        const numberOfCorrectAnswer = answerList.filter(answer => answer.is_corrected).length;
        Alert.alert("Thông báo", `Bạn đã trả lời đúng ${numberOfCorrectAnswer}/${answerList.length}`, [
            {
                text: "OK",
                onPress: () => {
                    setClickedOKOnAlert(true)
                }
            }
        ])
    }

    const handleResetResult = () => {
        setAnswerList([]);
        setClickedOKOnAlert(false);
        setClickedReset(true)
    }

    function format(seconds) {
        let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    return (
        <React.Fragment>
            {
                loaded ? (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("ListenExerciseTopic", {
                                level_id,
                                level_name
                            })}>
                                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Chi tiết câu hỏi</Text>
                        </View>
                        <ScrollView
                            style={{
                                paddingHorizontal: 15
                            }}
                            showsVerticalScrollIndicator={false}
                        >
                            <Text style={styles.mainHeading}>{title}</Text>
                            <Text style={{
                                fontSize: 16,
                                marginBottom: 20,
                            }}>{`Level: ${level_name}`}</Text>
                            <Image source={{ uri: image }} style={styles.mainImage} />
                            <View style={{
                                marginTop: 20,
                                backgroundColor: '#ededed',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                {isPlayed ? (
                                    <TouchableOpacity onPress={() => {
                                        setIsPlayed(prev => !prev)
                                        TrackPlayer.pause();
                                    }}>
                                        <Icon name='pause-circle-outline' size={35} />
                                    </TouchableOpacity>) : (
                                    <TouchableOpacity onPress={() => {
                                        setIsPlayed(prev => !prev)
                                        TrackPlayer.play();
                                    }}>
                                        <Icon name='play-circle-outline' size={35} />
                                    </TouchableOpacity>)}
                                <Slider
                                    style={{ width: '60%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={parseInt(duration)}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    value={parseInt(position)}
                                    onValueChange={(value) => {
                                        TrackPlayer.seekTo(value)
                                    }}
                                />

                                <Text style={{
                                    flex: 1,
                                    fontSize: 16,
                                    textAlign: 'center'
                                }}>{format(position)} / {format(duration)}</Text>
                            </View>
                            {
                                detailQuestions.map((item, index) => <QuestionItem question={item} key={index} index={index + 1} setAnswerList={setAnswerList} answerList={answerList} clickedOKOnAlert={clickedOKOnAlert} clickedReset={clickedReset} />)
                            }
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 'auto',
                                marginBottom: 20,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        marginRight: 10,
                                        paddingVertical: 6,
                                        paddingHorizontal: 25,
                                        backgroundColor: '#FB6F43',
                                        alignSelf: 'flex-start',
                                        borderRadius: 50,
                                    }}
                                    onPress={handleResetResult}
                                >
                                    <Text style={{
                                        color: '#ffff',
                                        fontSize: 16,
                                    }}>Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 6,
                                        paddingHorizontal: 25,
                                        backgroundColor: '#8718DE',
                                        alignSelf: 'flex-start',
                                        borderRadius: 50,
                                    }}
                                    onPress={handleSubmitAnswer}
                                >
                                    <Text style={{
                                        color: '#ffff',
                                        fontSize: 16,
                                    }}>Submit</Text>
                                </TouchableOpacity>

                            </View>

                            {/* Transcript */}
                            <View style={{
                                marginTop: 20,
                                marginBottom: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}>Transcript</Text>
                                {
                                    openedTranscript ? <TouchableOpacity onPress={() => setOpenedTranscript(prev => !prev)}>
                                        <Icon name="chevron-down" size={25} />
                                    </TouchableOpacity> : <TouchableOpacity onPress={() => setOpenedTranscript(prev => !prev)}>
                                        <Icon name="chevron-forward" size={25} />
                                    </TouchableOpacity>
                                }
                            </View>
                            {
                                openedTranscript && <Pdf
                                    trustAllCerts={false}
                                    source={{ uri: question.transcript_link, cache: true }}
                                    onError={(error) => {
                                        console.log(error);
                                    }}
                                    onPressLink={(uri) => {
                                        console.log(`Link pressed: ${uri}`);
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 400,
                                        backgroundColor: '#fff'
                                    }}
                                    scale={1.04}
                                />
                            }
                            {/* Exercises */}
                            <View style={{
                                marginTop: 20,
                                marginBottom: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}>Detail Exercises</Text>
                                {
                                    openedExercises ? <TouchableOpacity onPress={() => setOpenedExercises(prev => !prev)}>
                                        <Icon name="chevron-down" size={25} />
                                    </TouchableOpacity> : <TouchableOpacity onPress={() => setOpenedExercises(prev => !prev)}>
                                        <Icon name="chevron-forward" size={25} />
                                    </TouchableOpacity>
                                }
                            </View>
                            {
                                openedExercises && <Pdf
                                    trustAllCerts={false}
                                    source={{ uri: question.exercise_document_link, cache: true }}
                                    onError={(error) => {
                                        console.log(error);
                                    }}
                                    onPressLink={(uri) => {
                                        console.log(`Link pressed: ${uri}`);
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 400,
                                        backgroundColor: '#fff'
                                    }}
                                    scale={1.04}
                                />
                            }
                            {/* Answer */}
                            <View style={{
                                marginTop: 20,
                                marginBottom: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}>Detail Answers</Text>
                                {
                                    openedAnswers ? <TouchableOpacity onPress={() => setOpenedAnswers(prev => !prev)}>
                                        <Icon name="chevron-down" size={25} />
                                    </TouchableOpacity> : <TouchableOpacity onPress={() => setOpenedAnswers(prev => !prev)}>
                                        <Icon name="chevron-forward" size={25} />
                                    </TouchableOpacity>
                                }
                            </View>
                            {
                                openedAnswers && <Pdf
                                    trustAllCerts={false}
                                    source={{ uri: question.answer_document_link, cache: true }}
                                    onError={(error) => {
                                        console.log(error);
                                    }}
                                    onPressLink={(uri) => {
                                        console.log(`Link pressed: ${uri}`);
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 400,
                                        backgroundColor: '#fff'
                                    }}
                                    scale={1.04}
                                />
                            }

                        </ScrollView>
                    </View>
                ) : (
                    <Loading />
                )
            }
        </React.Fragment>

    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#ffff',
        paddingBottom: 80,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        position: 'absolute',
        left: '35%',
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        textAlign: 'center',
        color: color.txt5,
    },
    mainHeading: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    mainImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    }
})

export default DetailListenExercise;