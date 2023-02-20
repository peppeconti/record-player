import { memo } from 'react';
import classes from './Plate.module.scss';
import { motion as m } from "framer-motion";

const Plate = ({ author, work, controls, dark, light }) => {

    /*useEffect(() => {
        console.log('render plate');
    });*/

    const styles = {
        '--dark': dark,
        '--light': light
    };

    return (
        <m.div className={classes.plate} animate={controls} style={styles}>
            <div className={classes.label}>
                <p className={classes.text} data-author={author} data-work={work} />
            </div>
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className={classes.groove} />)}
        </m.div>
    );
}

export default memo(Plate);