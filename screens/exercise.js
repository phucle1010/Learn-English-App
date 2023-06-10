import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const Exercise = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headcontainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                </TouchableOpacity>
                <Text style={styles.txthead}>Bài tập</Text>
            </View>
            <View style={styles.excerciseContainer}>
                <TouchableOpacity style={styles.wrapItemExercise} onPress={() => navigation.navigate("ListenExercise")}>
                    <Image style={styles.img} source={require('../sources/images/headphones.png')} />
                    <Text style={styles.txtItem}>Nghe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapItemExercise}>
                    <Image style={styles.img} source={require('../sources/images/problem.png')} />
                    <Text style={styles.txtItem}>Trắc nghiệm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapItemExercise}>
                    <Image style={styles.img} source={require('../sources/images/clipboard.png')} />
                    <Text style={styles.txtItem}>Điền chỗ trống</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#fafafa'
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
        marginLeft: 100,
        color: color.txt5,
    },
    excerciseContainer: {
        marginTop: 50,
        paddingTop: 80,
        width: '100%',
        height: 500,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        elevation: 5,
    },
    wrapItemExercise: {
        width: 135,
        height: 135,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginHorizontal: 30,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 2,

    },
    img: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
    txtItem: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 300,
        fontFamily: fontStyle.fontfamily_1,
        color: color.txt4,
    },
});

export default Exercise;
