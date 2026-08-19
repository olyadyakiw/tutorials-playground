import Hint from '@/components/hint'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

interface UserAvatarProps {
    src?: string
    name?: string
    fallback?: string
    borderColor?: string
}

const UserAvatar = ({ src, name, fallback, borderColor }: UserAvatarProps) => {
    return (
        <Hint label={name || 'Teammate'} side="bottom" sideOffset={18}>
            <Avatar className="w-6 h-6 border-2 bg-slate-100 flex justify-center items-center" style={{ borderColor }}>
                <AvatarImage src={src} />
                <AvatarFallback className="text-[10px] font-semibold">{fallback}</AvatarFallback>
            </Avatar>
        </Hint>
    )
}

export default UserAvatar
