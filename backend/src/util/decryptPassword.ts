import crypto from "crypto"

export default function decryptPassword(encryptedPassword: string, key: string, iv: string) {

    const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(key, "hex"), Buffer.from(iv, "hex"))
    let decrypted = decipher.update(Buffer.from(encryptedPassword, "hex"))
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString()
}