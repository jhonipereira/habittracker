import bcrypt from "bcrypt"
import {jwtVerify, SignJWT} from 'jose';
import { db } from "./db";
export const hashPassword = (passwd) => bcrypt.hash(passwd, 10)

export const comparePasswords = (plainPasswd, hashedPasswd) => bcrypt.compare(plainPasswd, hashedPasswd)

export const createJWT = user => {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 * 60 * 24 * 7

    return new SignJWT({payload: {id: user.id, email: user.email}})
        .setProtectedHeader({alg: "HS256", typ: "JWT"})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export const validateJWT = async (jwt) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload.payload as any;
}

export const getUserFromCookie = async (cookies) => {
    const jwt = cookies.get(process.env.COOKIE_NAME)

    const { id } = await validateJWT(jwt)

    const user = await db.user.findUnique({
        where: {
            id
        }
    })
    return user
}