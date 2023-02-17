import { motion as m } from "framer-motion";
import classes from './Plate.module.scss';

const Plate = ({ author, work, controls }) => {

    const styles = {
        
    }

    return (
        <m.div className={classes.plate} animate={controls}>
            <div className={classes.label}>
                <p className={classes.text} data-author={author} data-work={work} />
            </div>
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className={classes.groove} />)}
        </m.div>
    );
}

export default Plate;