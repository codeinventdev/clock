
export const cityTimezones = [
    { name: "New York", country: "United States", timezone: "America/New_York" },
    { name: "Philadelphia, Pennsylvania", country: "United States", timezone: "America/New_York" },
    { name: "Chicago, Illinois", country: "United States", timezone: "America/Chicago" },
    { name: "Houston, Texas", country: "United States", timezone: "America/Chicago" },
    { name: "San Antonio, Texas", country: "United States", timezone: "America/Chicago" },
    { name: "Dallas, Texas", country: "United States", timezone: "America/Chicago" },
    { name: "Denver, Colorado", country: "United States", timezone: "America/Denver" },
    { name: "Los Angeles, California", country: "United States", timezone: "America/Los_Angeles" },
    { name: "San Diego, California", country: "United States", timezone: "America/Los_Angeles" },
    { name: "San Jose, California", country: "United States", timezone: "America/Los_Angeles" },
    { name: "Phoenix, Arizona", country: "United States", timezone: "America/Phoenix" },
    { name: "Anchorage, Alaska", country: "United States", timezone: "America/Anchorage" },
    { name: "Honolulu, Hawaii", country: "United States", timezone: "Pacific/Honolulu" },
    { name: "Toronto, Canada", country: "Canada", timezone: "America/Toronto" },
    { name: "Montreal, Canada", country: "Canada", timezone: "America/Toronto" },
    { name: "Winnipeg, Canada", country: "Canada", timezone: "America/Winnipeg" },
    { name: "Calgary, Canada", country: "Canada", timezone: "America/Edmonton" },
    { name: "Vancouver, Canada", country: "Canada", timezone: "America/Vancouver" },
    { name: "London, United Kingdom", country: "United Kingdom", timezone: "Europe/London" },
    { name: "Dublin, Ireland", country: "Ireland", timezone: "Europe/Dublin" },
    { name: "Sydney, Australia", country: "Australia", timezone: "Australia/Sydney" },
    { name: "Melbourne, Australia", country: "Australia", timezone: "Australia/Melbourne" },
    { name: "Brisbane, Australia", country: "Australia", timezone: "Australia/Brisbane" },
    { name: "Perth, Australia", country: "Australia", timezone: "Australia/Perth" },
    { name: "Adelaide, Australia", country: "Australia", timezone: "Australia/Adelaide" },
    { name: "Wellington, New Zealand", country: "New Zealand", timezone: "Pacific/Auckland" },
    { name: "Manila, Philippines", country: "Philippines", timezone: "Asia/Manila" },
    { name: "Singapore, Singapore", country: "Singapore", timezone: "Asia/Singapore" },
    { name: "Tokyo, Japan", country: "Japan", timezone: "Asia/Tokyo" },
    { name: "Seoul, Korea", country: "South Korea", timezone: "Asia/Seoul" },
    { name: "Taipei, Taiwan", country: "Taiwan", timezone: "Asia/Taipei" },
    { name: "Beijing, China", country: "China", timezone: "Asia/Shanghai" },
    { name: "Shanghai, China", country: "China", timezone: "Asia/Shanghai" },
    { name: "Urumqi, China", country: "China", timezone: "Asia/Urumqi" },
    { name: "Berlin, Germany", country: "Germany", timezone: "Europe/Berlin" },
    { name: "Paris, France", country: "France", timezone: "Europe/Paris" },
    { name: "Copenhagen, Denmark", country: "Denmark", timezone: "Europe/Copenhagen" },
    { name: "Rome, Italy", country: "Italy", timezone: "Europe/Rome" },
    { name: "Madrid, Spain", country: "Spain", timezone: "Europe/Madrid" },
    { name: "Ceuta, Africa, Spain", country: "Spain", timezone: "Africa/Ceuta" },
    { name: "Canary Islands, Spain", country: "Spain", timezone: "Atlantic/Canary" },
    { name: "Stockholm, Sweden", country: "Sweden", timezone: "Europe/Stockholm" },
    { name: "Lisbon, Portugal", country: "Portugal", timezone: "Europe/Lisbon" },
    { name: "Madeira, Portugal", country: "Portugal", timezone: "Atlantic/Madeira" },
    { name: "Azores, Portugal", country: "Portugal", timezone: "Atlantic/Azores" },
    { name: "Helsinki, Finland", country: "Finland", timezone: "Europe/Helsinki" },
    { name: "Athens, Greece", country: "Greece", timezone: "Europe/Athens" },
    { name: "Istanbul, Turkey", country: "Turkey", timezone: "Europe/Istanbul" },
    { name: "Warsaw, Poland", country: "Poland", timezone: "Europe/Warsaw" },
    { name: "Kiev, Ukraine", country: "Ukraine", timezone: "Europe/Kiev" },
    { name: "Moscow, Russia", country: "Russia", timezone: "Europe/Moscow" },
    { name: "Jerusalem, Israel", country: "Israel", timezone: "Asia/Jerusalem" },
    { name: "New Delhi, India", country: "India", timezone: "Asia/Kolkata" },
    { name: "Kolkata, India", country: "India", timezone: "Asia/Kolkata" },
    { name: "Noronha, Brazil", country: "Brazil", timezone: "America/Noronha" },
    { name: "São Paulo, Brazil", country: "Brazil", timezone: "America/Sao_Paulo" },
    { name: "Rio de Janeiro, Brazil", country: "Brazil", timezone: "America/Sao_Paulo" },
    { name: "Manaus, Brazil", country: "Brazil", timezone: "America/Manaus" },
    { name: "Rio Branco, Brazil", country: "Brazil", timezone: "America/Rio_Branco" },
    { name: "Mexico City, Mexico", country: "Mexico", timezone: "America/Mexico_City" },
    { name: "Santiago, Chile", country: "Chile", timezone: "America/Santiago" },
    { name: "Buenos Aires, Argentina", country: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
    { name: "Dubai, United Arab Emirates", country: "United Arab Emirates", timezone: "Asia/Dubai" },
];

// Normalize diacritics and punctuation for stable slugs
export const slugify = (text: string) => {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export const unslugify = (slug: string) => {
    return slug
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
}

// Build a lookup map from slug -> city object for robust routing
export const slugToCity = (() => {
  const map = new Map<string, { name: string; country: string; timezone: string }>();
  for (const city of cityTimezones) {
    map.set(slugify(city.name), city);
  }
  return map;
})();
