import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

export default function SimpleLottie() {
    return (
        <View style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <LottieView
                source={require("../sources/lottie/bouncy-slime.json")}
                style={styles.animation}
                autoPlay
            />
        </View>
    );
}

const styles = StyleSheet.create({
    animation: {
        width: '60%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});