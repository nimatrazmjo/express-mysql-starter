import { JwtPayload, sign, verify } from "jsonwebtoken";
import { UserPayload } from "../interfaces/user-payload.interface";


const generateToken = (payload: UserPayload) => sign(payload, process.env.SECRET_KEY);

const verifyToken = (token: string) => verify(token, process.env.SECRET_KEY);

export { generateToken, verifyToken }