import classes from './Plate.module.scss';
//import background from '../assets/img/plate.svg';

/*const styles = {
    background: `url(${background}) no-repeat center center`
}*/

const Plate = () => {

    return (
        <div className={classes.plate}>
            <div className={classes.label} />
            {Array.from({length: 10}).map(() =>  <div className={classes.groove}/>)}
        </div>
    );
}

export default Plate;