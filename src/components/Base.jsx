import classes from './Base.module.css';
import { useState } from 'react';
import Tonearm from './Tonearm';
import Platter from './Platter';
import Plate from './Plate';
import Button from './Button';

const Base = () => {

    const [on, setOn] = useState(false);

    return (
        <div className={classes.base}>
            <Tonearm on={on} />
            <Platter />
            <Plate on={on} />
            <Button on={on} setOn={setOn} />
        </div>
    );
}

export default Base;
