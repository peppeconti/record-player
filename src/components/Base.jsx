import { useState, useEffect } from 'react';
import classes from './Base.module.scss';
import Plate from './Plate';
import Platter from './Platter';
import Tonearm from './Tonearm2';
import Control from './ControlPanel';
import { useAnimationControls } from'framer-motion';

const Base = () => {

    const controls = useAnimationControls();

    const [plate, setPlate] = useState(undefined)

    return (
        <div className={classes.base}>
            {plate && <Plate author={plate.author} work={plate.work} dark={plate.color1} light={plate.color2} controls={controls} />}
            <Platter />
            <Tonearm />
            <Control controls={controls} plate={plate} setPlate={setPlate} />
        </div>
    );
}

export default Base;
