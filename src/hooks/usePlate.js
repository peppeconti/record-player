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
        case 'animateChange':
            async () => {
                if (tracks.indexOf(state.plate) !== action.plateIndex && !state.playerIsOn) {
                    //setClicked(true);
                    switchPlateControls.start({ left: `${100 / tracks.length * action.plateIndex}%`, transition: { duration: .5, type: 'spring', damping: 15 } });
                    await plateControls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } });
                    await plateControls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } });
                    await dispatch({type: 'changePlate', plateIndex: action.plateIndex});
                    await plateControls.start({ y: 0, rotate: 720, transition: { duration: 2, ease: 'easeOut' } });
                    await plateControls.start({ scale: 1, transition: { duration: .5, ease: 'easeOut' } });
                    //return setClicked(false);
                } else return;
            }
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

    return { tracks, state, dispatch, plateControls, switchPlateControls, tonearmControls };
}

export default usePlate;