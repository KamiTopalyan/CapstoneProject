import crypto from "crypto"

const raw = `{
    "iv":"uUwGJgxslfYiahji3+e2jA==",
    "docMimeType":"text\/xml",
    "doc":"1XLjWZlMMrgcpR6QtfwExQSOOPag1BJZTo1QEkcDrY6PFesWoVw8xrbHFsEYyMVDeemzk+5kBnb3\r\nqBmcUtkSFs7zDsxjYZkkEU9nyq1jXFz99fGylIealw37FPMaK0gviXESRO5AHMs46tpgSQcuWX0Z\r\nV7+mnTvjmaRHi4p1Cvg8aYfDO1aIWWWjAwOTCyopyCwribbGoEdiYDc5pERHpw=="
  }`;

export default function encryptPassword(password: string, plainKey: string) {
    const hashKey = crypto.createHash('sha256')
    hashKey.update(plainKey)
    
    let encrypted = Buffer.from(password, 'base64').toString('hex')
    return encrypted

}