import { Raleway } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import './globals.scss'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

const raleway = Raleway({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic'],
})


const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic'],
})


export const metadata = {
  title: 'Территория Путорана',
  description: 'Плато Путорана Туры - Цена – Туристические маршруты на Плато Путорана смотрите на сайте или узнавайте по телефону 8 (903) 929-93-83. Плато Путорана туры и цены на 2023 – 2024 год вылет на Плато из Красноярска или Москвы. Бронируйте туры на Плато Путорана онлайн на сайте.',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (    
    <html lang="ru">    
      <body className={raleway.className}>  
          <script src="https://vk.com/js/api/openapi.js?169"></script>      
          <Header />
          {children}
          <Footer />
      </body>
    </html>
  )
}
