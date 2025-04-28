import styles from './partners.module.scss'
import BigCards from '../Components/BigCards/BigCards'

const partners = [  
    {
        "id": "rd",
        "title": "Russia Discovery",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/rd_logo.png",
        "optImg": "",
        "description": [
            "Ведущий туроператор по России и наш постоянный партнер по организации туров для сборных групп туристов со всей России и мира."
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "+74951046436 ",
            "email": "go@russiadiscovery.ru",
            "site": "https://www.russiadiscovery.ru/regions/plato-putorana/"
        },
        "files" : [],
        "href": "",
        "section": "Туры и походы"
    },  
    {
        "id": "001",
        "title": "ЛАМА ТУР",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/prtnrs_lamatour.jpg",
        "optImg": "",
        "description": [
            "Активные туры «всё включено». Туры выходного дня на озеро Лама (пт-вс).",
            "Заброски из Норильска на плато Путорана на морских катерах"
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "+79954404149",
            "email": "lama@lamatour.ru",
            "site": "https://lama-tour.ru"
        },
        "files": [],
        "href" : "",
        "section": "Туры и походы"
    },
    {
        "id": "weekend",
        "title": "Тур выходного дня",
        "season": "лето",
        "yearTime": "июнь - сентябрь",
        "groupSize": "от 8 человек",
        "accmdtnShort": "2 ночи – турбаза на озере Лама",
        "difficultyLevel": "легкий, можно путешествовать с детьми",
        "time": "пятница - воскресенье",
        "price": "от 35 000 руб./чел.*",
        "bigImg": "./img/weekend_cover.jpg",
        "smallImg": "./img/mp_weekend.jpg",
        "optImg": "",
        "description": [
            "Подходит для семей с детьми, дружеских компаний и специалистов, приехавших в Норильск по делам. Продуманный маршрут, четко рассчитанный по времени, с отправлением вечером в пятницу и возвращением в Норильск в воскресенье. Посещение природных локаций, которые дадут общее представление о красоте, характере и масштабе знаменитого плато Путорана."],
        "tourPhoto": [],
        "contacts": {
            "tel": "",
            "email": "",
            "site": "",
            "wa": "+79135043627"
        },
        "files" : [],
        "href" : "",
        "about" : [
            "Отличный вариант для семей с детьми, дружеских компаний и специалистов, приехавших в Норильск по делам. Продуманный маршрут, четко рассчитанный по времени, с отправлением вечером в пятницу и возвращением в Норильск в воскресенье. В программе — природные локации, которые дадут вам общее представление о красоте, характере и масштабе знаменитого плато Путорана."
            ],
            "aboutH3" : "Хит!",
            "tourProgram" : {
            "textH4": "Может меняться в зависимости от погодных условий",
            "begin" : "",
            "days" : [
                {
                "dayImg" : "./img/weekend_001.jpg",
                "dayTitle" : "Пятница",
                "dayDesc" : [
                    "17:00-17:30 Отправление с причала (река Норильская) – озеро Лама 20:00 Прибытие на базу, расположенную на озере Лама"
                ]
                },
                {
                "dayImg" : "./img/weekend_002.jpg",
                "dayTitle" : "Суббота",
                "dayDesc" : [
                    "14:00 Выезд на водопад горной реки Нералах (15 км по озеру и 2 км пешком по тропе до красивейшего водопада Нералах) 17:00 Баня"
                ]
                },
                {
                "dayImg" : "./img/weekend_003.jpg",
                "dayTitle" : "Воскресенье",
                "dayDesc" : [
                    "14:00 Отправление озеро Лама — причал (река Норильская) В стоимость входит: трансфер (причал — Лама — причал), проживание на базе, трансфер по озеру, баня."
                ]
                }
            ]
        },
        "section": "Туры и походы"
    },
    {
        "id": "002",
        "title": "Клуб исследователей Таймыра",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/prtnrs_kit.jpg",
        "optImg": "",
        "description": [
            "Спортивно-туристические походы. Познавательные и краеведческие экспедиции. Научная и издательская деятельность"
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "+73919423238",
            "email": "kit-kroo@rambler.ru",
            "site": "https://kit-norilsk.ru"
        },
        "files" : [],
        "href": "",
        "section": "Туры и походы"
    },
    {
        "id": "003",
        "title": "Offroad Putorana",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/prtnrs_or.jpg",
        "optImg": "",
        "description": [
            "Джип-туры на плато Путорана, сплавы на пакрафтах, палаточный лагерь, заброска туристов"
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "+79039180759",
            "email": "ice-vovka@rambler.ru",
            "site": ""
        },
        "files" : [
            {
            "name": "Программа тура Обзорная экскурсия",
            "src": "./img/Obzornaya.pdf"
            },
            {
            "name": "Программа тура Долина 12 водопрадов р. Аякли",
            "src": "./img/Ayakli_combo.pdf"
            }
        ],
        "href": "" ,
        "section": "Туры и походы"
    },
    {
        "id": "norilsk",
        "title": "Гостиница Норильск",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/norilsk_logo.png",
        "optImg": "",
        "description": [
            "Удобное расположение в центре города. Более 220 номеров различных категорий: «Люкс», «Джуниор Сьют», «Комфорт», «Стандарт». Комфортабельное размещение, меню из блюд европейской кухни и северных деликатесов, конференц-зал и широкий спектр дополнительных услуг."
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "+73919349930",
            "email": "mail@norilsk-hotel.ru",
            "site": "https://norilsk-hotel.ru/",
            "address": "г. Норильск, ул. Талнахская д. 39А"
        },
        "href": "",
        "section": "Гостиницы"
    },
    {
        "id": "polarstar",
        "title": "Гостиничный комплекс Полярная звезда",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/polarstar_logo.png",
        "optImg": "",
        "description": [
            "Здание гостиничного комплекса «Полярная звезда» - является памятником архитектуры и объектом культурного наследия Красноярского края. Это своеобразный символ города, который можно встретить в фотоальбомах и календарях о Норильске. К услугам гостей ресторан, бизнес-центр, тренажерный зал и салон красоты."
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "+73919252801",
            "email": "mail@polarstar-hotel.ru",
            "site": "https://polarstar-hotel.ru/",
            "address": "г. Норильск, Ленинский проспект, д. 2"
        },
        "href": "",
        "section": "Гостиницы"
    },
    {
        "id": "severgrand",
        "title": "Севергранд",
        "season": "",
        "time": "",
        "price": "",
        "bigImg": "",
        "smallImg": "./img/severgrand_logo03.svg",
        "optImg": "",
        "description": [
            "Новый отель 3* в центре Норильска. Комфортные номера с дизайнерским ремонтом: стандарт, стандарт Superior, Junior Suite, Luxe. Сервис  премиум-уровня и теплое арктическое гостеприимство."
            ],
        "tourPhoto": [],
        "contacts": {
            "tel": "+73919457038",
            "email": "hotel@severgrand.ru",
            "site": "https://severgrand.ru"
        },
        "href": "",
        "section": "Гостиницы"
    }
    
]


export const metadata = {
    title: 'Партнеры',
    description: 'В этом разделе представлены туры, экскурсии и гостиницы Норильска. Туры на плато Путорана. Джип-туры. Однодневные экскурсии. Спортивно-туристические походы. Гостиницы, базы отдыха.'
}

const sections = [
    'Туры и походы' ,"Гостиницы"
]

const Partners = () => {
  return (
    <main className={styles['partners-page']}>
        <div className = {`${styles['partners-page__content']} container`}>
            <div className={styles["partners-page__title"]}>
                <h1>Партнеры</h1>
                <h3>Территории Путорана</h3>
            </div>
            <BigCards 
                content = {partners} 
                imgFitContain = {true}
                sections = {sections}
                />
        </div>
    </main>
  )
}

export default Partners