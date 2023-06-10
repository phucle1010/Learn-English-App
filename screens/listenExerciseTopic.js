import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import db, { getDocs, collection, getDoc } from '../firebase/index';
import { useIsFocused } from '@react-navigation/native';

import Loading from '../components/Loading'

const ListenExerciseTopic = ({ navigation, route }) => {
    const level_id = route.params.level_id;
    const level_name = route.params.level_name;
    const isFocusedScreen = useIsFocused();
    const [testId, setTestId] = useState(null);
    const [levelIdInFB, setLevelIdInFB] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getLevelsInQuestions = async (test) => {
        await getDocs(collection(db, "TEST", `${test.id}`, "QUESTION_LEVEL")).then((levelQuery) => {
            levelQuery.forEach(level => {
                if (level.data().level_id === level_id) {
                    setLevelIdInFB(level.id)
                    getDocs(collection(db, "TEST", `${test.id}`, "QUESTION_LEVEL", `${level.id}`, "QUESTION_LIST")).then((questionQuery) => {
                        const questionList = [];
                        questionQuery.forEach((question) => {
                            questionList.push({
                                id: question.id,
                                ...question.data()
                            }
                            )
                        })
                        setQuestions(questionList)
                        setLoaded(true)
                    })
                }
            })
        }).catch(err => console.log(err))
    }

    const handleGetEnglishLevels = async () => {
        const queryListenTestSnapshot = await getDocs(collection(db, "TEST"));
        queryListenTestSnapshot.forEach((doc) => {
            if (doc.data().title === 'Bài tập nghe') {
                setTestId(doc.id)
                getLevelsInQuestions(doc)
            }
        });
    }

    useEffect(() => {
        if (isFocusedScreen) {
            handleGetEnglishLevels();
        } else {
            setQuestions([])
            setLoaded(false)
        }
    }, [level_id, isFocusedScreen]);

    return (
        <React.Fragment>
            {
                loaded ? (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("ListenExercise")}>
                                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Chủ đề</Text>
                        </View>

                        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
                            {
                                questions.map((question, index) => (
                                    <View key={index} style={{
                                        // width: '100%',
                                        flexDirection: 'column',
                                        backgroundColor: '#fff',
                                        marginVertical: 10,
                                        marginHorizontal: 20,
                                        borderRadius: 10,
                                        elevation: 5,
                                        overflow: 'hidden'
                                    }}>
                                        <Image source={{ uri: question.image }} style={{
                                            height: 180,
                                        }} />
                                        <View style={{
                                            marginBottom: 15,
                                            padding: 10,
                                        }}>

                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                            }}>{question.title}</Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginTop: 10,
                                                    paddingHorizontal: 30,
                                                    paddingVertical: 7,
                                                    backgroundColor: '#FB6F43',
                                                    alignSelf: 'flex-start',
                                                    borderRadius: 10,
                                                }}
                                                onPress={() => navigation.navigate("DetailListenExercise", {
                                                    level_id,
                                                    level_name,
                                                    testId,
                                                    levelIdInFB,
                                                    question
                                                })}
                                            >
                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: 16,
                                                }}>Xem ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                ) : <Loading />
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
        left: '40%',
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        textAlign: 'center',
        color: color.txt5,
    },
})

export default ListenExerciseTopic;