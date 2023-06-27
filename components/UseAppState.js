import { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import firebase from 'firebase';

const UseAppState = () => {
    const [appState, setAppState] = useState(AppState.currentState);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [usageTime, setUsageTime] = useState(0);

    const handleAppStateChange = (nextAppState) => {
        if (appState === 'active' && nextAppState.match(/inactive|background/)) {
            setStartTime(Date.now());
            setAppState(nextAppState);
        } else if (appState.match(/inactive|background/) && nextAppState === 'active') {
            const timeSpent = Date.now() - startTime;
            setEndTime(Date.now());
            setUsageTime((prevUsageTime) => prevUsageTime + timeSpent);
            setAppState(nextAppState);
        } else {
            setAppState(nextAppState);
        }
    };

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, [appState]);

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const db = firebase.firestore();
        const usageRef = db.collection('usage').doc(currentDate);

        if (endTime !== null) {
            usageRef.get().then((doc) => {
                if (doc.exists) {
                    usageRef.update({
                        usageTime: firebase.firestore.FieldValue.increment(usageTime),
                    });
                } else {
                    usageRef.set({ usageTime: usageTime });
                }
            });
        }
    }, [endTime]);

    return usageTime;
};

export default UseAppState;