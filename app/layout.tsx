import './globals.scss'
import Header from './Components/Header/Header'


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
      <Header />
      <body>{children}</body>
    </html>
  )
}
