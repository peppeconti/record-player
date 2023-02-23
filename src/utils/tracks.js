import adagio from '../assets/audio/bach_largo.mp3';
import traviata from '../assets/audio/verdi_traviata.mp3';
import etude from '../assets/audio/chopin_op10.mp3';
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
        author: 'G.Verdi',
        work: 'La traviata',
        audio: new Howl({src: traviata}),
        color1: '#39a337',
        color2: '#4bd648'
    },
    {
        author: 'F.Chopin',
        work: 'Étude',
        audio: new Howl({src: etude}),
        color1: '#802323',
        color2: '#BB1E1E'
    }
];

export default tracks;