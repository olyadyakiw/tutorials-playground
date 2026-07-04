import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ChanelType, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import ServerHeader from './server-header'
import { ScrollArea } from '../ui/scroll-area'
import ServerSearch from './server-search'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { Separator } from '../ui/separator'
import ServerSection from './server-section'
import ServerChannel from './server-channel'
import ServerMember from './server-member'

interface ServerSidebarProps {
    serverId: string
}

const iconMap = {
    [ChanelType.TEXT]: <Hash className="mr-2 w-4 h-4" />,
    [ChanelType.AUDIO]: <Mic className="mr-2 w-4 h-4" />,
    [ChanelType.VIDEO]: <Video className="mr-2 w-4 h-4" />,
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="text-indigo-500 mr-2 w-4 h-4" />,
    [MemberRole.ADMIN]: <ShieldAlert className="text-rose-500 mr-2 w-4 h-4" />,
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile()

    if (!profile) {
        return redirect('/')
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: 'asc',
                },
            },
        },
    })

    if (!server) {
        return redirect('/')
    }

    const textChannels = server?.channels.filter(channel => channel.type === ChanelType.TEXT)
    const audioChannels = server?.channels.filter(channel => channel.type === ChanelType.AUDIO)
    const videoChannels = server?.channels.filter(channel => channel.type === ChanelType.VIDEO)
    const members = server?.members.filter(member => member.profileId !== profile.id)

    const role = server.members.find(member => member.profileId === profile.id)?.role

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
            <ServerHeader server={server} role={role} />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch
                        data={[
                            {
                                label: 'Text Channels',
                                type: 'channel',
                                data: textChannels?.map(channel => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                })),
                            },
                            {
                                label: 'Audio Channels',
                                type: 'channel',
                                data: audioChannels?.map(channel => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                })),
                            },
                            {
                                label: 'Video Channels',
                                type: 'channel',
                                data: videoChannels?.map(channel => ({
                                    icon: iconMap[channel.type],
                                    name: channel.name,
                                    id: channel.id,
                                })),
                            },
                            {
                                label: 'Members',
                                type: 'member',
                                data: members?.map(member => ({
                                    icon: roleIconMap[member.role],
                                    name: member.profile.name,
                                    id: member.id,
                                })),
                            },
                        ]}
                    />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
                <div className="space-y-[2px]">
                    {!!textChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType={ChanelType.TEXT}
                                role={role}
                                label="Text Channels"
                            />
                            {textChannels.map(channel => (
                                <ServerChannel key={channel.id} channel={channel} role={role} server={server} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="space-y-[2px]">
                    {!!audioChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType={ChanelType.AUDIO}
                                role={role}
                                label="Voice Channels"
                            />
                            {audioChannels.map(channel => (
                                <ServerChannel key={channel.id} channel={channel} role={role} server={server} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="space-y-[2px]">
                    {!!videoChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType={ChanelType.VIDEO}
                                role={role}
                                label="Video Channels"
                            />
                            {videoChannels.map(channel => (
                                <ServerChannel key={channel.id} channel={channel} role={role} server={server} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="space-y-[2px]">
                    {!!members?.length && (
                        <div className="mb-2">
                            <ServerSection sectionType="members" role={role} label="Members" server={server} />
                            {members.map(member => (
                                <ServerMember key={member.id} member={member} server={server} />
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}

export default ServerSidebar
