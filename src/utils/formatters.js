/**
 * Moneta Financial Formatters & Compound Mathematical Engines
 * Strictly adheres to Indian numbering format (Lakhs / Crores)
 */

export function formatINR(amount, showSymbol = true) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const val = Math.round(amount);
  
  // Custom Indian numbering grouping format
  const isNegative = val < 0;
  const absValStr = Math.abs(val).toString();
  
  let lastThree = absValStr.substring(absValStr.length - 3);
  const otherNumbers = absValStr.substring(0, absValStr.length - 3);
  
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  const prefix = isNegative ? '-₹' : '₹';
  
  return showSymbol ? `${prefix}${formatted}` : (isNegative ? `-${formatted}` : formatted);
}

export function formatLakh(amount) {
  if (!amount) return '₹0';
  const inLakhs = amount / 100000;
  if (inLakhs >= 100) {
    return `₹${(inLakhs / 100).toFixed(2)} Cr`;
  }
  return `₹${inLakhs.toFixed(2)} Lakh`;
}

/**
 * Calculates future value of a monthly SIP with optional annual step-up.
 * @param {number} initialInvestment - Starting lump sum
 * @param {number} monthlyContribution - Starting monthly SIP
 * @param {number} annualRate - Annual rate of return in decimal (e.g. 0.12 for 12%)
 * @param {number} months - Total duration in months
 * @param {number} annualStepUp - Annual step-up percentage in decimal (e.g. 0.10 for 10%)
 */
export function calculateSipTrajectory(
  initialInvestment = 42500,
  monthlyContribution = 2000,
  annualRate = 0.12,
  months = 78,
  annualStepUp = 0.10
) {
  const monthlyRate = annualRate / 12;
  let currentPortfolio = initialInvestment;
  let totalDeposited = initialInvestment;
  let currentMonthly = monthlyContribution;

  const trajectory = [];

  for (let m = 1; m <= months; m++) {
    // Step up monthly contribution every 12 months after year 1
    if (m > 1 && (m - 1) % 12 === 0 && annualStepUp > 0) {
      currentMonthly = Math.round(currentMonthly * (1 + annualStepUp));
    }

    currentPortfolio = (currentPortfolio + currentMonthly) * (1 + monthlyRate);
    totalDeposited += currentMonthly;

    trajectory.push({
      month: m,
      year: +(m / 12).toFixed(1),
      deposited: Math.round(totalDeposited),
      portfolioValue: Math.round(currentPortfolio),
      compoundGains: Math.round(currentPortfolio - totalDeposited),
      monthlyContribution: currentMonthly,
    });
  }

  return {
    finalValue: Math.round(currentPortfolio),
    totalDeposited: Math.round(totalDeposited),
    compoundGains: Math.round(currentPortfolio - totalDeposited),
    monthsToGoal: months,
    trajectory,
  };
}

/**
 * Calculates estimated months to reach a target corpus with monthly SIP and optional step-up.
 */
export function calculateMonthsToTarget(
  target = 1000000,
  initialInvestment = 42500,
  monthlyContribution = 2000,
  annualRate = 0.12,
  annualStepUp = 0.10
) {
  if (monthlyContribution <= 0 && initialInvestment <= 0) return 999;
  
  const monthlyRate = annualRate / 12;
  let currentPortfolio = initialInvestment;
  let totalDeposited = initialInvestment;
  let currentMonthly = monthlyContribution;
  let month = 0;
  const maxMonths = 360; // 30 years ceiling

  while (currentPortfolio < target && month < maxMonths) {
    month++;
    if (month > 1 && (month - 1) % 12 === 0 && annualStepUp > 0) {
      currentMonthly = Math.round(currentMonthly * (1 + annualStepUp));
    }
    currentPortfolio = (currentPortfolio + currentMonthly) * (1 + monthlyRate);
    totalDeposited += currentMonthly;
  }

  return {
    months: month,
    years: +(month / 12).toFixed(1),
    totalDeposited: Math.round(totalDeposited),
    finalValue: Math.round(currentPortfolio),
    compoundGains: Math.round(currentPortfolio - totalDeposited),
  };
}
