import { useEffect } from 'react';
import { motion as m } from "framer-motion";
import classes from './Plate.module.scss';

const Plate = ({ author, work, controls }) => {

    /*useEffect(() => {
        controls.start({
            rotate: 360, transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'linear'

            }
        })
    }, [])*/

    return (
        <m.div className={classes.plate} animate={controls}>
            <div className={classes.label}>
                <p className={classes.text} data-author={author} data-work={work} />
            </div>
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className={classes.groove} />)}
        </m.div>
    );
}

export default Plate;