import classes from './Base.module.scss';
import Plate from './Plate';
import Platter from './Platter';
import Tonearm from './Tonearm2';
import Control from './ControlPanel';
import usePlate from '../hooks/usePlate';
import ReactHowler from 'react-howler';

const Base = () => {

    const { tracks, state, plateControls, switchPlateControls, tonearmControls, play, animateChange, alert } = usePlate();

    return (
        <>
            <div className={classes.base}>
                <ReactHowler
                    src={state.plate.audio}
                    playing={state.playerIsOn}
                />
                {state.plate && <Plate author={state.plate.author} work={state.plate.work} dark={state.plate.color1} light={state.plate.color2} controls={plateControls} />}
                <Platter />
                <Tonearm controls={tonearmControls} />
                <Control tracks={tracks} alert={alert} controls={switchPlateControls} on={state.playerIsOn} play={play} animateChange={animateChange} />
            </div>
        </>
    );
}

export default Base;