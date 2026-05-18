import { calculateInvestmentResults, formatter } from '../util/investment'

function Table({ investments }) {
    const data = calculateInvestmentResults(investments)
    let totalInterest = 0
    let { initialInvestment, annualInvestment } = investments
    let investedCapital = initialInvestment

    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => {
                    totalInterest = totalInterest + row.interest
                    investedCapital = initialInvestment + annualInvestment * row.year
                    return (
                        <tr key={index}>
                            <td>{row.year}</td>
                            <td>{formatter.format(row.valueEndOfYear)}</td>
                            <td>{formatter.format(row.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(investedCapital)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
