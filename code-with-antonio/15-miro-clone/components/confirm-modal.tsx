'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ConfirmModalProps {
    children: React.ReactNode
    onConfirm: () => void
    disabled?: boolean
    header: string
    description?: string
}

const ConfirmModal = ({ children, onConfirm, disabled, description, header }: ConfirmModalProps) => {
    const handleConfirm = () => {
        onConfirm()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{header}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={disabled} onClick={handleConfirm}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmModal
