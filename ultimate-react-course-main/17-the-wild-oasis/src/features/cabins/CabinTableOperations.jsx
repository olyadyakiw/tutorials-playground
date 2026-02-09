import TableOperarions from '../../ui/TableOperations'
import Filter from '../../ui/Filter'

function CabinTableOperations() {
    return (
        <TableOperarions>
            <Filter
                filterField="discount"
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'no-discount', label: 'No discount' },
                    { value: 'with-discount', label: 'With discount' },
                ]}
            />
        </TableOperarions>
    )
}

export default CabinTableOperations
