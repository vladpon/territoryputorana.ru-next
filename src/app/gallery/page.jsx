import Masonry from "../Components/MasonryPhotoBlock/Masonry"

import styles from './gallery.module.scss'

// const photos1 = [
//     { 
//         id: '001',
//         src: './img/glr/hiking001.jpg',
//         tag: 'hiking'
//     },
//     { 
//         id: '002',
//         src: './img/glr/hiking002.jpg',
//         tag: 'hiking'
//     },
//     { 
//         id: '003',
//         src: './img/glr/hiking003.jpg',
//         tag: 'hiking'
//     },
//     { 
//         id: '004',
//         src: './img/glr/hiking004.jpg',
//         tag: 'hiking'
//     },
//     { 
//         id: '005',
//         src: './img/glr/hiking005.jpg',
//         tag: 'hiking'
//     },
//     { 
//         id: '006',
//         src: './img/glr/hiking006.jpg',
//         tag: 'hiking'
//     },
//     { 
//         id: '007',
//         src: './img/glr/hiking007.jpg',
//         tag: 'hiking'
//     },
//     { 
//         id: '008',
//         src: './img/glr/hiking008.jpg',
//         tag: 'hiking'
//     }
// ]

const mountain = [
    {
        id: 1,
        src: './img/glr/Горы001.jpg',
        tn: './img/glr/Горы001_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 2,
        src: './img/glr/Горы002.jpg',
        tn: './img/glr/Горы002_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 3,
        src: './img/glr/Горы003.jpg',
        tn: './img/glr/Горы003_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 4,
        src: './img/glr/Горы004.jpg',
        tn: './img/glr/Горы004_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 5,
        src: './img/glr/Горы005.jpg',
        tn: './img/glr/Горы005_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 6,
        src: './img/glr/Горы006.jpg',
        tn: './img/glr/Горы006_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 7,
        src: './img/glr/Горы007.jpg',
        tn: './img/glr/Горы007_tn.jpg',
        description: '',
        alt: ''
    },
]


const waterfalls = [
    {
        id: 1,
        src: './img/glr/Водопады001.jpg',
        tn: './img/glr/Водопады001_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 2,
        src: './img/glr/Водопады002.jpg',
        tn: './img/glr/Водопады002_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 3,
        src: './img/glr/Водопады003.jpg',
        tn: './img/glr/Водопады003_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 4,
        src: './img/glr/Водопады004.jpg',
        tn: './img/glr/Водопады004_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 5,
        src: './img/glr/Водопады005.jpg',
        tn: './img/glr/Водопады005_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 6,
        src: './img/glr/Водопады006.jpg',
        tn: './img/glr/Водопады006_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 7,
        src: './img/glr/Водопады007.jpg',
        tn: './img/glr/Водопады007_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 8,
        src: './img/glr/Водопады008.jpg',
        tn: './img/glr/Водопады008_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 9,
        src: './img/glr/Водопады009.jpg',
        tn: './img/glr/Водопады009_tn.jpg',
        description: '',
        alt: ''
    }
]

const lamaLake = [
    {
        id: 1,
        src: './img/glr/lamalake001.jpg',
        tn: './img/glr/lamalake001_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 2,
        src: './img/glr/lamalake002.jpg',
        tn: './img/glr/lamalake002_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 3,
        src: './img/glr/lamalake003.jpg',
        tn: './img/glr/lamalake003_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 4,
        src: './img/glr/lamalake004.jpg',
        tn: './img/glr/lamalake004_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 5,
        src: './img/glr/lamalake005.jpg',
        tn: './img/glr/lamalake005_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 6,
        src: './img/glr/lamalake006.jpg',
        tn: './img/glr/lamalake006_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 7,
        src: './img/glr/lamalake007.jpg',
        tn: './img/glr/lamalake007_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 8,
        src: './img/glr/lamalake008.jpg',
        tn: './img/glr/lamalake008_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 9,
        src: './img/glr/lamalake009.jpg',
        tn: './img/glr/lamalake009_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 10,
        src: './img/glr/lamalake010.jpg',
        tn: './img/glr/lamalake010_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 11,
        src: './img/glr/lamalake011.jpg',
        tn: './img/glr/lamalake011_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 12,
        src: './img/glr/lamalake012.jpg',
        tn: './img/glr/lamalake012_tn.jpg',
        description: '',
        alt: ''
    }
]

