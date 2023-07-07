import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Youtube from 'react-native-youtube-iframe';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import { getSubtitles } from 'youtube-captions-scraper';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import db, { collection, addDoc, getDocs, doc, where, query, deleteDoc } from '../firebase';

import Loading from '../components/Loading'

const DetailVideo = ({ navigation, route }) => {
    const user = useSelector(state => state.user)
    const video = route.params.video
    const prevScreen = route.params.prevScreen;
    const url = video.snippet.thumbnails.default.url;
    const indexOfIdInVideoURL = 4
    const video_id = url.split('/')[indexOfIdInVideoURL]
    const isFocusedScreen = useIsFocused();
    const [userID, setUserID] = useState('');
    const [likedVideo, setLikedVideo] = useState(false)
    const [existedVideoDocument, setExistedVideoDocument] = useState(false)
    const [toggleActionVideo, setToggleActionVideo] = useState(false)
    const [subtitles, setSubtitles] = useState([])
    const [elapsed, setElapsed] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const playerRef = useRef();
    const subTextRef = useRef();
    const scrollRef = useRef();

    var playInterval = null;

    const getUserID = async () => {
        const querySnapshot = await getDocs(collection(db, "USER"));
        querySnapshot.forEach((doc) => {
            if (doc.data().id === user.id) {
                setUserID(doc.id);
            }
        });
    };

    useEffect(() => {
        if (isFocusedScreen) {
            getUserID()
            checkSavedVideo()
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
    }, [isFocusedScreen, toggleActionVideo])

    useEffect(() => {
        if (isPlaying) {
            playInterval = setInterval(() => {
                playerRef.current?.getDuration().then((duration) => elapsed < duration * 950 && setElapsed(prev => prev + 950))
            }, 950)
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
        if (Object.keys(next).length === 0 && elapsed > current.start * 950) {
            return true;
        }
        if (elapsed > current.start * 950 && elapsed < next.start * 950) {
            return true;
        }
        return false;
    }

    const changeCurrentSub = (index, color) => {
        subTextRef?.current?.measure((x, y, width, height) => {
            scrollRef?.current?.scrollTo({
                y: index * height,
                animated: true
            })
        })
        return color
    }

    const saveVideo = async () => {
        if (!likedVideo) {
            try {
                const userRef = doc(db, 'USER', userID);
                const videoCollectionRef = collection(userRef, 'MY_VIDEO');
                await addDoc(videoCollectionRef, { ...video });
                setToggleActionVideo(prev => !prev)
            } catch (error) {
                console.log('Lỗi khi lưu sách:', error);
            }
        } else {
            if (existedVideoDocument) {
                deleteVideo(userID, video.id)
            }
        }
    };

    const deleteVideo = async (userId, videoId) => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', user.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const myVideoCollectionRef = collection(userDoc.ref, 'MY_VIDEO');
                const videoQuerySnapshot = await getDocs(myVideoCollectionRef);

                const savedVideos = videoQuerySnapshot.docs.map((doc) => ({
                    video_document_id: doc.id,
                    ...doc.data()
                }));

                const savedVideoInfo = savedVideos.filter(video => video.id === videoId)[0];
                const deletedVideoId = savedVideoInfo.video_document_id;

                const userDocRef = doc(db, 'USER', userId);
                const videoDocRef = doc(userDocRef, 'MY_VIDEO', deletedVideoId);
                await deleteDoc(videoDocRef);
                setToggleActionVideo(prev => !prev)
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách từ vựng:', error);
        }
    };

    const checkSavedVideo = async () => {
        try {
            const usersCollectionRef = collection(db, 'USER');
            const q = query(usersCollectionRef, where('id', '==', user.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const myVideoCollectionRef = collection(userDoc.ref, 'MY_VIDEO');
                const videoQuery = query(myVideoCollectionRef, where('id', '==', video.id));
                const videoSnapshot = await getDocs(videoQuery);

                if (!videoSnapshot.empty) {
                    setLikedVideo(true);
                    setExistedVideoDocument(true)
                    console.log('Video đã được lưu trước đó.');
                } else {
                    setLikedVideo(false);
                    console.log('Video chưa được lưu trước đó.');
                }
            } else {
                console.log('Không tìm thấy người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra sách:', error);
        }
    }

    return (
        <React.Fragment>
            {
                isLoaded ? (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    left: 30,
                                    height: '100%',
                                    justifyContent: 'center',
                                }}
                                onPress={() => navigation.navigate(prevScreen)}
                            >
                                <Icon name='arrow-left' style={{ color: color.txt5, fontSize: 23, fontWeight: 'bold' }} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    height: '100%',
                                    justifyContent: 'center',
                                }}
                                onPress={saveVideo}
                            >
                                {
                                    <IonIcon name={likedVideo ? 'heart' : 'heart-outline'} style={{ color: '#FAA0A0', fontSize: 30, fontWeight: 'bold' }} />
                                }
                            </TouchableOpacity>
                            {/* <Text style={styles.txthead}>Video</Text> */}
                        </View>
                        <Text style={styles.txtContentVideo}>{video.snippet.title}</Text>

                        <Youtube
                            videoId={video_id}
                            width={'100%'}
                            height={220}
                            onChangeState={handleStateChangeInVideo}
                            ref={playerRef}
                        />
                        <Text style={{
                            marginTop: 15,
                            marginBottom: 10,
                            marginHorizontal: 15,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Subtitle</Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} ref={scrollRef}>
                            {
                                subtitles.length > 0 && subtitles.map((subtitle, index) => <View key={index} style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 10 }}>
                                    <Text style={{ fontWeight: 'bold', marginRight: 15, fontSize: 16 }}>{formatTime(subtitle.start)}</Text>
                                    <Text style={{
                                        flex: 1,
                                        fontSize: 16,
                                        color: focusTextColor(subtitle, index === subtitles.length - 1 ? {} : subtitles[index + 1]) ? changeCurrentSub(index + 1, '#6495ED') : '#797979'
                                    }} ref={subTextRef}>{subtitle.text.replace(subtitle.text[0], subtitle.text[0].toUpperCase())}</Text>
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
        backgroundColor: color.btn_color3,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
