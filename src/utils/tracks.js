import adagio from '../assets/audio/bach_largo.mp3';
import inverno from '../assets/audio/vivaldi_inverno.mp3';
import etude from '../assets/audio/chopin_op10.mp3';
import andante from '../assets/audio/mozart_andante.mp3';
import { Howl } from 'howler';

const tracks = [
    {
        author: 'J.S.Bach',
        work: 'BWV 1056',
        audio: new Howl({src: adagio}),
        color1: '#293ca5',
        color2: '#5d70d7'
    },
    {
        author: 'A.Vivaldi',
        work: 'L\'inverno',
        audio: new Howl({src: inverno}),
        color1: '#39a337',
        color2: '#4fd669'
    },
    {
        author: 'W.A.Mozart',
        work: 'K545',
        audio: new Howl({src: andante}),
        color1: '#9A2A2A',
        color2: '#db3f3f'
    },
    {
        author: 'F.Chopin',
        work: 'Étude',
        audio: new Howl({src: etude}),
        color1: '#822a93',
        color2: '#b13cc9'
    }
];

export default tracks;