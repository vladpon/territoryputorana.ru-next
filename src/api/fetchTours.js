export async function fetchTours() {
    const res = await fetch('http://10.6.7.17:3000/data/tours.json')
    const tours = await res.json()
    return tours  
  }