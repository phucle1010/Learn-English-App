import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import moment from 'moment';
import db, { collection, query, where, getDocs, orderBy, doc, addDoc } from '../firebase/index'
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window')

const MultipleChoiceExerciseResult = (props) => {
    const { navigation, route } = props
    const { listQuestion, listAnswer, listChosse, idTest } = route.params
    const isFocusedScreen = useIsFocused();
    const [listInco, setListInco] = useState([])
    const [numInSuc, setNumInSuc] = useState(0)

    useEffect(() => {
        if (isFocusedScreen) {
            getResult()
        } else {
            setNumInSuc(0)
            setListInco([])
        }
    }, [isFocusedScreen])

    const getResult = () => {
        setListInco([])
        let numInSucces = 0;
        const listResultInco = []
        listQuestion.forEach((question, i) => {
            const itemAn = listAnswer.find((ans) => { return ans.id == question.id && ans.isTrue == true })
            if (listChosse[i] != itemAn.idA) {
                numInSucces += 1
                const valueincorrect = listAnswer.find((ans) => { return ans.idA == listChosse[i] })
                listResultInco.push({ incorrectId: listChosse[i], answer: itemAn.answer, index: i, incorrect: valueincorrect.answer, ...question })
            }
        });
        setNumInSuc(numInSucces)
        setListInco(listResultInco)
    }

    const AddResult = async (testid, listResultInco) => {
        const docRf = doc(db, "USER", '6xwrfuaVKMyekoJfS4le')
        const colRf = collection(docRf, "TEST");
        const querySnapshot = await addDoc(colRf, {
            date_do: moment().format('YYYY-MM-DD'),
            score: 10 - numInSuc,
            test_id: idTest
        });
        listInco.forEach(async (itemIn) => {
            const docRf2 = doc(docRf, "TEST", querySnapshot.id)
            const colRf2 = collection(docRf2, "INCORRECT_QUES");
            const querySnapshot2 = await addDoc(colRf2, {
                answer_id: itemIn.incorrectId,
                question_id: itemIn.id
            });
        })
        setTimeout(() => {
            navigation.navigate("MultipleChoiceExercise")
        }, 1000)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Text style={styles.txtResult}>Kết quả kiểm tra</Text>
                    <Text style={styles.txthead}>Chúc mừng bạn đã hoàn thành bài kiểm tra!</Text>
                </View>
                {/* Số câu đúng */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.wrapItem}>
                        <Image style={styles.img} source={require('../sources/images/check.png')} resizeMode='stretch' />
                        <Text style={styles.txtItem}> {10 - numInSuc}/10</Text>
                    </View>
                    <View style={styles.wrapItem}>
                        <Image style={styles.img} source={require('../sources/images/wrong.png')} resizeMode='stretch' />
                        <Text style={styles.txtItem}> {numInSuc}/10</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: '#83D670', marginTop: 30, borderRadius: 10 }}
                    onPress={AddResult}>
                    <Text style={[styles.txtbtnRetest, { paddingHorizontal: 50, paddingVertical: 10 }]}>Hoàn thành</Text>
                </TouchableOpacity>
                {listInco.length > 0 &&
                    <View style={styles.btnRetest}>
                        <Text style={styles.txtbtnRetest}>Các câu trả lời sai</Text>
                    </View>}
                {listInco.map((item, i) =>
                    <View style={styles.itemInc} key={i}>
                        <Text style={[styles.txtitemInc, { fontSize: 18 }]}>Câu {item.index + 1}: {item.question}</Text>
                        <View style={{ flexDirection: 'row', backgroundColor: '#F55954', padding: 5, borderRadius: 10, justifyContent: 'space-between', marginVertical: 5, marginTop: 10 }}>
                            <Text style={styles.txtitemInc}>Your chossed:</Text>
                            <Text style={styles.txtitemInc}>{item.incorrect}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#83D670', padding: 5, borderRadius: 10, justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={styles.txtitemInc}>Correct:</Text>
                            <Text style={styles.txtitemInc}>{item.answer}</Text>
                        </View>
                    </View>
                )}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 100
    },
    headcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 130,
        width: width,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 18,
        marginHorizontal: 20,
        color: 'black',
        textAlign: 'center'
    },
    txtResult: {
        fontSize: 27,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 'bold',
        color: '#54b0fe',
        marginTop: 30,
    },
    wrapItem: {
        width: 136,
        height: 136,
        marginTop: 40,
        marginHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        backgroundColor: '#ffff',
        elevation: 8,
    },
    img: {
        width: '35%',
        height: '35%',
        marginTop: 5
    },
    txtItem: {
        fontSize: 22,
        fontFamily: fontStyle.fontfamily_2,
        color: 'black',
        marginTop: 10,
    },
    wrapEvaluate: {
        width: 330,
        height: 170,
        borderRadius: 15,
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    txtEvaluateNow: {
        fontSize: 20,
        fontWeight: 300,
        fontFamily: fontStyle.fontfamily_2,
        color: 'black',
        paddingLeft: 10,
    },
    btnRetest: {
        width: width,
        height: 50,
        marginTop: 33,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.btn_color4,
    },
    txtbtnRetest: {
        fontSize: 19,
        fontWeight: 'bold',
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    txtitemInc: {
        fontSize: 17,
        fontFamily: fontStyle.fontfamily_2,
        color: 'black',
        fontWeight: 'bold'
    },
    itemInc: {
        width: width,
        backgroundColor: '#cde7fe',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomColor: color.btn_color4,
        borderBottomWidth: 2
    }
});
export default MultipleChoiceExerciseResult;