type InvestmentData = {
    initialAmount: number
    annualContribution: number
    expectedReturn: number
    duration: number
}

type InvestmentResult = {
    year: string
    totalAmount: number
    totalContributions: number
    totalInterest: number
}

type CalculationResult = InvestmentResult[] | string

function calculateInvestment(data: InvestmentData): CalculationResult {
    const { initialAmount, annualContribution, expectedReturn, duration } = data

    if (initialAmount < 0) {
        return 'Initial investment amount must be at least zero.'
    }

    if (duration <= 0) {
        return 'No valid years'
    }

    if (expectedReturn < 0) {
        return 'Expected return must be at least zero'
    }

    let total = initialAmount
    let totalContributions = 0
    let totalInterest = 0

    const annualResults: InvestmentResult[] = []

    for (let i = 0; i < duration; i++) {
        total = total * (1 + expectedReturn)
        totalInterest = total - totalContributions - initialAmount
        totalContributions = totalContributions + annualContribution
        total = total + annualContribution

        annualResults.push({
            year: `Year ${i + 1}`,
            totalAmount: total,
            totalInterest,
            totalContributions,
        })
    }

    return annualResults
}

function printResults(results: CalculationResult) {
    if (typeof results === 'string') {
        console.log(results)
        return
    }

    for (const yearEndResults of results) {
        console.log(yearEndResults.year)
        console.log(`Total: ${yearEndResults.totalAmount.toFixed(0)}`)
        console.log(`Total contributions: ${yearEndResults.totalContributions.toFixed(0)}`)
        console.log(`Total interest earned: ${yearEndResults.totalInterest.toFixed(0)}`)
        console.log('---------------------------')
    }
}

const investmentData: InvestmentData = {
    initialAmount: 5000,
    annualContribution: 500,
    expectedReturn: 0.08,
    duration: 10,
}

const results = calculateInvestment(investmentData)

printResults(results)
