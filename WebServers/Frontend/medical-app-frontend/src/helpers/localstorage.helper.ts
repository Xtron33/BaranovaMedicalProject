export function getTokenFromLocalStorage(): string{
    const data = localStorage.getItem('token')
    const token: string = data ? JSON.parse(data) : ''

    return token
}

export function setTokenToLocalStorage(key: string, token: string):void{
    localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string): void{
    localStorage.removeItem(key)
}

export function getThemeFromLocalStorage(): string{
    const data = localStorage.getItem('theme')
    return data ? JSON.parse(data) : 'light'
}

export function setThemeToLocalStorage(key: string, theme: string):void{
    localStorage.setItem(key, JSON.stringify(theme))
}