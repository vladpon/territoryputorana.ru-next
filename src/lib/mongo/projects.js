import clientPromise from ".";

let client
let db
let projects

async function init() {
    if(db) return
    try {
        client = await clientPromise
        db = await client.db()
        projects = await db.collection('projects')
    } catch (error) {
        throw new Error(error)
    }
}

;(async () => {
    await init()
})()




export async function getProjects() {
    try {
        if(!projects) await init()
            const result = await projects
                .find({})
                .toArray()
        
        return result
    } catch (error) {
        return {error: 'Failed to fetch projects'}
    }    
}
