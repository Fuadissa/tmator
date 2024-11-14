// utils/helpers.ts
export const timeAgo = (date: string) => {
  const now = new Date();
  const createdAt = new Date(date);
  const secondsAgo = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hours ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo} days ago`;
};

export const calculateReadingTime = (content: string) => {
  const words = content.split(" ").length;
  const wordsPerMinute = 200; // Average reading speed
  const readingTime = Math.ceil(words / wordsPerMinute);
  return `${readingTime} min read`;
};

// utils/helpers.ts
export const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export const formatDate = () => {
  const date = new Date();
  const day = date.toLocaleString("en-US", { weekday: "long" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const dayOfMonth = date.getDate();
  const suffix = getDaySuffix(dayOfMonth);

  return `${day}, ${month} ${dayOfMonth}${suffix}`;
};

// Helper function to add suffix to day
const getDaySuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
