import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const TestResult = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Kiểm tra trình độ</Text>
                </View>
                <Text style={styles.txtResult}>Kết quả kiểm tra</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.wrapItem}>
                        <Image style={styles.img} source={require('../sources/images/check.png')} />
                        <Text style={styles.txtItem}> 15/20</Text>
                    </View>
                    <View style={styles.wrapItem}>
                        <Image style={styles.img} source={require('../sources/images/wrong.png')} />
                        <Text style={styles.txtItem}> 5/20</Text>
                    </View>
                </View>
                <View style={styles.wrapEvaluate}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.txtEvaluateNow}>Trình độ hiện tại của bạn là </Text>
                        <Text style={[styles.txtEvaluateNow, { fontWeight: 'bold' }]}> B1</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginHorizontal: 20,
                            marginTop: 15,
                        }}
                    >
                        <Text style={[styles.txtEvaluateNow, { fontWeight: 'bold' }]}>Lời khuyên: </Text>

                        <Text style={styles.txtEvaluateNow}>
                            Bạn nên cải thiện về từ vựng và ôn tập thường xuyên cấu trúc ngữ pháp
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnRetest}>
                    <Text style={styles.txtbtnRetest}>Xem lại bài làm</Text>
                </TouchableOpacity>
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
        marginLeft: 60,
        color: color.txt5,
    },
    txtResult: {
        fontSize: 22,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 400,
        color: 'black',
        marginTop: 80,
    },
    wrapItem: {
        width: 136,
        height: 136,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10,
        elevation: 2,
    },
    img: {
        width: 60,
        height: 60,
    },
    txtItem: {
        fontSize: 22,
        fontWeight: 300,
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
        width: 346,
        height: 46,
        marginTop: 33,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: color.btn_color4,
    },
    txtbtnRetest: {
        fontSize: 18,
        fontWeight: 500,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
});
export default TestResult;
