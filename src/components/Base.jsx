import { useState } from 'react';
import classes from './Base.module.scss';
import Plate from './Plate';
import Platter from './Platter';
import Tonearm from './Tonearm2';
import Control from './ControlPanel';
import { useAnimationControls } from'framer-motion';

const Base = () => {

    const controls = useAnimationControls();

    const [plate, setPlate] = useState({
        author: 'J.S.Bach',
        work: 'BWV 1056'
    })

    return (
        <div className={classes.base}>
            <Plate author={plate.author} work={plate.work} controls={controls} />
            <Platter />
            <Tonearm />
            <Control controls={controls} />
        </div>
    );
}

export default Base;
