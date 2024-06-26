"use client"
import * as React from "react";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";
import { Products } from "./homePage";
import { StarRating } from "./star-rating";
import { client } from "../../../sanity/lib/client";
import { useSearchParams } from "next/navigation";


export function SearchResult({ data }: { data: Products[] }) {
    const searchParams = useSearchParams()!;
    const width = searchParams.get("width");
    const profile = searchParams.get("profile");
    const wheelSize = searchParams.get("wheelSize");
    const season = searchParams.get("season");

    // Default to Tire if no season or search parameters

    // }
    const pattern = `${width}\/${profile}\/${wheelSize}`;
    const pattern2 = `${width}\/${profile}R${wheelSize}`;


    const matchesSearchConditions = (item: any) => {
        const regex1 = new RegExp(pattern, 'i');
        const regex2 = new RegExp(pattern2, 'i');
        const matchesNameOrSpec = regex1.test(item.name) || regex2.test(item.name) || regex1.test(item.spec) || regex2.test(item.spec);
        const matchesTireType = season ? item.tireType === season : true;  // Check tireType only if season is provided
        return matchesNameOrSpec && matchesTireType;
    };

    // Filter data based on the search conditions
    const isProvided = (value: string | null | null) => value !== null && value !== null && value !== '';
    const allParamsProvided = isProvided(width) && isProvided(profile) && isProvided(wheelSize);
    const filteredData = allParamsProvided ? data.filter(matchesSearchConditions) : data;
    console.log(filteredData[0]);
    return (
        <div>
            {filteredData.length > 0 ? (
                <section>
                    <div className="bg-gray-900 py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-white mb-6">Matching Products:</h2>
                            <div className="flex flex-wrap pl-auto justify-center gap-6">
                                {filteredData.map((item, index) => (
                                    <div key={index} className="bg-slate-100 min-w-[190px] max-w-[190px] rounded-lg shadow-lg p-4">
                                        <div className="flex relative overflow-hidden justify-center">
                                            <img className="object-contain w-[175px] h-[175px] sm:w-[130px] sm:h-[130px] rounded-lg transition duration-200 hover:scale-150" src={item.URL} alt="Product" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900 hover:text-red-600 mt-2 lg:line-clamp-3 line-clamp-2">{item.name || "Product Name"}</h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-gray-500 text-sm mt-1 truncate">{item.spec || ''}</p>
                                            <p className="text-gray-500 text-sm mt-1">{item.tireType || ''} </p>
                                        </div>
                                        {/* <p className="text-gray-500 text-sm mt-2"><StarRating rating={item.rating || '0'} /></p> */}
                                        <div className="flex items-center justify-center mt-2">
                                            <div className="flex flex-col items-center justify-between mt-2 space-y-2">
                                                {item.buttons && item.buttons.length > 0 ? (
                                                    item.buttons.map((button, btnIndex) => (
                                                        <Link key={btnIndex} href={button.btnlink || "/contact-us"} className="z-10  bg-gradient-to-r from-amber-500 text-center text-nowrap to-[#ff6a00] text-white font-mono uppercase text-xs px-4 py-2 rounded-2xl transition duration-200 hover:scale-110 mr-1 mb-1">
                                                            {button.btnText ? button.btnText : "Contact Us"}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <Link href="/contact-us" className=" bg-gradient-to-r from-amber-500  to-[#ff6a00] text-white font-mono uppercase text-xs px-4 py-2 rounded-2xl transition duration-200 hover:scale-110  mr-1 mb-1">
                                                        Contact Us
                                                    </Link>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="items-start self-stretch pt-4 pr-4 pb-4 pl-16 text-4xl font-black  min-h-screen text-red-600 leading-[65px]">
                    No matching Results found
                </div>
            )}
        </div>
    );
}