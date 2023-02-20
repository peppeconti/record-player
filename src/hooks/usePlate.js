import { useReducer, useState, useEffect, useCallback } from 'react';
import tracks from '../utils/tracks.js';
import { useAnimationControls } from 'framer-motion';

const initialState = {
    plate: tracks[0],
    audio: tracks[0].audio,
    animationIsRunning: false,
    playerIsOn: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'changePlate':
            return { ...state, plate: tracks[action.plateIndex] };
        case 'changeAudio':
            return { ...state, audio: tracks[action.plateIndex].audio };
        case 'animationIsRunning':
            return { ...state, animationIsRunning: !state.animationIsRunning };
        case 'play':
            return { ...state, playerIsOn: action.payload };
        default:
            return state;
    }
}

const usePlate = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [alert, setAlert] = useState(false);

    const plateControls = useAnimationControls();
    const switchPlateControls = useAnimationControls();
    const tonearmControls = useAnimationControls();
    // load current audio
    const setAudio = useCallback((audio) => {
        audio.load();
    }, []);

    useEffect(() => {
        setAudio(state.audio);
    }, [state.audio, setAudio])

    const animateChange = async i => {
        if (tracks.indexOf(state.plate) !== i && !state.playerIsOn && !state.animationIsRunning) {
            dispatch({ type: 'animationIsRunning' });
            switchPlateControls.start({ left: `${100 / tracks.length * i}%`, transition: { duration: .5, type: 'spring', damping: 15 } });
            await plateControls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } });
            await plateControls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } });
            dispatch({ type: 'changePlate', plateIndex: i });
            dispatch({ type: 'changeAudio', plateIndex: i });
            await plateControls.start({ y: 0, rotate: 720, transition: { duration: 2, ease: 'easeOut' } });
            await plateControls.start({ scale: 1, transition: { duration: .5, ease: 'easeOut' } });
            return dispatch({ type: 'animationIsRunning' });
        } else {
            setAlert(true);
            setTimeout(() => {
                setAlert(false)
            }, 3000);
            return console.log('stop first')
        };
    };

    const play = async () => {
        if (!state.animationIsRunning && document.readyState === 'complete') {

            if (!state.playerIsOn) {
                dispatch({ type: 'play', payload: true });
                await tonearmControls.start({ rotate: 29, transition: { duration: 1.5, type: 'spring', damping: 9 } });
                state.audio.play();
                tonearmControls.start({ rotate: [29.5, 29, 28.5, 29, 29.5], transition: { duration: 1, delay: .3, repeat: Infinity, ease: 'linear' } });
                return plateControls.start({ rotate: 360, transition: { duration: 2, repeat: Infinity, ease: 'linear' } });


            } else if (state.playerIsOn) {

                dispatch({ type: 'play', payload: false });
                plateControls.start({ rotate: 0, transition: { duration: 1.5 } })
                tonearmControls.start({ rotate: 0, transition: { duration: 1.3, ease: 'easeOut' } });
                state.audio.pause();
                return state.audio.currentTime = 0;

            };
        } else {
            return console.log('hoooo wait!');
        }
    }

    return { tracks, state, play, animateChange, plateControls, switchPlateControls, tonearmControls, alert };
}

export default usePlate;
