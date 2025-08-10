
"use client";

import { Separator } from "./ui/separator";
import Link from 'next/link';
import { cityTimezones, slugify } from "@/lib/city-timezones";

const timeZoneColumns: { name: string; country: string; }[][] = [
    [],
    [],
    [],
    []
];

const itemsPerColumn = Math.ceil(cityTimezones.length / 4);
cityTimezones.forEach((city, index) => {
    const columnIndex = Math.floor(index / itemsPerColumn);
    if(timeZoneColumns[columnIndex]) {
        timeZoneColumns[columnIndex].push(city);
    }
});


export const PopularTimezones = () => {
    return (
        <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Most Popular Time Zones and Cities</h2>
            <Separator />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 py-4">
                {timeZoneColumns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col space-y-2">
                        {column.map((city) => (
                            <Link key={city.name} href={`/world-clock/${slugify(city.name)}`} className="text-sm text-accent hover:underline">
                                {city.name}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
