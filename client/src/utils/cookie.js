import {Cookies} from 'react-cookie'

const cookie = new Cookies()

export const setCookie = (name, value) => {
    return cookie.set(name, value)
}

export const removeCookie = (name) => {
    return Cookies.remove(name)
}