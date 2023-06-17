import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Youtube from 'react-native-youtube-iframe';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import { getSubtitles } from 'youtube-captions-scraper';

import Loading from '../components/Loading'
import { useIsFocused } from '@react-navigation/native';

const DetailVideo = ({ navigation, route }) => {
    const video = route.params.video
    const url = video.snippet.thumbnails.default.url;
    const indexOfIdInVideoURL = 4
    const video_id = url.split('/')[indexOfIdInVideoURL]
    const isFocusedScreen = useIsFocused();
    const [subtitles, setSubtitles] = useState([])
    const [elapsed, setElapsed] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const playerRef = useRef();
    const subTextRef = useRef();
    const scrollRef = useRef();

    var playInterval = null;

    useEffect(() => {
        if (isFocusedScreen) {
            getSubtitles({
                videoID: video_id,
                lang: 'en'
            }).then(captions => {
                setSubtitles(captions);
                setIsLoaded(true);
            }).catch(err => console.log(err))
        } else {
            setSubtitles([])
            setIsLoaded(false);
            setElapsed(0)
        }
        return () => clearInterval(playInterval)
    }, [isFocusedScreen])

    useEffect(() => {
        if (isPlaying) {
            playInterval = setInterval(() => {
                playerRef.current?.getDuration().then((duration) => elapsed < duration * 1000 && setElapsed(prev => prev + 1000))
            }, 1000)
        } else {
            clearInterval(playInterval)
        }
        return () => clearInterval(playInterval)
    }, [isPlaying])

    const handleStateChangeInVideo = (state) => {
        if (state === 'playing') {
            setIsPlaying(true)
        } else if (state === 'paused') {
            setIsPlaying(false);
        }
    }

    const formatTime = (time) => {
        const min = parseInt(time / 60);
        const sec = parseInt(time % 60);
        return `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`
    }

    const focusTextColor = (current, next) => {
        if (Object.keys(next).length === 0 && elapsed > current.start * 1000) {
            return true;
        }
        if (elapsed > current.start * 1000 && elapsed < next.start * 1000) {
            return true;
        }
        return false;
    }

    const changeCurrentSub = (index, color) => {
        scrollRef.current.scrollTo({
            y: index * 44,
            animated: true
        })
        return color
    }

    return (
        <React.Fragment>
            {
                isLoaded ? (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Videos")}>
                                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />

                            </TouchableOpacity>
                            <Text style={styles.txthead}>Video</Text>
                        </View>
                        <Text style={styles.txtContentVideo}>{video.snippet.title}</Text>

                        <Youtube
                            videoId={video_id}
                            width={'100%'}
                            height={220}
                            onChangeState={handleStateChangeInVideo}
                            ref={playerRef}
                        />
                        {/* <TouchableOpacity style={styles.btnSaveVideo}>
                            <Text style={styles.txtbtnSave}>Lưu video</Text>
                        </TouchableOpacity> */}
                        <Text style={{
                            marginTop: 15,
                            marginBottom: 10,
                            marginHorizontal: 15,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Subtitle</Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} ref={scrollRef}>
                            <View style={{ height: 50 }}></View>
                            {
                                subtitles.length > 0 && subtitles.map((subtitle, index) => <View key={index} style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 10 }}>
                                    <Text style={{ fontWeight: 'bold', marginRight: 15, fontSize: 16 }}>{formatTime(subtitle.start)}</Text>
                                    <Text style={{
                                        flex: 1,
                                        fontSize: 16,
                                        color: focusTextColor(subtitle, index === subtitles.length - 1 ? {} : subtitles[index + 1]) ? changeCurrentSub(index + 1, '#6495ED') : '#797979'
                                    }}>{subtitle.text.replace(subtitle.text[0], subtitle.text[0].toUpperCase())}</Text>
                                </View>)
                            }
                        </ScrollView>
                    </View>
                ) : <Loading />
            }
        </React.Fragment>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        paddingBottom: 80,
        backgroundColor: color.btn_color3,
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
        width: '100%',
        marginTop: 20,
    },
    txtContentVideo: {
        marginHorizontal: 15,
        marginBottom: 20,
        fontSize: 22,
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt1,
        fontWeight: 'bold',
    },
    image: {
        // marginHorizontal: -15,
        height: 190,
        borderRadius: 10,
        marginTop: 20,
    },
    btnSaveVideo: {
        marginHorizontal: 15,
        width: 114,
        height: 31,
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
    txtDesclVideo: {
        marginHorizontal: 15,
        fontSize: 16,
        fontStyle: 'italic',
        fontFamily: fontStyle.fontfamily_2,
        color: color.txt4,
        textAlign: 'justify',
    },
});

export default DetailVideo;
