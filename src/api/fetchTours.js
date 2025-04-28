export async function fetchTours() {
    const res = await fetch('http://192.168.1.100:3000/data/tours.json')
    const tours = await res.json()
    return tours  
  }