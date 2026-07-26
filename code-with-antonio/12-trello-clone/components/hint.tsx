import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface HintProps {
    children: React.ReactNode
    desctiption: string
    side?: 'left' | 'right' | 'top' | 'bottom'
    sideOffset?: number
}

const Hint = ({ children, desctiption, side, sideOffset }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent sideOffset={sideOffset} side={side} className="text-xs max-w-[220px] break-words">
                    {desctiption}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Hint
