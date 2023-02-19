import { memo } from 'react';
import classes from './Tonearm2.module.scss';
import { motion as m } from 'framer-motion'

const Tonearm = ({ controls }) => {

    return (
        <>
            <m.div className={classes.rest} animate={controls}>
                <div className={classes.tonearm}>
                    <div className={classes.main}>
                        <div className={classes.headshell}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </m.div>
        </>
    );
}

export default memo(Tonearm);;