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
