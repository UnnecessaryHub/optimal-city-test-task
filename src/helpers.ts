import {Message} from './types'

export const createBotMessage = (msg: string): Message => ({
    msg,
    sent: false,
    avatar: 'https://avatars.githubusercontent.com/in/29110?s=64&v=4',
    isOption: false
})

export const createUserMessage = (msg: string): Message => ({
    msg,
    sent: true,
    isOption: false,
    avatar: 'https://avatars.githubusercontent.com/u/74734213?v=4'
})

export const createOption = (msg: string): Message => ({
    msg,
    sent: false,
    avatar: 'https://avatars.githubusercontent.com/in/29110?s=64&v=4',
    isOption: true
})
