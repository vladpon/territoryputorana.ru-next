export async function fetchTours() {
    const res = await fetch(process.env.API_URI + '/data/tours.json')
    const tours = await res.json()
    return tours  
  }