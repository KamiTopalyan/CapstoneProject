export function generate(): string {
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password: string = "" 

    for (let i = 0; i < 20; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
      }
    return password;

}