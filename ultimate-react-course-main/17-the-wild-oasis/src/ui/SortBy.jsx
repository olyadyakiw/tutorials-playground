import { useSearchParams } from 'react-router-dom'
import Select from './Select'

function SortBy({ options }) {
    const [searchParams, setSearcharams] = useSearchParams()
    const sortBy = searchParams.get('sortBy') || ''

    function handleChange(e) {
        searchParams.set('sortBy', e.target.value)
        setSearcharams(searchParams)
    }
    return <Select onChange={handleChange} options={options} value={sortBy} type="white" />
}

export default SortBy
