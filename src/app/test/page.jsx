import handler from '../../api/fetchToursDB'
import { getTours } from '../../lib/mongo/tours'
import styles from './test.module.scss'

async function fetchToursFromDB() {
    const { tours }  = await getTours()
    return tours
}

const test = async () => {
    const tours = await fetchToursFromDB()
    console.log(tours)
  return (
    <div className = {styles.content}>
        <ul>
            {tours && tours.map( (tour, index) => <li key = {index}>{tour.title}</li>)}
        </ul>
    </div>
  )
}

export default test