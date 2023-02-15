import classes from './Plate.module.css';
import logo from '../assets/deutsche-grammophon-logo-1C7046D390-seeklogo.com.png'

const styles = {
    backgroundColor: `#174b75`,
    backgroundSize: '30%',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center 20%'
}

const Plate = ({ on }) => {

    const animate = on ? [classes.plate, classes.rotation].join(' ') : classes.plate;

    return (
        <div className={animate}>
            <div />
            <div style={styles} />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );
}

export default Plate;