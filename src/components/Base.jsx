import classes from './Base.module.scss';
import Plate from './Plate';
import Platter from './Platter';

const Base = () => {

    return (
        <div className={classes.base}>
            <Plate />
            <Platter />
        </div>
    );
}

export default Base;
