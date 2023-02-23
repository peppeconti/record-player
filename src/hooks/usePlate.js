import { useReducer, useState, useEffect, useRef } from 'react';
import tracks from '../utils/tracks.js';
import { useAnimationControls } from 'framer-motion';
import { Howl } from 'howler';

const initialState = {
    plate: tracks[0],
    animationIsRunning: false,
    playerIsOn: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'changePlate':
            return { ...state, plate: tracks[action.plateIndex]};
        case 'animationIsRunning':
            return { ...state, animationIsRunning: !state.animationIsRunning };
        case 'play':
            return { ...state, playerIsOn: action.payload };
        default:
            return state;
    }
}

const usePlate = () => {

    // states
    const [state, dispatch] = useReducer(reducer, initialState);
    const [alert, setAlert] = useState(false);

    // animation controls
    const plateControls = useAnimationControls();
    const switchPlateControls = useAnimationControls();
    const tonearmControls = useAnimationControls();

    const audio = useRef(null)

    useEffect(() => {
        audio.current = new Howl({src: tracks[0].audio, onload: () => console.log('loaded')})
        //console.log(state.audio)
        //state.audio._onload = () => console.log('ciao');
    }, [state.plate])

    const animateChange = async i => {
        if (tracks.indexOf(state.plate) !== i && !state.playerIsOn && !state.animationIsRunning) {
            dispatch({ type: 'animationIsRunning' });
            switchPlateControls.start({ left: `${100 / tracks.length * i}%`, transition: { duration: .5, type: 'spring', damping: 15 } });
            await plateControls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } });
            await plateControls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } });
            dispatch({ type: 'changePlate', plateIndex: i });
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
        if (!state.animationIsRunning) {

            const duration = audio.current.duration();

            if (!state.playerIsOn) {
                dispatch({ type: 'play', payload: true });
                await plateControls.start({ rotate: 360 * 2, transition: { duration: 2 * 2, ease: 'linear' } });
                plateControls.start({ rotate: 360 * duration / 2, transition: { duration: duration, ease: 'linear' } });
                await tonearmControls.start({ rotate: 29, transition: { stiffness: 25, type: 'spring', damping: 4 } });
                tonearmControls.start({ rotate: [29.5, 29, 28.5, 29, 29.5], transition: { duration: 1.3, repeat: Infinity, ease: 'linear' } });
                return audio.current.play();



            } else if (state.playerIsOn) {
                dispatch({ type: 'play', payload: false });
                audio.current.stop();
                plateControls.stop();
                tonearmControls.start({ rotate: 0, transition: { duration: 1.3, ease: 'easeOut' } });
                plateControls.set({ rotate: 0 });

            };
        } else {
            return console.log('hoooo wait!');
        }
    }

    return { tracks, state, play, animateChange, plateControls, switchPlateControls, tonearmControls, alert };
}

export default usePlate;


/*dispatch({ type: 'play', payload: true });
await tonearmControls.start({ rotate: 29, transition: { duration: 1.5, type: 'spring', damping: 9 } });
state.plate.audio.play();
tonearmControls.start({ rotate: [29.5, 29, 28.5, 29, 29.5], transition: { duration: 1, delay: .3, repeat: Infinity, ease: 'linear' } });
return plateControls.start({ rotate: 360 * state.plate.audio.duration() / 2, transition: { duration: state.plate.audio.duration(),ease: 'easeInOut' } });*/