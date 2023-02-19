import { useRef } from 'react';
import classes from './Base.module.scss';
import Plate from './Plate';
import Platter from './Platter';
import Tonearm from './Tonearm2';
import Control from './ControlPanel';
import usePlate from '../hooks/usePlate';

const Base = () => {

    const audioRef = useRef(null);

    const { tracks, state, plateControls, switchPlateControls, tonearmControls, play, animateChange } = usePlate(audioRef.current);

    return (
        <>
            <audio ref={audioRef} src={state.plate.audio}/>
            <div className={classes.base}>
                {state.plate && <Plate author={state.plate.author} work={state.plate.work} dark={state.plate.color1} light={state.plate.color2} controls={plateControls} />}
                <Platter />
                <Tonearm controls={tonearmControls} />
                <Control tracks={tracks} controls={switchPlateControls} on={state.playerIsOn} play={play} animateChange={animateChange} />
            </div>
        </>
    );
}

export default Base;