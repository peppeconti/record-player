import adagio from '../assets/audio/bach_largo.mp3';
import traviata from '../assets/audio/verdi_traviata.mp3';
import etude from '../assets/audio/chopin_op10.mp3';

const tracks = [
    {
        author: 'J.S.Bach',
        work: 'BWV 1056',
        audio: adagio,
        color1: '#293ca5',
        color2: '#5d70d7'
    },
    {
        author: 'G.Verdi',
        work: 'La traviata',
        audio: traviata,
        color1: '#39a337',
        color2: '#4bd648'
    },
    {
        author: 'F.Chopin',
        work: 'Étude',
        audio: etude,
        color1: '#9b2b2b',
        color2: '#db5c5c'
    }
];

export default tracks;


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