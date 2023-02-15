import classes from './Button.module.css';
import {useRef} from 'react';
import bach from '../assets/bach_bwv1056_fis_2_largo.mp3';


const Button = ({ setOn, on }) => {

    const myRef = useRef();

    const playMusic = () => {

        setTimeout(() => {
            console.log(on)
            myRef.current.play();
        }, 1700);

        setOn(true);
    }

    const stopMusic = () => {
        myRef.current.pause();
        myRef.current.currentTime = 0;
        setOn(false);
    }


    return (
        <>
            <audio
                ref={myRef}
                src={bach}
            />
            {on ? (
                <button onClick={stopMusic}>pause</button>
            ) : (
                <button onClick={playMusic}>start</button>
            )}
        </>
    );
}

export default Button;