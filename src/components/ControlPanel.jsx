import classes from './ControlPanel.module.scss';
import { motion as m } from 'framer-motion';

const ControlPanel = ({ tracks, controls, on, play, animateChange, alert }) => {

    const button_styles = !on ? [classes.button, classes.off].join(' ') : [classes.button, classes.on].join(' ');
    const led_styles = !on ? classes.off : classes.on;

    return (
        <div className={classes.control}>
            <div className={classes.led}>
                <span className={led_styles}/>
                <span>{on ? 'ON' : 'OFF'}</span>
                {alert && <span>Stop first!</span>}
            </div>
            <div className={classes.tracks}>
                <div className={classes.switch_groove}>
                    <m.div className={classes.switch} animate={controls} />
                </div>
                <div className={classes.plates}>
                    {tracks.map((e, i) => <span key={i} className={classes.plate} onClick={() => animateChange(i)}>
                        <span className={classes.num}>{(i + 1)}</span>{e.author.split('.')[e.author.split('.').length-1]}
                    </span>)}
                </div>
            </div>
            <div className={button_styles} onClick={play}>
                <span></span>
                <span></span>
            </div>
        </div>

    );
}

export default ControlPanel;