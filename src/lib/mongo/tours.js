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
        throw new Error(error)
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
        
        return result
    } catch (error) {
        return {error: 'Failed to fetch tours'}
    }    
}


export async function getTour(tourId) {
    try {
        if(!tours) await init()
            const result = await tours
                .findOne({tourId})
        
        return {result}
    } catch (error) {
        return {error: 'Failed to fetch tours'}
    }    
}

export async function getToursProperty(property) {
    const propObj = { _id: false }
    propObj[property] = true
    
    try {
        if(!tours) await init()
            const res = await tours
                .find({}, {projection: propObj})
                .toArray()
        
        const result = res.map( tour => tour[property])

        return result
    } catch (error) {
        return {error: 'Failed to fetch tours'}
    }  
}