import { useReducer } from 'react';
import tracks from '../utils/tracks.js';
import { useAnimationControls } from 'framer-motion';

const initialState = {
    plate: tracks[0],
    animationIsOn: false,
    playerIsOn: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'changePlate':
            return { ...state, plate: tracks[action.plateIndex] };
        case 'animationIsOn':
            return { ...state, animationIsOn: !state.animationIsOn };
        case 'play':
            return { ...state, playerIsOn: !state.playerIsOn };
        default:
            return state;
    }
}

const usePlate = (audio) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const plateControls = useAnimationControls();
    const switchPlateControls = useAnimationControls();
    const tonearmControls = useAnimationControls();

    const animateChange = async i => {
        if (tracks.indexOf(state.plate) !== i && !state.playerIsOn && !state.animationIsOn) {
            dispatch({ type: 'animationIsOn' });
            switchPlateControls.start({ left: `${100 / tracks.length * i}%`, transition: { duration: .5, type: 'spring', damping: 15 } });
            await plateControls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } });
            await plateControls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } });
            dispatch({ type: 'changePlate', plateIndex: i });
            await plateControls.start({ y: 0, rotate: 720, transition: { duration: 2, ease: 'easeOut' } });
            await plateControls.start({ scale: 1, transition: { duration: .5, ease: 'easeOut' } });
            return dispatch({ type: 'animationIsOn' });
        } else return;
    };

    const play = async () => {
        if (!state.animationIsOn) {

            if (!state.playerIsOn) {
                dispatch({ type: 'play' });
                await tonearmControls.start({ rotate: 29, transition: { duration: 1.5, type: 'spring', damping: 9 } });
                tonearmControls.start({ rotate: [29.5, 29, 28.5, 29, 29.5], transition: { duration: 1, delay: .3, repeat: Infinity, ease: 'linear' } });
                plateControls.start({rotate: 360, transition: {duration: 2, repeat: Infinity, ease: 'linear'}});
                audio.current.play();
            } else {
                dispatch({ type: 'play' });
                plateControls.start({ rotate: 0, transition: { duration: 1.5 } })
                tonearmControls.start({ rotate: 0, transition: { duration: 1.3, ease: 'easeOut' } });
                audio.current.pause();
                audio.current.currentTime = 0;
            };
        };
    }

    return { tracks, state, play, animateChange, plateControls, switchPlateControls, tonearmControls };
}

export default usePlate;