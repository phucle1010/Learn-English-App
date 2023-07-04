import React, { useRef } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, TouchableHighlightComponent } from 'react-native';
import color from '../contains/color';
import fontStyle from '../contains/fontStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'

import Header from '../components/Header';

const WordItem = () => {

    return <View style={styles.wrapwords} >
        <Text style={styles.txtWord}>Hello</Text>
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginRight: 10 }} >
                <Icon name='eye' style={{ ...styles.removeIcon, color: '#FAA0A0' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapbtn}>
                <Icon name='trash' style={styles.removeIcon} />
            </TouchableOpacity>
        </View>
    </View>
}

const NewsItem = ({ displayText }) => {
    return <View style={{ ...styles.wrapItem, height: 170 }}>
        <View style={styles.detailContainer}>
            <Text style={{ marginBottom: 5, paddingVertical: 3, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#dcdcdc', alignSelf: 'flex-start' }}>History</Text>
            <Text style={styles.txtname}>{displayText('Was the last battle of the American Revolution fought in India? A growing number of historians think so', 'news')}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text>Brad Lendon, </Text>
                <Text>Tue July 4, 2023</Text>
            </View>
            <TouchableOpacity style={{ ...styles.wrapbtn, backgroundColor: '#FAA0A0', alignSelf: 'flex-start', marginTop: 15, paddingVertical: 6, paddingHorizontal: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='trash' style={{ ...styles.removeIcon, color: '#fff', fontSize: 15, marginRight: 5 }} />
                <Text style={{ color: '#fff', fontSize: 15 }}>Xóa tin tức</Text>
            </TouchableOpacity>
        </View>
        <Image style={styles.img} source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/230627162557-01-last-battle-american-revolutionary-war-india-intl-hnk-ml.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp' }} />
    </View>
}

const VideoItem = ({ displayText }) => {
    return <View style={{ ...styles.wrapItem, flexDirection: 'column', width: 200 }}>
        <View>
            <Image style={{ ...styles.img, height: 200, width: 170 }} source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/230627162557-01-last-battle-american-revolutionary-war-india-intl-hnk-ml.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp' }} />
            <TouchableOpacity style={{ ...styles.wrapbtn, backgroundColor: '#FAA0A0', alignSelf: 'flex-start', padding: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10, right: -10 }}>
                <Icon name='play' style={{ ...styles.removeIcon, color: '#fff', fontSize: 15 }} />
            </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
            <Text style={styles.txtname}>{displayText('Was the last battle of the American Revolution fought in India? A growing number of historians think so', 'video')}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text>Ted-ed</Text>
            </View>
        </View>
    </View>
}

const Library = () => {

    const displayText = (text, type) => {
        switch (type) {
            case 'news':
                return text.length < 35
                    ? `${text}`
                    : `${text.substring(0, 32)}...`
            case 'video': return text.length < 20
                ? `${text}`
                : `${text.substring(0, 18)}...`
            default:
                break;
        }

    }

    const wordRef = useRef();

    const handleShowWord = () => {
        wordRef?.current?.measure((x, y, width, height) => {
            console.log(height);
        })
    }


    return (
        <SafeAreaView style={styles.main}>
            <Header />
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Word */}
                    <View style={styles.containerWordGroup}>
                        <TouchableOpacity onPress={() => handleShowWord()}>
                            <Text style={styles.txtwordGroup} >Từ vựng đã lưu</Text>
                        </TouchableOpacity>
                    </View>
                    <WordItem />
                    {/* News */}
                    <View style={styles.containerWordGroup} >
                        <Text style={styles.txtwordGroup} >Tin tức đã lưu</Text>
                    </View>
                    <NewsItem displayText={displayText} />
                    {/* Video */}
                    <View style={styles.containerWordGroup}>
                        <Text style={styles.txtwordGroup}>Video đã lưu</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -10 }}>
                        <VideoItem displayText={displayText} />
                        <VideoItem displayText={displayText} />
                        <VideoItem displayText={displayText} />
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        height: '100%',
        paddingBottom: 80,
    },
    scrollContainer: {
        marginTop: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
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
        fontFamily: fontStyle.fontfamily_2,
        fontSize: 20,
        marginLeft: 80,
        color: color.txt5,
    },
    containerWordGroup: {
        width: '100%',
        alignItems: 'flex-start',
    },
    txtwordGroup: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 'bold',
        color: color.txt4,
        marginTop: 30,
        marginBottom: 20,
    },
    wrapwords: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: color.btn_color3,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        elevation: 2,
    },
    txtWord: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 600,
        color: color.txt1,
        marginLeft: 20,
    },
    wrapbtn: {
        marginRight: 20,
    },
    removeIcon: {
        fontSize: 24,
        fontWeight: 400,
        fontFamily: fontStyle.fontfamily_2,
        color: color.btn_color4,
    },
    wrapItem: {
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 20,
        backgroundColor: color.btn_color3,
        alignItems: 'center',
        overflow: 'hidden',
    },
    img: {
        width: 150,
        height: '100%',
        borderRadius: 20,
    },
    detailContainer: {
        marginTop: 10,
        marginLeft: 10,
        flex: 1,
        alignSelf: 'flex-start',
        marginRight: 15,
    },
    txtname: {
        fontSize: 18,
        fontWeight: 600,
        fontFamily: fontStyle.fontfamily_1,
        color: color.txt1,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Library;
