import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const GrammarTheory = () => {
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
        marginLeft: 80,
        color: color.txt5,
    },
    taskbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 257,
        height: 29,
        marginHorizontal: 55,
        marginLeft: 9,
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
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_2,
    },
    exercise: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 400,
        color: color.txt4,
    },
});

export default GrammarTheory;
