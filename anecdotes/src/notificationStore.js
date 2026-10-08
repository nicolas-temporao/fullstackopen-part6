import { create } from 'zustand'

const useNotificationStore = create(set => ({
    notification: null,
    setNotification: message =>
        set(() => ({
            notification: message 
        }))
}))

export default useNotificationStore