import { FormInput } from '@/components/form/form-input'
import FormSubmit from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'

const OrganizationIdPage = async () => {
    const boards = await db.board.findMany()
    return (
        <div className="flex flex-col space-y-4">
            <form>
                <FormInput id="title" label="Title" />
                <FormSubmit>Submit</FormSubmit>
            </form>
            <div className="space-y-2">
                {boards.map(board => (
                    <div key={board.id}>{board.title}</div>
                ))}
            </div>
        </div>
    )
}

export default OrganizationIdPage
