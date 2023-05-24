import crypto from "crypto"

export default function encryptPassword(password: string, key: string, iv: string) {

    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key, "hex"), Buffer.from(iv, "hex"))
    let encrypted = cipher.update(password)
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex")

}