import { useState } from 'react';
import classes from './Base.module.scss';
import Plate from './Plate';
import Platter from './Platter';

const Base = () => {

    const [text, setText] = useState('adagio in f minor')

    return (
        <div className={classes.base}>
            <Plate text={text} />
            <Platter />
        </div>
    );
}

export default Base;
