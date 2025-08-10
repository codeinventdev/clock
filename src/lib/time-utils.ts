const numbers: { [key: number]: string } = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "quarter",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  21: "twenty one",
  22: "twenty two",
  23: "twenty three",
  24: "twenty four",
  25: "twenty five",
  26: "twenty six",
  27: "twenty seven",
  28: "twenty eight",
  29: "twenty nine",
  30: "half",
};

export const timeToWords = (date: Date): string => {
  let hour = date.getHours() % 12;
  const minutes = date.getMinutes();
  
  if (hour === 0) hour = 12;

  if (minutes === 0) {
    return `${numbers[hour]} o'clock`;
  }
  
  if (minutes > 30) {
    const minutesToGo = 60 - minutes;
    const nextHour = hour === 12 ? 1 : hour + 1;
    if (minutesToGo === 15) {
      return `quarter to ${numbers[nextHour]}`;
    }
    return `${numbers[minutesToGo]} to ${numbers[nextHour]}`;
  }
  
  if (minutes === 15) {
    return `quarter past ${numbers[hour]}`;
  }
  
  if (minutes === 30) {
    return `half past ${numbers[hour]}`;
  }
  
  return `${numbers[minutes]} past ${numbers[hour]}`;
};

export const getTimeOfDay = (date: Date): "morning" | "afternoon" | "evening" | "night" => {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) {
        return "morning";
    }
    if (hour >= 12 && hour < 18) {
        return "afternoon";
    }
    if (hour >= 18 && hour < 22) {
        return "evening";
    }
    return "night";
}
