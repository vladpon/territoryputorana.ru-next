import clientPromise from ".";

let client
let db
let partners

async function init() {
    if(db) return
    try {
        client = await clientPromise
        db = await client.db()
        partners = await db.collection('partners')
    } catch (error) {
        throw new Error(error)
    }
}

;(async () => {
    await init()
})()




export async function getPartners() {
    try {
        if(!partners) await init()
            const result = await partners
                .find({})
                .toArray()
        
        return result
    } catch (error) {
        return {error: 'Failed to fetch partners'}
    }    
}
