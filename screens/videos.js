import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { useIsFocused } from '@react-navigation/native';

import Loading from '../components/Loading'

const VideoItem = ({ video, navigation }) => {
    return (
        <TouchableOpacity style={{
            marginBottom: 50,
            paddingBottom: 20,
            backgroundColor: '#fafafa'
        }}
            onPress={() => navigation.navigate("DetailVideo", {
                video,
                prevScreen: 'Videos'
            })}
        >
            <Image source={{ uri: video.snippet.thumbnails.medium.url }} style={{
                width: '100%',
                height: 200,
            }}
                resizeMode='stretch'
            />
            <View style={{
                marginTop: 5,
                flexDirection: 'row',
                paddingHorizontal: 5,
                alignItems: 'center',
            }}>
                <Image source={require('../sources/images/ted-ed.png')} style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    borderRadius: 100
                }} />
                <View style={{
                    flex: 1,
                    marginLeft: 10,
                }}>
                    <Text style={{
                        flex: 1,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>{video.snippet.title}</Text>
                    <Text style={{ fontSize: 15, fontStyle: 'italic' }}>@{video.snippet.channelTitle}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Videos = ({ navigation }) => {
    const isFocusedScreen = useIsFocused();
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getVideos = async () => {
        await fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails,player&channelId=UCsooa4yRKGN_zEE8iknghZA&key=AIzaSyAgF7tOtkCk10IWY19NxG6-ELRv2PXDB3w&maxResults=50')
            .then(res => res.json())
            .then(data => setVideos(data.items))
            .then(() => setIsLoading(false))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        if (isFocusedScreen) {
            getVideos()
        } else {
            setVideos([])
            setIsLoading(true)
        }
    }, [isFocusedScreen])

    return (
        <React.Fragment>
            {
                isLoading ? <Loading /> : (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    left: 30,
                                    justifyContent: 'center',
                                }}
                                onPress={() => navigation.navigate("Home")}>
                                <Icon name='arrow-left' style={{ color: color.txt5, fontSize: 23, fontWeight: 'bold' }} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Video</Text>
                        </View>

                        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
                            {
                                videos.length > 0 && videos.map((video, index) => {
                                    return (
                                        <VideoItem video={video} key={index} navigation={navigation} />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                )
            }
        </React.Fragment>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: '100%',
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
    },
    searchcontainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: 306,
        height: 40,
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 17,
        borderWidth: 1,
        borderColor: color.bodercolor3,
        alignItems: 'center',
    },
    search: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 14,
        fontStyle: 'italic',
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 15,
    },
    txtlistvideos: {
        marginBottom: 10,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt4,
    },
    itemvideos: {
        flexDirection: 'row',
        width: 347,
        height: 94,
        borderBottomWidth: 1,
        borderColor: color.bodercolor3,
        justifyContent: 'space-between',
    },
    img: {
        width: 101,
        height: 66,
        borderRadius: 10,
        marginTop: 12,
        marginRight: 18,
    },
    txtvideos: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 400,
        color: 'black',
        paddingLeft: 16,
        paddingTop: 12,
    },
    txttime: {
        fontSize: 14,
        fontFamily: fontStyle.fontfamily_1,
        color: color.txt5,
        marginTop: 10,
        marginLeft: 16,
    },
});

export default Videos;
