import { useState } from 'react';
import classes from './Base.module.scss';
import Plate from './Plate';
import Platter from './Platter';
import Tonearm from './Tonearm2';

const Base = () => {

    const [text, setText] = useState({
        author: 'J.S.Bach',
        work: 'BWV 1056'
    })

    return (
        <div className={classes.base}>
            <Plate author={text.author} work={text.work} />
            <Platter />
            <Tonearm />
        </div>
    );
}

export default Base;
