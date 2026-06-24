import { create } from 'zustand'

interface usePoroModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useProModal = create<usePoroModalStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))
