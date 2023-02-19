import { useReducer } from 'react';
import tracks from '../utils/tracks.js';
import { useAnimationControls } from 'framer-motion';

const initialState = {
    plate: tracks[0],
    plateIsChanging: false,
    playerIsOn: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'changePlate':
            return { ...state, plate: tracks[action.plateIndex] };
        case 'plateIsChanging':
            return { ...state, plateIsChanging: !state.plateIsChanging };
        case 'play':
            return { ...state, playerIsOn: !state.playerIsOn };
        default:
            return state;
    }
}

const usePlate = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const plateControls = useAnimationControls();
    const switchPlateControls = useAnimationControls();
    const tonearmControls = useAnimationControls();

    const animateChange = async i => {
        if (tracks.indexOf(state.plate) !== i && !state.playerIsOn && !state.plateIsChanging) {
            dispatch({ type: 'plateIsChanging' });
            switchPlateControls.start({ left: `${100 / tracks.length * i}%`, transition: { duration: .5, type: 'spring', damping: 15 } });
            await plateControls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } });
            await plateControls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } });
            dispatch({ type: 'changePlate', plateIndex: i });
            await plateControls.start({ y: 0, rotate: 720, transition: { duration: 2, ease: 'easeOut' } });
            await plateControls.start({ scale: 1, transition: { duration: .5, ease: 'easeOut' } });
            return dispatch({ type: 'plateIsChanging' });
        } else return;
    };

    const play = () => {
        if (!state.plateIsChanging) dispatch({ type: 'play' });
    }

    return { tracks, state, play, animateChange, plateControls, switchPlateControls, tonearmControls };
}

export default usePlate;