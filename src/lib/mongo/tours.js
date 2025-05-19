import clientPromise from ".";

let client
let db
let tours

async function init() {
    if(db) return
    try {
        client = await clientPromise
        db = await client.db()
        tours = await db.collection('tours')
    } catch (error) {
        throw new Error('Failed connection to db')
    }
}

;(async () => {
    await init()
})()




export async function getTours() {
    try {
        if(!tours) await init()
            const result = await tours
                .find({})
                .toArray()
        
        return {tours: result}
    } catch (error) {
        return {error: 'Failed to fetch tours'}
    }    
}