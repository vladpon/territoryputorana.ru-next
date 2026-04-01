import clientPromise from ".";

async function getCollection() {
    const client = await clientPromise
    const db = client.db()
    return db.collection('tours')
}

export async function getTours() {
    try {
        const tours =  await getCollection()

        const result = await tours.find({}).toArray()

        return result
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch tours')
    }
}


////добавить  projection!
export async function getMainPageTours() {
    try {
        const tours =  await getCollection()

        const result = await tours
            .find({ mainPageOrder: { $gt: 0 } })
            .sort({ mainPageOrder: 1 })
            .toArray()

        return result
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch main page tours')
    }
}




export async function getTour(tourId) {
    try {
        const tours =  await getCollection()

        const result = await tours.findOne({tourId})

        return result
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch tours')
    }

}

export async function getToursProperty(property) {
    const propObj = { _id: false }
    propObj[property] = true

    try {
        const tours =  await getCollection()
        const result = await tours.find({}, {projection: propObj}).toArray()
        return result.map(tour => tour[property])

    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch tours')
    }    
   
}



export async function updateTour(tourId, updateData) {
    try {
        const tours = await getCollection()

        const result = await tours.updateOne(
            { tourId },
            { $set: updateData }
        )

        return result
    } catch (error) {
        console.error(error)
        throw new Error("Failed to update tour")
    }
}