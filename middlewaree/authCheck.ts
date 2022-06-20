import { verify } from "jsonwebtoken"

export const authCheck = (req: any, res: any, next: any) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "User not authorization"})
        }
        const decodedData = verify(token, "secret")
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "User not authorization"})
    }
}