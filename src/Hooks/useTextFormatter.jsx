function useTextFormatter(text) {
  if (!text || typeof text !== "string") {
    return <></>;
  }

  // Regular expression to match URLs
  const urlRegex = /(\bhttps?:\/\/[^\s]+)/g;

  // Regular expression to match dates (example formats: YYYY-MM-DD, DD/MM/YYYY, etc.)
  const dateRegex = /\b(\d{4}[-/]\d{2}[-/]\d{2}|\d{2}[-/]\d{2}[-/]\d{4})\b/g;

  // Function to format date for Google Calendar URL
  const formatDateForGoogleCalendar = (date) => {
    const [year, month, day] = date.split(/[-/]/);

    // Adjust the format for Google Calendar
    return `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}T000000Z`;
  };

  // Function to replace URLs and Dates with React components
  const parseText = (text) => {
    const parts = text.split(
      /(\bhttps?:\/\/[^\s]+|\b\d{4}[-/]\d{2}[-/]\d{2}|\b\d{2}[-/]\d{2}[-/]\d{4})/g
    );

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-burbleC underline"
          >
            {part}
          </a>
        );
      } else if (dateRegex.test(part)) {
        const formattedDate = part.replace(/-/g, "/");
        const startDate = formatDateForGoogleCalendar(formattedDate);
        // Construct the Google Calendar URL
        const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=Event&dates=${startDate}/${startDate}&details=Details&location=Location`;

        return (
          <a
            key={index}
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return <>{parseText(text)}</>;
}

export default useTextFormatter;
