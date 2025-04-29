export async function fetchProjects() {
    const res = await fetch('http://localhost:3000/data/projects.json')
    const tours = await res.json()
    return tours  
  }