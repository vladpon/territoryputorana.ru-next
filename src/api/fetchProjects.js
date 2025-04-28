export async function fetchProjects() {
    const res = await fetch('http://192.168.1.100:3000/data/projects.json')
    const tours = await res.json()
    return tours  
  }