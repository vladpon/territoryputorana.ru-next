export const metadata = {
    title: '3d Жар.Птица',
    descritpion: 'Виртуальная прогулка по усадьбе «Жар. Птица» на озере Лама. Вы можете заглянуть во все домики усадьбы, в беседку и баню, полюбоваться живописным берегом и открывающимся видом на «горы без вершин».'
} 

const Locations = () => {

  return (
    <main style = {{height: '100vh', widows: '100%'}}>
        <iframe src='/3Dtours/locations.html' style = {{height: '100%', width: '100%', border: 'none'}}></iframe>
    </main>
  )
}

export default Locations