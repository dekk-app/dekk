/* eslint-disable import/prefer-default-export */

/**
 * Checks if a value is numeric.
 * @private
 */
const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)

export {isNumeric}
