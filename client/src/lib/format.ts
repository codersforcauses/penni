/**
 * formatDate function
 *
 * This function takes a date string in the format "DD/MM/YYYY" and returns a formatted date string
 * in the "MMM DD, YYYY" format.
 *
 * @param {string} dateString - The date string to be formatted, expected in "DD/MM/YYYY" format.
 * @returns {string} The formatted date string in "MMM DD, YYYY" format.
 * @example
 * formatDate("15/07/2023"); // Returns "Jul 15, 2023"
 */
export function formatDate(dateString: string) {
  // Split the date string into day, month, and year
  const [day, month, year] = dateString.split("/");

  // Create a new Date object
  const date = new Date(`${year}-${month}-${day}`);

  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
}
