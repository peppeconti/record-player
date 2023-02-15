import classes from './Tonearm.module.css';

const Tonearm = ({ on }) => {

    const animate1 = on ? [classes.tonearm, classes.shake].join(' ') : classes.tonearm;

    const animate2 = on ? [classes.rest, classes.rotate].join(' ') : classes.rest;

    return (
        <div className={animate2}>
            <span></span>
            <div className={animate1}>
                <div />
                <div>
                    <span />
                </div>
            </div>
        </div>
    );
}

export default Tonearm;