const jarPtica = [
    {
        id: 1,
        src: './img/glr/ЖарПтица001.jpg',
        tn: './img/glr/ЖарПтица001_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 2,
        src: './img/glr/ЖарПтица002.jpg',
        tn: './img/glr/ЖарПтица002_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 3,
        src: './img/glr/ЖарПтица003.jpg',
        tn: './img/glr/ЖарПтица003_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 4,
        src: './img/glr/ЖарПтица004.jpg',
        tn: './img/glr/ЖарПтица004_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 5,
        src: './img/glr/ЖарПтица005.jpg',
        tn: './img/glr/ЖарПтица005_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 6,
        src: './img/glr/ЖарПтица006.jpg',
        tn: './img/glr/ЖарПтица006_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 7,
        src: './img/glr/ЖарПтица007.jpg',
        tn: './img/glr/ЖарПтица007_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 8,
        src: './img/glr/ЖарПтица008.jpg',
        tn: './img/glr/ЖарПтица008_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 9,
        src: './img/glr/ЖарПтица009.jpg',
        tn: './img/glr/ЖарПтица009_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 10,
        src: './img/glr/ЖарПтица010.jpg',
        tn: './img/glr/ЖарПтица010_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 11,
        src: './img/glr/ЖарПтица011.jpg',
        tn: './img/glr/ЖарПтица011_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 12,
        src: './img/glr/ЖарПтица012.jpg',
        tn: './img/glr/ЖарПтица012_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 13,
        src: './img/glr/ЖарПтица013.jpg',
        tn: './img/glr/ЖарПтица013_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 14,
        src: './img/glr/ЖарПтица014.jpg',
        tn: './img/glr/ЖарПтица014_tn.jpg',
        description: '',
        alt: ''
    },
]

const tundra = [
    {
        id: 1,
        src: './img/glr/Тундра001.jpg',
        tn: './img/glr/Тундра001_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 2,
        src: './img/glr/Тундра002.jpg',
        tn: './img/glr/Тундра002_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 3,
        src: './img/glr/Тундра003.jpg',
        tn: './img/glr/Тундра003_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 4,
        src: './img/glr/Тундра004.jpg',
        tn: './img/glr/Тундра004_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 5,
        src: './img/glr/Тундра005.jpg',
        tn: './img/glr/Тундра005_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 6,
        src: './img/glr/Тундра006.jpg',
        tn: './img/glr/Тундра006_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 7,
        src: './img/glr/Тундра007.jpg',
        tn: './img/glr/Тундра007_tn.jpg',
        description: '',
        alt: ''
    },
    {
        id: 8,
        src: './img/glr/Тундра008.jpg',
        tn: './img/glr/Тундра008_tn.jpg',
        description: '',
        alt: ''
    },
]

export const metadata = {
    title: 'Галерея',
    description: 'Плато Путорана. Озеро Лама. Таймыр. Водопады плато Путорана.'
}


const Gallery = () => {

  return (
    <main className = {styles.gallery}>
        <Masonry arrPhotos = {mountain} title = 'Горы и каньоны' />
        <Masonry arrPhotos = {waterfalls} title = 'Водопады' />
        <Masonry arrPhotos = {lamaLake} title = 'Озеро Лама' />
        <Masonry arrPhotos = {jarPtica} title = 'Усадьба "Жар.Птица"' />
        <Masonry arrPhotos = {tundra} title = 'Тундра' />
    </main>
  )
}

export default Gallery