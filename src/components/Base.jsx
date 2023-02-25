import classes from './Base.module.scss';
import { useRef, useState, useReducer, useEffect } from 'react';
import Plate from './Plate';
import Platter from './Platter';
import Tonearm from './Tonearm2';
import Control from './ControlPanel';
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
            return { ...state, plate: tracks[action.plateIndex] };
        case 'animationIsRunning':
            return { ...state, animationIsRunning: !state.animationIsRunning };
        case 'play':
            return { ...state, playerIsOn: action.payload };
        default:
            return state;
    }
}

const Base = () => {

    // states
    const [state, dispatch] = useReducer(reducer, initialState);
    const [alert, setAlert] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // animation controls
    const plateControls = useAnimationControls();
    const switchPlateControls = useAnimationControls();
    const tonearmControls = useAnimationControls();

    const audioEnd = async () => {
        dispatch({ type: 'animationIsRunning' });
        dispatch({ type: 'play', payload: false });
        plateControls.start({ rotate: 0, transition: { duration: 2 } });
        await tonearmControls.start({ rotate: 0, transition: { duration: 1.3, ease: 'easeOut' } });
        dispatch({ type: 'animationIsRunning' });
    }

    const loading = () => {
        console.log('loaded');
        setLoaded(true);
    };
    
    const audio = useRef(new Howl({ src: state.plate.audio, onend: audioEnd }));

    useEffect(() => {
        audio.current = new Howl({ src: state.plate.audio, onend: audioEnd });
    }, [state.plate.audio])

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
        } else if (state.playerIsOn && tracks.indexOf(state.plate) !== i) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false)
            }, 3000);
            return console.log('stop first')
        };
    };

    const play = async () => {
        if (!state.animationIsRunning) {

            if (!state.playerIsOn) {
                dispatch({ type: 'animationIsRunning' });
                dispatch({ type: 'play', payload: true });
                plateControls.start({ rotate: 360, transition: { duration: 2, repeat: Infinity, ease: 'linear' } });
                await tonearmControls.start({ rotate: 29, transition: { stiffness: 25, type: 'spring', damping: 4 } });
                dispatch({ type: 'animationIsRunning' });
                tonearmControls.start({ rotate: [29.5, 29, 28.5, 29, 29.5], transition: { duration: 1.3, repeat: Infinity, ease: 'linear' } });
                console.log(audio);
                audio.current.play();
                return;



            } else if (state.playerIsOn) {
                dispatch({ type: 'animationIsRunning' });
                dispatch({ type: 'play', payload: false });
                audio.current.stop();
                tonearmControls.start({ rotate: 0, transition: { duration: 1.3, ease: 'easeOut' } });
                await plateControls.start({ rotate: 0, transition: { duration: 2 } });
                dispatch({ type: 'animationIsRunning' });
            };
        } else {
            return console.log('hoooo wait!');
        }
    }

    return (
        <>
            <audio src={state.plate.audio} preload='metadata' onLoadedMetadata={loading} onEnded={audioEnd} />
            {loaded && <div className={classes.base}>
                {state.plate && <Plate author={state.plate.author} work={state.plate.work} dark={state.plate.color1} light={state.plate.color2} controls={plateControls} />}
                <Platter />
                <Tonearm controls={tonearmControls} />
                <Control tracks={tracks} alert={alert} controls={switchPlateControls} on={state.playerIsOn} play={play} animateChange={animateChange} />
            </div>}
            {!loaded && <div>Loading...</div>}
        </>
    );
}

export default Base;