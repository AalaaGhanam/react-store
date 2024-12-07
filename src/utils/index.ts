import axios, { AxiosError } from 'axios'
import config from '../config'
import { notification } from 'antd'

const api = axios.create({
    baseURL: config.baseURL,
    headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const err = error as AxiosError
        return Promise.reject(err.response?.data)
    }
)

const openNotification = (message: string, type: string) => {
    if (type === 'error')
        notification.error({
            message,
            placement: 'bottom',
            duration: 5,
        })
    else
        notification.success({
            message,
            placement: 'bottom',
            duration: 3,
        })
}

const saveRecord = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getRecord = (key: string) => {
    const item = localStorage.getItem(key)
    if (item) return JSON.parse(item)
    return null
}

export { api, openNotification, saveRecord, getRecord }
