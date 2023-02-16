import classes from './Plate.module.scss';

const Plate = ({ author, work }) => {

    //const letters = Array.from(text).map((e, i) => <span className={classes.letter} key={i}>{e}</span>);

    return (
        <div className={classes.plate}>
            <div className={classes.label}>
                <p className={classes.text} data-author={author} data-work={work} />
            </div>
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className={classes.groove} />)}
        </div>
    );
}

export default Plate;