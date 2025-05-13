/**
 * Filters jobs array based on searchedQuery object.
 * @param {Array} jobs - Array of job objects.
 * @param {Object} searchedQuery - Object with filterType keys and selected values (arrays).
 * @returns {Array} Filtered jobs array.
 */
export function filterJobs(jobs, searchedQuery) {
  if (!searchedQuery || typeof searchedQuery !== 'object') {
    return jobs;
  }

  // Helper to normalize salary string to number in rupees
  function normalizeSalary(salaryStr) {
    if (!salaryStr) return NaN;
    // Remove commas and spaces
    let str = salaryStr.replace(/,/g, '').replace(/\s+/g, '').toLowerCase();
    // Extract first number
    const match = str.match(/(\d+(\.\d+)?)/);
    if (!match) return NaN;
    let num = parseFloat(match[1]);
    // Convert k and lakh to numeric multiplier
    if (str.includes('lakh')) {
      num = num * 100000;
    } else if (str.includes('k')) {
      num = num * 1000;
    }
    return num;
  }

  return jobs.filter(job => {
    for (const [filterType, selectedValues] of Object.entries(searchedQuery)) {
      if (!selectedValues || selectedValues.length === 0) continue;

      // Convert selected values to lowercase once for all filters
      const selectedValuesLower = selectedValues.map(val => val.toLowerCase());

      switch (filterType) {
        case 'Location':
          if (!job.location || !selectedValuesLower.includes(job.location.toLowerCase())) {
            return false;
          }
          break;
        case 'Job Type':
          if (!job.jobType) return false;
          if (!selectedValuesLower.includes(job.jobType.toLowerCase())) {
            return false;
          }
          break;
        case 'Salary':
          if (!job.salary) return false;
          const salaryNum = normalizeSalary(job.salary);
          if (isNaN(salaryNum)) return false;
          const inAnyRange = selectedValuesLower.some(rangeStr => {
            // Normalize range string: lowercase, remove spaces, replace k and lakh with numeric values
            let normalizedRangeStr = rangeStr.toLowerCase().replace(/\s+/g, '');
            normalizedRangeStr = normalizedRangeStr.replace(/lakh/g, '00000').replace(/k/g, '000');
            const range = normalizedRangeStr.split('-');
            if (range.length !== 2) return false;
            const min = Number(range[0]);
            const max = Number(range[1]);
            if (isNaN(min) || isNaN(max)) return false;
            return salaryNum >= min && salaryNum <= max;
          });
          if (!inAnyRange) {
            return false;
          }
          break;
        case 'Job Mode':
          if (!job.jobMode) return false;
          if (!selectedValuesLower.includes(job.jobMode.toLowerCase())) {
            return false;
          }
          break;
        case 'Salary Type':
          if (!job.stipendType) return false;
          if (!selectedValuesLower.includes(job.stipendType.toLowerCase())) {
            return false;
          }
          break;
        default:
          // Unknown filter type, skip
          break;
      }
    }
    return true;
  });
}
