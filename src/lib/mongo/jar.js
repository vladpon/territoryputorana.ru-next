import clientPromise from ".";

let client
let db
let jar

async function init() {
    if(db) return
    try {
        client = await clientPromise
        db = await client.db()
        jar = await db.collection('jar')
    } catch (error) {
        throw new Error(error)
    }
}

;(async () => {
    await init()
})()




export async function getJar() {
    try {
        if(!jar) await init()
            const result = await jar
                .find({})
                .toArray()
        
        return {result}
    } catch (error) {
        return {error: 'Failed to fetch jar'}
    }    
}