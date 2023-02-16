import classes from './Tonearm2.module.scss';

const Tonearm = () => {

    return (
        <>
            <div className={classes.rest}>
                <div className={classes.tonearm}>
                    <div className={classes.main}>
                        <div className={classes.headshell}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tonearm;