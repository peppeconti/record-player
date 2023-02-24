import classes from './Base.module.scss';
import { useRef } from 'react';
import Plate from './Plate';
import Platter from './Platter';
import Tonearm from './Tonearm2';
import Control from './ControlPanel';
import usePlate from '../hooks/usePlate';

const Base = () => {

    const audioPlayer = useRef();

    const { tracks, state, plateControls, switchPlateControls, tonearmControls, play, animateChange, alert, audioEnd } = usePlate(audioPlayer);

    return (
        <>
            <audio ref={audioPlayer} src={state.plate.audio} preload='metadata' onEnded={audioEnd} />
            <div className={classes.base}>
                {state.plate && <Plate author={state.plate.author} work={state.plate.work} dark={state.plate.color1} light={state.plate.color2} controls={plateControls} />}
                <Platter />
                <Tonearm controls={tonearmControls} />
                <Control tracks={tracks} alert={alert} controls={switchPlateControls} on={state.playerIsOn} play={play} animateChange={animateChange} />
            </div>
        </>
    );
}

export default Base;