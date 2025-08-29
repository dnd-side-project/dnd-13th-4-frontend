export const calculateDaysSince = (dateString: string): number => {
  const joinDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - joinDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};