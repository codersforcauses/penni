/**
 * validateTaskID function
 *
 * This function validates a given task ID string to ensure it contains only numeric characters.
 * It uses a regular expression pattern to check if the task ID consists solely of digits.
 *
 * @param {string} id - The task ID string to be validated.
 * @returns {boolean} Returns true if the task ID is valid (contains only numbers), otherwise returns false.
 * @example
 * validateTaskID("123456"); // Returns true
 */

export function validateTaskID(id: string): boolean {
  // Define a regex pattern for a valid task ID (only numbers)
  const validIDPattern = /^[0-9]+$/;

  // Validate the taskID
  if (!id || !validIDPattern.test(id)) {
    return false;
  }
  return true;
}
