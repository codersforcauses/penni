export function validateTaskID(id: string): boolean {
  // Define a regex pattern for a valid task ID (only numbers)
  const validIDPattern = /^[0-9]+$/;

  // Validate the taskID
  if (!id || !validIDPattern.test(id)) {
    return false;
  }
  return true;
}
