const tracks = [
    {
        author: 'J.S.Bach',
        work: 'BWV 1056',
        color1: '#293ca5',
        color2: '#5d70d7'
    },
    {
        author: 'G.Verdi',
        work: 'La traviata',
        color1: '#28bc18',
        color2: '#6ec964'
    },
    {
        author: 'F.Chopin',
        work: 'Étude',
        color1: '#8c189b',
        color2: '#da24f2'
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