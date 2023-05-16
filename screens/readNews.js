import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const ReadNews = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Tin tức</Text>
                </View>
                <View style={styles.wrapNews}>
                    <Text style={styles.txtContentNews}>
                        Elon Musk warns AI could cause 'civilization destruction' even as he invests in it
                    </Text>
                    <View style={styles.wrapInfoNews}>
                        <Text style={styles.txtInfoNews}>
                            By Clare Duffy and Ramishah Maruf, CNN 9:35 PM EDT, Mon April 17, 2023
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.txtDetailNews}>
                            New York CNN — Elon Musk warned in a new interview that artificial intelligence could lead
                            to “civilization destruction,” even as he remains deeply involved in the growth of AI
                            through his many companies, including a rumored new venture.
                        </Text>
                        <Text style={styles.txtDetailNews}>
                            “AI is more dangerous than, say, mismanaged aircraft design or production maintenance or bad
                            car production, in the sense that it is, it has the potential — however small one may regard
                            that probability, but it is non-trivial — it has the potential of civilization destruction,”
                            Musk said in his interview with Tucker Carlson, which is set to air in two parts on Monday
                            and Tuesday nights.
                        </Text>
                        <Text style={styles.txtDetailNews}>
                            Musk has repeatedly warned recently of the dangers of AI, amid a proliferation of AI
                            products for general consumer use, including from tech giants like Google and Microsoft.
                            Musk last month also joined a group of other tech leaders in signing an open letter calling
                            for a six month pause in the “out of control” race for AI development.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.btnSaveNews}>
                        <Text style={styles.txtbtnSave}>Lưu tin tức</Text>
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
        color: color.txt5,
    },
    wrapNews: {
        width: 347,
        height: 1254,
        backgroundColor: color.btn_color3,
        borderRadius: 10,
        marginTop: 20,
        elevation: 2,
    },
    txtContentNews: {
        fontSize: 22,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
        paddingTop: 20,
        paddingHorizontal: 15,
        fontWeight: 'bold',
    },
    wrapInfoNews: {
        width: 245,
        height: 36,
        marginLeft: 90,
    },
    txtInfoNews: {
        fontSize: 14,
        fontWeight: 300,
        fontStyle: 'italic',
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt5,
    },
    btnSaveNews: {
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
    txtDetailNews: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt4,
        paddingHorizontal: 15,
        textAlign: 'justify',
        paddingTop: 15,
    },
});

export default ReadNews;
