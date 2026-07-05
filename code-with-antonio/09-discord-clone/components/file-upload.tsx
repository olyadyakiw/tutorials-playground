'use client'

import { useState } from 'react'
import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'

import { UploadDropzone } from '@/lib/uploadthing'

interface FileUploadProps {
    onChange: (url?: string) => void
    onFileTypeChange?: (fileType?: string) => void
    value: string
    endpoint: 'messageFile' | 'serverImage'
}

const FileUpload = ({ onChange, onFileTypeChange, value, endpoint }: FileUploadProps) => {
    const [uploadedFileType, setUploadedFileType] = useState<string>()

    const isPdf = uploadedFileType === 'application/pdf' || value?.toLowerCase().endsWith('.pdf')

    const handleRemove = () => {
        setUploadedFileType(undefined)
        onFileTypeChange?.(undefined)
        onChange('')
    }

    if (value && !isPdf) {
        return (
            <div className="relative w-20 h-20">
                <Image fill alt="Upload" src={value} className="rounded-full" />
                <button
                    type="button"
                    onClick={handleRemove}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    } else if (value && isPdf) {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline text-ellipsis max-w-sm overflow-x-hidden"
                >
                    {value}
                </a>
                <button
                    type="button"
                    onClick={handleRemove}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
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
                const file = res?.[0]

                setUploadedFileType(file?.type)
                onFileTypeChange?.(file?.type)
                onChange(file?.url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}

export default FileUpload
