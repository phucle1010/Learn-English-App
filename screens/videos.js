import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import { useIsFocused } from '@react-navigation/native';

import Loading from '../components/Loading'

const VideoItem = ({ video, navigation }) => {
    return (
        <TouchableOpacity style={{
            marginBottom: 50,
            paddingBottom: 20,
            backgroundColor: '#fafafa'
        }}
            onPre
            onPress={() => navigation.navigate("DetailVideo", {
                video
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
            {/* <Text style={{ marginTop: 10, paddingHorizontal: 8, fontSize: 16 }}>{video.snippet.description}</Text> */}
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
                            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                            </TouchableOpacity>
                            <Text style={styles.txthead}>Video</Text>
                        </View>
                        {/* <View style={styles.searchcontainer}>
                <TextInput style={styles.search} placeholder="Tìm kiếm sách" />
                <Image style={styles.icon} source={require('../sources/icons/search.png')} />
            </View> */}
                        <Text style={styles.txtlistvideos}>Danh sách video</Text>
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
        paddingBottom: 190,

    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: '100%',
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
