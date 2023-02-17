import classes from './ControlPanel.module.scss';
import { useState } from 'react';

const ControlPanel = ({ controls }) => {

    const [on, setOn] = useState(false)

    /*const start = () => {

        if (!on) {
            controls.start({
                rotate: 360*10, transition: {
                    duration: 20,
                    ease: 'easeInOut'
    
                }
            });
            setOn(prev => !prev);
        } else {
            controls.stop();
            controls.start({
                rotate: -0,  transition: {
                    duration: 1,
                    ease: 'easeOut'
    
                }
            })
            setOn(prev => !prev);
        }
        
    }*/

    const sequence = async () => {
        await controls.start({ scale: 1.02, transition: { duration: .5, ease: 'easeIn' } })
        //await controls.set( { scale: 1.02 } )
        await controls.start({ y: -1000, rotate: 360, transition: { delay: .25, duration: 2, ease: 'easeIn' } })
        //await controls.set( { y: -800} )
        await controls.start({ y: 0, rotate: 720, transition: { duration: 2, ease: 'easeOut' } })
        return await controls.start({ scale: 1, transition: { duration: .5, ease: 'easeOut' } })
      }

    return (
        <div className={classes.button} onClick={sequence}>
            <span></span>
            <span></span>
        </div>

    );
}

export default ControlPanel;