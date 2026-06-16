'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const activefilter = searchParams.get('capacity') ?? 'all'

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams)
        params.set('capacity', filter)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="border border-primary-800 flex">
            <Button filter="all" handleFilter={handleFilter} activeFilter={activefilter}>
                All cabins
            </Button>
            <Button filter="small" handleFilter={handleFilter} activeFilter={activefilter}>
                1-3 guests
            </Button>
            <Button filter="medium" handleFilter={handleFilter} activeFilter={activefilter}>
                4-7 guests
            </Button>
            <Button filter="large" handleFilter={handleFilter} activeFilter={activefilter}>
                8-12 guests
            </Button>
        </div>
    )
}

function Button({ children, filter, handleFilter, activeFilter }) {
    return (
        <button
            onClick={() => handleFilter(filter)}
            className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''}`}
        >
            {children}
        </button>
    )
}

export default Filter
