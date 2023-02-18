import classes from './ControlPanel.module.scss';
import { useState, useEffect, memo } from 'react';

const tracks = [
    {
        author: 'J.S.Bach',
        work: 'BWV 1056',
        color1: '#293ca5',
        color2: '#5d70d7'
    },
    {
        author: 'G.Verdi',
        work: 'La traviata',
        color1: '#3b5b00',
        color2: '#79af15'
    },
    {
        author: 'F.Chopin',
        work: 'Etude',
        color1: '#3b5b00',
        color2: '#79af15'
    }
];

const ControlPanel = ({ controls, setPlate }) => {

    useEffect(() => {
        console.log('render')
    })

    const [on, setOn] = useState(false)

    const sequence = async () => {
        await controls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } });
        await controls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } });
        await setPlate(tracks[1]);
        await controls.start({ y: 0, rotate: 720, transition: { duration: 2, ease: 'easeOut' } });
        return await controls.start({ scale: 1, transition: { duration: .5, ease: 'easeOut' } });
    }

    return (
        <div className={classes.control}>
            <div className={classes.led}>

            </div>
            <div className={classes.tracks}>

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