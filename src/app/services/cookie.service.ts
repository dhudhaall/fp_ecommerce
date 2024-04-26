const environment = {
    mainDomain:'.asakashi.com'
};
import { Buffer } from 'buffer';

export class Cookie {
    static setToken(token: any): void {
        token = Buffer.from(token).toString('base64')
        document.cookie = `_fpecu=${token}; domain=${environment.mainDomain}; path=/;`
    }

    static getToken(): string {
        const name = '_fpecu'
        const regex = new RegExp(`(^| )${name}=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
            return Buffer.from(match[2].trim(), 'base64').toString('ascii')
        } else {
            return ''
        }
    }

    static removeToken(): void {
        document.cookie = `_fpecu=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${environment.mainDomain}; path=/;`
    }
}