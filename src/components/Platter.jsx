import classes from './Platter.module.scss';
import { memo } from 'react';

const Platter = () => {

    return (
        <div className={classes.platter} />
    );
}

export default memo(Platter);