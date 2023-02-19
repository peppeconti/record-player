import { useReducer } from 'react';
import tracks from '../utils/tracks.js';
import { useAnimationControls } from 'framer-motion';

const usePlate = () => {
    const plateControls = useAnimationControls();
    const switchPlateControls = useAnimationControls();
    const tonearmControls = useAnimationControls();
}

export default usePlate;