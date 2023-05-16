import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const GrammarExercise = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Tên ngữ pháp</Text>
                </View>
                <View style={styles.taskbar}>
                    <TouchableOpacity>
                        <Text style={styles.theory}> Lý thuyết</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtdelimiter}>|</Text>
                    <TouchableOpacity>
                        <Text style={styles.exercise}> Bài tập</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.resutlContainer}>
                    <Text style={styles.txtResutl}>Số câu trả lời đúng</Text>
                    <Text style={styles.txtnumResutl}>0/X</Text>
                </View>
                <View style={styles.containerTest}>
                    <TouchableOpacity>
                        <Image style={styles.icon} source={require('../sources/icons/arrowleft1.png')} />
                    </TouchableOpacity>

                    <View style={styles.contentQuestion}>
                        <View style={styles.wrapQuestion}>
                            <Text style={styles.txtQuestion}>Nội dung câu hỏi</Text>
                        </View>
                        <TouchableOpacity style={styles.wrapItemChoose}>
                            <Text style={styles.txtItemChoose}> Đáp án A</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.wrapItemChoose}>
                            <Text style={styles.txtItemChoose}> Đáp án B</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.wrapItemChoose}>
                            <Text style={styles.txtItemChoose}> Đáp án C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.wrapItemChoose}>
                            <Text style={styles.txtItemChoose}> Đáp án D</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Image style={styles.icon} source={require('../sources/icons/arrowright.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        marginLeft: 70,
        color: color.txt5,
    },
    taskbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 257,
        height: 29,
        marginHorizontal: 55,
        marginLeft: 9,
        marginTop: 10,
    },
    theory: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 400,
        color: color.txt6,
    },
    txtdelimiter: {
        color: color.txt4,
        fontSize: 20,
        height: 40,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_2,
    },
    exercise: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 400,
        color: color.txt4,
    },
    resutlContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 79,
        marginRight: 30,
        width: 300,
        height: 25,
        // backgroundColor:'#fff',
        // elevation:2,
    },
    txtResutl: {
        fontSize: 16,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 400,
        color: 'black',
        //marginRight: 30,
    },
    txtnumResutl: {
        fontSize: 16,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        color: 'black',
        marginLeft: 20,
    },
    containerTest: {
        flexDirection: 'row',
        width: 380,
        height: 290,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: color.bodercolor2,
        marginTop: 20,
        // elevation: 2,
    },
    icon: {
        width: 24,
        height: 24,
    },
    contentQuestion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 320,
        height: 230,
        flexWrap: 'wrap',
        //backgroundColor:'#fff'
    },
    wrapQuestion: {
        marginTop: 5,
        marginLeft: 3,
        width: 314,
        height: 82,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: color.bodercolor3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtQuestion: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 400,
        color: color.txt1,
    },
    wrapItemChoose: {
        width: 140,
        height: 39,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.btn_color6,
        marginTop: 30,
    },
    txtItemChoose: {
        fontSize: 16,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 300,
        color: 'black',
    },
});

export default GrammarExercise;
