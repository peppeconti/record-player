import classes from './Plate.module.scss';

const Plate = ({ text }) => {

    //const letters = Array.from(text).map((e, i) => <span className={classes.letter} key={i}>{e}</span>);

    return (
        <div className={classes.plate}>
            <div className={classes.label}>
               
            </div>
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className={classes.groove} />)}
        </div>
    );
}

export default Plate;