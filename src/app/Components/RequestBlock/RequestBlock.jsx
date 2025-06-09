'use client'
import React, { useEffect } from 'react'
import styles from './RequestBlock.module.scss'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import { fetchTours } from '../../../api/fetchTours'




const RequestBlock = (props) => {
    const { bgImage, h2Text, h3Text } = props
    const [toursNames, setToursNames]  = useState([])
    const [tours, setTours] = useState([])

    const fetchToursNames = async () => {
      try {
        const res = await fetch('/api/tours?property=tourId', 
          {
            headers: {
              Accept: 'application/json',
              method: 'GET',
            },
          }
        )
        if(res) {
        const data = await res.json()
      }
      } catch (error) {
        console.log(error)
      }      
    }

    fetchToursNames().then(arr => setToursNames(arr))

    // useEffect( () => {
    //   fetchTours().then(res => {
    //     setTours(res)
    //     setToursNames(res.map( item => item.title))
    //   })
    // }, [])

    
    // const styleString = '.req-block::before{background-image: url(' + bgImage + ');}'

    const token = '5861006903:AAFry8owUoELNl7R6zg8d0zzAhvJaXm1e4Y';
    const chatId = '-641195533';
    const chat2Id = '-993753426';
    const testChatId = '-979763403'

    const [ipName, setIpName]  = useState('');
    const [ipEmail, setIpEmail] = useState('');
    const [ipTel, setIpTel] = useState('');
    const [ipTour, setIpTour] = useState('')
    const [ipCount, setIpCount] = useState('')
    const [ipText, setIpText] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);

    


    const handleSubmit = (e) => {

      //  lama tbot for camping
      // let url = (ipTour === 'Палаточный кемпинг на озере Лама') ? 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chat2Id + '&parse_mode=html&text=' :
      // 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chatId + '&parse_mode=html&text='

       // test tbot
       

      let url = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chatId + '&parse_mode=html&text='

      if (ipName === 'TEST') {
        url = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + testChatId + '&parse_mode=html&text='
      }

     

      e.preventDefault()

      if (ipName === '') {
        alert('Введите Ваше имя')
        return
      }
      if (ipTel === '') {
        alert('Введите Ваш телефон')
        return
      }
      if (ipTour === '') {
        alert('Выберите тур')
        return
      }
      if (ipCount === '') {
        alert('Введите количество участников')
        return
      }

      const query = url + '<b>Имя:</b> ' + ipName + '%0A<b>e-mail:</b> ' + ipEmail  + '%0A<b>Телефон:</b> ' + ipTel + '%0A<b>Выбранный тур:</b> ' + ipTour + '%0A<b>Количество участников:</b> ' + ipCount + '%0A<b>Дополнительная информация:</b> ' + ipText


      // if (ipTour === 'Палаточный кемпинг на озере Лама' && ipCount < 8) {
      //   const reqBody =  new URLSearchParams({
      //     'name': ipName,
      //     'email': ipEmail
      //     })
      //   let options = {
      //     method: 'POST',
      //     body: reqBody,
      //     headers: {
      //       'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      //     }
      //   }
      //   try {
      //     const res = fetch('https://territoryputorana.ru/api/mailer.php', options)
      //     console.log(res)
      //   }
      //   catch (err) {
      //     console.error(err)
      //   }
      // }


      //!!! DB REQ INFO STORE

      // putRequest({
      //   'new-request': true,
      //   'request-page': location.pathname,
      //   'client-name': ipName,
      //   'client-email': ipEmail,
      //   'client-tel': ipTel,
      //   'select-value': ipTour,
      //   'members-count': ipCount,
      //   'aux-text': ipText
      // })
      

      fetch(query)
      setShowThankYou(true)
      

      setIpName('')
      setIpEmail('')
      setIpTel('')
      setIpTour('')
      setIpCount('')
      setIpText('')      
    }

    //MODAL TY
    // const thankYou = (name) => {
    //   return (
    //     <div className='thankyou'>
    //       <div className='thankyou__close' onClick={() => setShowThankYou(false)}></div>
    //       <div className='thankyou__text'>
    //         <h3>Спасибо, {name}! </h3> <br/>
    //         <h3>Скоро с Вами свяжется наш менеджер.</h3></div>
    //     </div>
    //   )
    // }


  return (
    <div className={styles['req-block__container']} style = {{backgroundImage: `url(${bgImage})`}}>
      <div className = {`${styles["req-block"]} container`}>
          {/* {showThankYou && thankYou(ipName)} */}
          {showThankYou && redirect('/thankyou')}
          <div className = {styles["req-block__text"]}>
              <h2>{h2Text}</h2>
              <h3>{h3Text}</h3>
          </div>
          <form name = 'request__form' action = "#">
              <input type="text" required  name="name" placeholder="Имя" value = {ipName} onChange={ (e) => setIpName(e.target.value)} />
              <input type="email" name="email" placeholder="e-mail" value = {ipEmail} onChange={ (e) => setIpEmail(e.target.value)} />
              <input type="tel" required  name="tel" placeholder="Телефон" value = {ipTel} onChange={ (e) => setIpTel(e.target.value)} />
              <select name ="tour-select" onChange={ (e) => setIpTour(e.target.value)} defaultValue = 'Какой тур Вас интересует'>
                <option disabled>Какой тур Вас интересует</option>
                {toursNames.map( (item, index) => {
                  return (
                    <option key={index} value = {item}>{item}</option>
                  )
                })}
              </select>
              <input type="text" required  name="count" placeholder="Количество участников в Вашей группе" value = {ipCount} onChange={ (e) => setIpCount(e.target.value)} />
              <textarea name="text" placeholder="Дополнительная информация (желательные даты)" rows="5" value = {ipText} onChange={ (e) => setIpText(e.target.value)} />
              <button  className = {styles['main-button']} onClick={(e) => handleSubmit(e)}>Отправить</button>
              <label>Нажимая кнопку "Отправить", вы соглашаетесь с <a href = '/privacy'>обработкой персональных данных</a></label>
          </form>
          {/* <style>{styleString}</style> */}
      </div>
    </div>    
  )
}

export default RequestBlock