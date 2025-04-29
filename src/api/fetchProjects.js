export async function fetchProjects() {
    const res = await fetch(process.env.API_URI + '/data/projects.json')
    const tours = await res.json()
    return tours  
  }