import classes from './ControlPanel.module.scss';
import { useEffect, useState, memo } from 'react';
import tracks from '../utils/tracks.js';
import { motion as m, useAnimationControls } from 'framer-motion';

const ControlPanel = ({ controls, plate, setPlate }) => {

    useEffect(() => {

        setPlate(tracks[0]);
        console.log('render control');

    }, [setPlate]);

    const [clicked, setClicked] = useState(false);
    const pinControls = useAnimationControls();
    const [on, setOn] = useState(false);

    const sequence = async i => {
        if (tracks.indexOf(plate) !== i && !on) {
            setClicked(true);
            pinControls.start({ left: `${100 / tracks.length * i}%`, transition: { duration: .5, type: 'spring', damping: 15 } });
            await controls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } });
            await controls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } });
            await setPlate(tracks[i]);
            await controls.start({ y: 0, rotate: 720, transition: { duration: 2, ease: 'easeOut' } });
            await controls.start({ scale: 1, transition: { duration: .5, ease: 'easeOut' } });
            return setClicked(false);
        } else return;
    }

    return (
        <div className={classes.control}>
            <div className={classes.led}>

            </div>
            <div className={classes.tracks}>
                <div className={classes.switch_groove}>
                    <m.div className={classes.switch} animate={pinControls} />
                </div>
                <div className={classes.plates}>
                    {tracks.map((e, i) => <span key={i} className={classes.plate} onClick={!clicked ? () => sequence(i) : null}>
                        <span className={classes.num}>{(i + 1)}</span>{e.author}
                    </span>)}
                </div>
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