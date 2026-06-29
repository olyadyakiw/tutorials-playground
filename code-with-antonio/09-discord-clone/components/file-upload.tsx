'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

import { UploadDropzone } from '@/lib/uploadthing'

interface FileUploadProps {
    onChange: (url?: string) => void
    value: string
    endpoint: 'messageFile' | 'serverImage'
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value?.split('.').pop()

    if (value && fileType !== 'pdf') {
        return (
            <div className="relative w-20 h-20">
                <Image fill alt="Upload" src={value} className="rounded-full" />
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={res => {
                onChange(res?.[0]?.serverData?.url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}

export default FileUpload
