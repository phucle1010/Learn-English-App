import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const DetailVideo = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Video</Text>
                </View>
                <View style={styles.detailcontainer}>
                    <Text style={styles.txtContentVideo}>How your phone learned to see in the dark</Text>
                    <Image style={styles.image} source={require('../sources/images/video.png')} />
                    <TouchableOpacity style={styles.btnSaveVideo}>
                        <Text style={styles.txtbtnSave}>Lưu video</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.txtDetailVideo}>
                            New York CNN — Open up Instagram at any given moment and it probably won’t take long to find
                            crisp pictures of the night sky, a skyline after dark or a dimly lit restaurant. While shots
                            like these used to require advanced cameras, they’re now often possible from the phone you
                            already carry around in your pocket.
                        </Text>
                        <Text style={styles.txtDetailVideo}>
                            Tech companies such as Apple, Samsung and Google are investing resources to improve their
                            night photography options at a time when camera features have increasingly become a key
                            selling point for smartphones that otherwise largely all look and feel the same from one
                            year to the next...
                        </Text>
                    </View>
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
        color: color.txt5,
    },
    detailcontainer: {
        width: 347,
        height: 1254,
        backgroundColor: color.btn_color3,
        borderRadius: 10,
        marginTop: 20,
        elevation: 2,
    },
    txtContentVideo: {
        fontSize: 22,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
        paddingTop: 20,
        paddingHorizontal: 15,
        fontWeight: 'bold',
    },
    image: {
        width: 314,
        height: 145,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 20,
    },
    btnSaveVideo: {
        width: 114,
        height: 31,
        marginLeft: 15,
        backgroundColor: color.btn_color4,
        borderRadius: 30,
        marginTop: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtbtnSave: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txtbtn_color1,
    },
    txtDetailVideo: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt4,
        paddingHorizontal: 15,
        textAlign: 'justify',
        paddingTop: 15,
    },
});

export default DetailVideo;
