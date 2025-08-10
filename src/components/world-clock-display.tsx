"use client";

import { Separator } from "./ui/separator";
import Link from 'next/link';

const timeZoneColumns = [
    [
        { name: "New York", country: "United States" },
        { name: "Philadelphia, Pennsylvania", country: "United States" },
        { name: "Chicago, Illinois", country: "United States" },
        { name: "Houston, Texas", country: "United States" },
        { name: "San Antonio, Texas", country: "United States" },
        { name: "Dallas, Texas", country: "United States" },
        { name: "Denver, Colorado", country: "United States" },
        { name: "Los Angeles, California", country: "United States" },
        { name: "San Diego, California", country: "United States" },
        { name: "San Jose, California", country: "United States" },
        { name: "Phoenix, Arizona", country: "United States" },
        { name: "Anchorage, Alaska", country: "United States" },
        { name: "Honolulu, Hawaii", country: "United States" },
        { name: "Toronto, Canada", country: "Canada" },
        { name: "Montreal, Canada", country: "Canada" },
    ],
    [
        { name: "Winnipeg, Canada", country: "Canada" },
        { name: "Calgary, Canada", country: "Canada" },
        { name: "Vancouver, Canada", country: "Canada" },
        { name: "London, United Kingdom", country: "United Kingdom" },
        { name: "Dublin, Ireland", country: "Ireland" },
        { name: "Sydney, Australia", country: "Australia" },
        { name: "Melbourne, Australia", country: "Australia" },
        { name: "Brisbane, Australia", country: "Australia" },
        { name: "Perth, Australia", country: "Australia" },
        { name: "Adelaide, Australia", country: "Australia" },
        { name: "Wellington, New Zealand", country: "New Zealand" },
        { name: "Manila, Philippines", country: "Philippines" },
        { name: "Singapore, Singapore", country: "Singapore" },
        { name: "Tokyo, Japan", country: "Japan" },
        { name: "Seoul, Korea", country: "South Korea" },
        { name: "Taipei, Taiwan", country: "Taiwan" },
    ],
    [
        { name: "Beijing, China", country: "China" },
        { name: "Shanghai, China", country: "China" },
        { name: "Urumqi, China", country: "China" },
        { name: "Berlin, Germany", country: "Germany" },
        { name: "Paris, France", country: "France" },
        { name: "Copenhagen, Denmark", country: "Denmark" },
        { name: "Rome, Italy", country: "Italy" },
        { name: "Madrid, Spain", country: "Spain" },
        { name: "Ceuta, Africa, Spain", country: "Spain" },
        { name: "Canary Islands, Spain", country: "Spain" },
        { name: "Stockholm, Sweden", country: "Sweden" },
        { name: "Lisbon, Portugal", country: "Portugal" },
        { name: "Madeira, Portugal", country: "Portugal" },
        { name: "Azores, Portugal", country: "Portugal" },
        { name: "Helsinki, Finland", country: "Finland" },
        { name: "Athens, Greece", country: "Greece" },
    ],
    [
        { name: "Istanbul, Turkey", country: "Turkey" },
        { name: "Warsaw, Poland", country: "Poland" },
        { name: "Kiev, Ukraine", country: "Ukraine" },
        { name: "Moscow, Russia", country: "Russia" },
        { name: "Jerusalem, Israel", country: "Israel" },
        { name: "New Delhi, India", country: "India" },
        { name: "Kolkata, India", country: "India" },
        { name: "Noronha, Brazil", country: "Brazil" },
        { name: "São Paulo, Brazil", country: "Brazil" },
        { name: "Rio de Janeiro, Brazil", country: "Brazil" },
        { name: "Manaus, Brazil", country: "Brazil" },
        { name: "Rio Branco, Brazil", country: "Brazil" },
        { name: "Mexico City, Mexico", country: "Mexico" },
        { name: "Santiago, Chile", country: "Chile" },
        { name: "Buenos Aires, Argentina", country: "Argentina" },
        { name: "Dubai, United Arab Emirates", country: "United Arab Emirates" },
    ]
];

export const PopularTimezones = () => {
    return (
        <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Most Popular Time Zones and Cities</h2>
            <Separator />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 py-4">
                {timeZoneColumns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col space-y-2">
                        {column.map((city) => (
                            <Link key={city.name} href="#" className="text-sm text-accent hover:underline">
                                {city.name}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}