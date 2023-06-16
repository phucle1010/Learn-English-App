import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
const { width, height } = Dimensions.get('window')
const Test = ({ navigation, route }) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Bài tập</Text>
                </View>
                <View style={styles.bodycontainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('ListTestTN') }}>
                        <Image source={require('../sources/images/trng.png')} style={styles.img}></Image>
                        <Text style={styles.txtbtn}>Trắc nghiệm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => { }}>
                        <Image source={require('../sources/images/dk.jpg')} style={styles.img}></Image>
                        <Text style={styles.txtbtn}>Điền khuyết</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => { }}>
                        <Image source={require('../sources/images/tnghe.jpg')} style={styles.img}></Image>
                        <Text style={[styles.txtbtn, { marginLeft: 30 }]}>Nghe</Text>
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
        height: 60,
        width: 390,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 23,
        marginLeft: 90,
        color: 'black',
    },
    bodycontainer: {
        height: height - 65,
        width: width,
        backgroundColor: 'white',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
    },
    btn: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 70,
        width: 200,
        elevation: 10,
        marginVertical: 10,
        marginHorizontal: (width - 200) / 2,
        borderRadius: 5,
        flexDirection: 'row'
    },
    img: {
        height: 70,
        width: 70,
    },
    txtbtn: {
        fontSize: 18,
        marginLeft: 5,
        color: 'black',
        fontWeight: 'bold'
    }
});
export default Test;
