import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export const generateToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        env.jwt as string,
        { expiresIn: '1d' }
    )
}