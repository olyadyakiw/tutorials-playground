import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fullName: '',
    initialId: '',
    createdAt: '',
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, initialId) {
                return { payload: { fullName, initialId, createdAt: new Date().toISOString() } }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName
                state.initialId = action.payload.initialId
                state.createdAt = action.payload.createdAt
            },
        },
        updateName(state, action) {
            state.fullName = action.payload
        },
    },
})

export const { createCustomer, updateName } = customerSlice.actions

export default customerSlice.reducer

// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case 'customer/createCustomer':
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalId: action.payload.nationalId,
//                 createdAt: action.payload.createdAt,
//             }
//         case 'customer/updateName':
//             return { ...state, fullName: action.payload }
//         default:
//             return state
//     }
// }

// export function createCustomer(fullName, nationalId) {
//     return { type: 'customer/createCustomer', payload: { fullName, nationalId, createdAt: new Date().toISOString() } }
// }

// export function updateName(fullName) {
//     return { type: 'customer/updateName', payload: { fullName } }
// }
