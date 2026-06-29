import { auth } from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

const handleAuth = () => {
    const { userId } = auth()

    if (!userId) {
        throw new UploadThingError('Unauthorized')
    }

    return { userId }
}

export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(({ metadata, file }) => {
            return {
                uploadedBy: metadata.userId,
                url: file.ufsUrl,
                key: file.key,
            }
        }),

    messageFile: f({
        image: { maxFileSize: '4MB', maxFileCount: 1 },
        pdf: { maxFileSize: '4MB', maxFileCount: 1 },
    })
        .middleware(() => handleAuth())
        .onUploadComplete(({ metadata, file }) => {
            return {
                uploadedBy: metadata.userId,
                url: file.ufsUrl,
                key: file.key,
            }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
