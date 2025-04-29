export async function fetchProjects() {
    const res = await fetch('http://10.6.7.17:3000/data/projects.json')
    const tours = await res.json()
    return tours  
  }