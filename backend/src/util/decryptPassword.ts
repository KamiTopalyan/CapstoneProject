import crypto from "crypto"

export default function decryptPassword(encryptedPassword: string, key: string, iv: string) {
    
    console.log(Buffer.from(iv, "hex"))
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, "hex"))
    
    decipher.setAutoPadding(false)
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')
    return decrypted

}