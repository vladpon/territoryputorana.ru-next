import clientPromise from ".";

let client
let db
let pages

async function init() {
    if(db) return
    try {
        client = await clientPromise
        db = await client.db()
        pages = await db.collection('pages')
    } catch (error) {
        throw new Error(error)
    }
}

;(async () => {
    await init()
})()




export async function getPages() {
    try {
        if(!pages) await init()
            const result = await pages
                .find({})
                .toArray()
        
        return {pages: result}
    } catch (error) {
        return {error: 'Failed to fetch pages'}
    }    
}


export async function getPage(pathname) {
    try {
        if(!pages) await init()
            const result = await pages
                .findOne({pathname})
        
        return result
    } catch (error) {
        return {error: 'Failed to fetch pages'}
    }
}

export async function getMetadata(pathname) {
    try {
        if(!pages) await init()
            const result = await pages
                .findOne({pathname: pathname}, {projection: {metadata: 1}})
        return result.metadata
    } catch (error) {
        return {error: 'Failed to fetch pages'}
    }
}