import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const ReviewResult = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Kiểm tra trình độ</Text>
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
                        <View style={styles.wrapAnswer}>
                            <Text style={styles.txtAnswer}>Lời giải:...</Text>
                        </View>
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
        marginLeft: 50,
        color: color.txt5,
    },
    containerTest: {
        flexDirection: 'row',
        width: 380,
        height: 450,
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
        height: 390,
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
    wrapAnswer: {
        width: 314,
        height: 118,
        marginTop: 40,
        borderRadius: 15,
        backgroundColor: color.btn_color3,
        justifyContent: 'center',
        elevation: 3,
        marginBottom: 5,
        paddingLeft: 15,
    },
    txtAnswer: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 700,
        color: 'black',
    },
});

export default ReviewResult;
