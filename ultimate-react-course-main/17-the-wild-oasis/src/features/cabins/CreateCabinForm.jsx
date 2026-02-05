import styled from 'styled-components'

import Input from '../../ui/Input'
import FormRow from '../../ui/FormRow'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

function CreateCabinForm() {
    const queryClient = useQueryClient()

    const { register, handleSubmit, reset, getValues, formState } = useForm()
    const { errors } = formState
    console.log(errors)
    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success('Added!')
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
            reset()
        },
        onError: err => toast.error(err.message),
    })

    function onSubmit(data) {
        mutate(data)
    }

    function onError(errors) {
        console.log(errors)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    disabled={isCreating}
                    type="text"
                    id="name"
                    {...register('name', { required: 'This field is required' })}
                />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input
                    disabled={isCreating}
                    type="number"
                    id="maxCapacity"
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    disabled={isCreating}
                    type="number"
                    id="regularPrice"
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isCreating}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: value => value <= getValues().regularPrice || 'Discount should be less than price',
                    })}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Textarea
                    disabled={isCreating}
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register('description', { required: 'This field is required' })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput id="image" accept="image/*" />
            </FormRow>
            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Edit cabin</Button>
            </FormRow>
        </Form>
    )
}

export default CreateCabinForm
