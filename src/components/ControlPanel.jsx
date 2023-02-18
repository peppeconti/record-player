import classes from './ControlPanel.module.scss';
import { useState, useEffect, memo } from 'react';
import tracks from '../utils/tracks.js';

const ControlPanel = ({ controls, plate, setPlate }) => {

    useEffect(() => {

        setPlate(tracks[0]);
        console.log('render control');

    }, [setPlate]);

    const [on, setOn] = useState(false)

    const sequence = async (e) => {
        if (tracks.indexOf(plate) !== e) {
            await controls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } });
            await controls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } });
            await setPlate(tracks[e]);
            await controls.start({ y: 0, rotate: 720, transition: { duration: 2, ease: 'easeOut' } });
            return await controls.start({ scale: 1, transition: { duration: .5, ease: 'easeOut' } });
        } else return;
    }

    return (
        <div className={classes.control}>
            <div className={classes.led}>

            </div>
            <div className={classes.tracks}>
                {tracks.map((e, i) => <span key={i} onClick={() => sequence(i)}>
                    {(i + 1) + '. ' + e.author}
                </span>)}
            </div>
            <div className={classes.button}>
                <span></span>
                <span></span>
            </div>
        </div>

    );
}

export default memo(ControlPanel);






/*const start = () => {

    if (!on) {
        controls.start({
            rotate: 360*10, transition: {
                duration: 20,
                ease: 'easeInOut'
 
            }
        });
        setOn(prev => !prev);
    } else {
        controls.stop();
        controls.start({
            rotate: -0,  transition: {
                duration: 1,
                ease: 'easeOut'
 
            }
        })
        setOn(prev => !prev);
    }
    
}*/