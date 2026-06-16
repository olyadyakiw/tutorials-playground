// import _ from 'lodash'

// const numbers = [1, 2, 3, 4, 5]

// _.chunk(numbers, 2)
import fs from 'node:fs'

import { z } from 'zod'

const datsSchema = z.object({
    title: z.string(),
    id: z.number(),
    values: z.array(z.union([z.string(), z.number()])),
})

type Data = z.infer<typeof datsSchema>

function output(data: Data) {
    console.log(data)
}

const content = JSON.parse(fs.readFileSync('data.json').toString())

const parsedData = datsSchema.parse(content)
output(parsedData)
