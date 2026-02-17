
import VkBlock from '../Components/VkBlock/VkBlock'
import styles from './about.module.scss'
import AboutPartners from './AboutPartners'


export const metadata = {
    title: 'Авторские туры и экспедиции на Плато Путорана с местным гидом!',
    description: 'Популярные авторские туры и экспедиции на Плато Путорана с местным гидом / туроператором смотрите на сайте или узнавайте по телефону 8 (903) 929-93-83. Плато Путорана туры и цены вылет Красноярск, Москва. Мы покажем вам самые известные достопримечательности и места Плато Путорана, где практически не ступала нога человека. Бронируйте туры на Плато Путорана онлайн на сайте.'
}


const AboutPage = () => {

  return (
    <main>
        <div className = {styles["about-page__cover"]}>
            <img className = {styles["about-page__bg"]} src='./img/about_cover.jpg' />
            <div className = {styles["about-page__text"]}>
                <h1>О компании</h1>
            </div>
        </div>   
        <div className = {`${styles["about-page__content"]} container`}>
          <div className={styles['about-page__about']}>
                <div className = {styles['about-page__title']}>
                    <h2><span>Туры</span> и экспедиции</h2>
                    <p>с местным туроператором</p>
                </div>
                <div className = {styles['about-page__rowcontainer']}>                
                  <div className = {styles["about-page__owner"]}>
                    <img src='/img/anton3.jpg'></img>                  
                  </div>
                  <div className = {styles["about-page__description"]}>                  
                      <p>Более 10 лет мы занимаемся организацией туров и экспедиций на плато Путорана и знаем, чем удивить самого искушенного путешественника.</p>
                      <p>Самые известные достопримечательности и места, где практически не ступала нога человека, мощный трекинг для выносливых и полёты на вертолётах, северная гастрономия от шеф-повара и гриль-пикники у водопадов — мы устроим для вас настоящее приключение в дикой природе с максимальным комфортом и эксклюзивным сервисом.</p>
                      <p>Мы работаем с корпоративными и частными группами, организуем персональные туры с индивидуальной программой, гастрономические и ивент-туры.</p>
                      <p>Можете быть уверены, что путешествие в затерянный мир плато Путорана вместе с нами подарит вам самые яркие эмоции и запомнится надолго.</p>
                      <div className={styles['about-page__ownerdesc']}>
                        <h3>Антон Лысов</h3> 
                        <p>Основатель и руководитель компании «Территория Путорана»</p>
                        <p>Член Русского географического общества</p>
                        <p>Организатор проектов «Экспедиции Арктики», «Чисто Лама», «SNOW RIDE Putorana»</p>
                    </div>
                  </div>
                </div>           
          </div>
       </div>

       <AboutPartners />
       <VkBlock />
    </main>
  )
}

export default AboutPage