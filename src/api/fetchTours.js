export async function fetchTours() {
    const res = await fetch('http://localhost:3000/data/tours.json')
    const tours = await res.json()
    return tours  
  }