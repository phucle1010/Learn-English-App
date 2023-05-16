import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const WordGroup = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Bộ từ vựng</Text>
                </View>
                <View
                    style={{
                        width: 330,
                        alignItems: 'flex-start',
                    }}
                >
                    <Text style={styles.txtwordGroup}>Bộ từ vựng</Text>
                </View>

                <View style={styles.wordGroupContainer}>
                    <TouchableOpacity style={styles.wrapWordGroup}>
                        <Image style={styles.img} source={require('../sources/images/school.png')} />
                        <Text style={styles.txtimg}>Trung học phổ thông</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapWordGroup}>
                        <Image style={styles.img} source={require('../sources/images/Toeic.png')} />
                        <Text style={styles.txtimg}>TOEIC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapWordGroup}>
                        <Image style={styles.img} source={require('../sources/images/IETLS.png')} />
                        <Text style={styles.txtimg}>IELTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapWordGroup}>
                        <Image style={styles.img} source={require('../sources/images/child.png')} />
                        <Text style={styles.txtimg}>Trẻ em</Text>
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
        marginLeft: 100,
    },
    txtwordGroup: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 'bold',
        color: color.txt4,
        marginTop: 30,
    },
    wordGroupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    wrapWordGroup: {
        width: 150,
        height: 150,
        backgroundColor: color.btn_color3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginHorizontal: 20,
        marginTop: 20,
    },
    img: {
        width: 67,
        height: 67,
        paddingTop: 10,
    },
    txtimg: {
        fontSize: 16,
        fontFamily: fontStyle.fontfamily_2,
        paddingTop: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
});

export default WordGroup;
