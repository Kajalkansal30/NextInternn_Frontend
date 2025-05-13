/**
 * Generate dynamic salary ranges from an array of salary strings.
 * @param {Array} salaries - Array of salary strings (e.g., "50k", "1 lakh", "50000").
 * @returns {Array} Array of salary range strings (e.g., "0-40k", "40k-1lakh").
 */
export function generateSalaryRanges(salaries) {
  if (!Array.isArray(salaries) || salaries.length === 0) return [];

  // Parse numeric salary values from strings
  const numericSalaries = salaries
    .map(salaryStr => {
      if (!salaryStr) return null;
      const lowerStr = salaryStr.toLowerCase();
      let num = Number(lowerStr.replace(/[^0-9]/g, ''));
      if (lowerStr.includes('lakh')) {
        num *= 100000;
      } else if (lowerStr.includes('k')) {
        num *= 1000;
      }
      return isNaN(num) ? null : num;
    })
    .filter(num => num !== null)
    .sort((a, b) => a - b);

  if (numericSalaries.length === 0) return [];

  // Define fixed ranges or create dynamic ranges based on data distribution
  // For simplicity, use fixed ranges here:
  const ranges = [
    { min: 0, max: 40000, label: '0-40k' },
    { min: 40001, max: 100000, label: '40k-1lakh' },
    { min: 100001, max: 500000, label: '1lakh-5lakh' },
    { min: 500001, max: 1000000, label: '5lakh-10lakh' },
    { min: 1000001, max: 2000000, label: '10lakh-20lakh' },
  ];

  // Filter ranges to only those that have salaries in them
  const filteredRanges = ranges.filter(range => {
    return numericSalaries.some(salary => salary >= range.min && salary <= range.max);
  });

  return filteredRanges.map(r => r.label);
}
