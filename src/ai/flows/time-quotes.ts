// Deprecated: Gemini quote flow removed. Use local quotes in `QuoteDisplay`.
export type TimeQuoteInput = { timeOfDay: string };
export type TimeQuoteOutput = { quote: string };
export async function getTimeQuote(input: TimeQuoteInput): Promise<TimeQuoteOutput> {
  return { quote: `Time for a great ${input.timeOfDay}.` };
}
