import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { IconType } from 'react-icons'

interface SidebarItemProps {
    label: string
    href?: string
    icon: IconType
    onClick?: () => void
    auth?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ auth, label, href, icon: Icon, onClick }) => {
    const { data: currentUser } = useCurrentUser()
    const router = useRouter()
    const loginModal = useLoginModal()
    const handleClick = useCallback(() => {
        if (onClick) onClick()
        if (auth && !currentUser) {
            loginModal.onOpen()
        } else if (href) router.push(href)
    }, [router, onClick, href, loginModal, auth, currentUser])

    return (
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="relative rounded-full w-14 h-14 flex items-center justify-center p-4 hover:bg-slate-300/10 cursor-pointer lg:hidden">
                <Icon size={28} color="white" />
            </div>
            <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300/10 cursor-pointer items-center">
                <Icon size={24} color="white" />
                <p className="hidden lg:block text-white text-xl">{label}</p>
            </div>
        </div>
    )
}

export default SidebarItem
