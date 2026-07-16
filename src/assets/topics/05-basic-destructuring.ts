interface AudioPlayer{
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: "Ed Sheeran",
        year: 2015
    }
}

// Destructuring, es una forma de extraer propiedades de un objeto y asignarlas a variables individuales.

// const {
//     song:anotherSong,
//     songDuration:duration,
//     details: { 
//         author:authorName,
//         year:yearOfRelease
//     }
// } = audioPlayer;


// console.log('Song:', anotherSong);
// console.log('Duration:', duration);
// console.log('Author:', authorName);
// console.log('Year of Release:', yearOfRelease);

/* Destructuring Array */
const [,,trunks = 'Not found']: string[] = ['Goku', 'Vegeta'];

console.error('Personaje 3:', trunks);

export {};