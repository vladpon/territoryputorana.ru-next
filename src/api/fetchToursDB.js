import { getTours } from "../lib/mongo/tours";

const handler = async (req, res) => {
    if(req.method === 'GET') {
        try {
            const { tours, error } = await getTours()
            if (error) throw new Error(error)

            return res.status(200).json({ tours })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Metod ${req.method} is not allowed`)
}

export default handler