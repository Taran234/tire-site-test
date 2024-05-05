
import * as React from "react";
import { client } from "../../../sanity/lib/client";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";
import { getData, Products } from "./homePage";
import { StarRating } from "./star-rating";


export async function Tires({ data }: { data: Products[] }) {

    return (
        <div>
            <header className="flex flex-row justify-between">
                <div className="items-start self-start pt-8 pr-4 pb-4 pl-4 md:pl-16  md:text-3xl text-2xl font-semibold text-red-800 ">
                    New Tires | Top Picks
                </div>
                <Link className="flex justify-center" href={'/product/Tire'}>
                    <div className="items-start self-end pt-4 pr-4 pb-4  md:pr-16 md:text-3xl text-2xl font-semibold underline text-red-800 ">
                        Show All
                    </div>
                </Link>
            </header>
            <div className="flex overflow-y-hidden pb-3 md:ml-10 mx-3">
                {data.map((product: Products, index: number) => (
                    <div key={index}>
                        <div className="flex-none px-5">
                            <div className="w-[230px] scroll scroll-smooth overfllow-x-scroll rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <div className="flex flex-col justify-between py-3 pr-2 pl-2 rounded-lg bg-white md:h-[500px] h-[460px] border-2 border-solid border-zinc-200 ">
                                    <div className="flex justify-center items-center ">
                                        <img
                                            loading="lazy"
                                            srcSet={urlForImage(product.productImage)}
                                            className="aspect-[0.9] w-[130px]"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center justify-between pb-3 mt-3 text-md font-semibold leading-6 text-sky-900 bg-white">
                                        <div className="font-semibold tracking-wide text-center">{product.manufacturer}</div>
                                        <div className="mt-4 text-lg tracking-wide text-center truncate max-w-full">
                                            {product.name} -<br />
                                            {product.spec}
                                        </div>
                                        <div className="flex gap-2 self-stretch mt-1.5 text-neutral-600">
                                            <div className="justify-center px-3.5 py-2 bg-white rounded-md border border-gray-100 border-solid">
                                                {product.category}
                                            </div>
                                            {product.category !== 'Rims' && product.tireType && (
                                                <div className="justify-center px-3.5 py-2 bg-white rounded-md border border-gray-100 border-solid">
                                                    {product.tireType}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2 self-stretch mt-1.5 text-neutral-600">
                                            {product.rating && (
                                                <div className="justify-center px-3.5 py-2">
                                                    <StarRating rating={product.rating} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="justify-center items-center self-stretch px-16 py-5  text-2xl tracking-wide text-center text-white capitalize whitespace-nowrap bg-red-600 rounded-none max-md:px-5">
                                        <Link className="flex justify-center" href={product.link || ''}>
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function Rims({ data }: { data: Products[] }) {
    return (
        <div>
            <header className="flex flex-row justify-between">
                <div className="items-start self-start pt-4 pr-4 pb-4 pl-4 md:pl-16  md:text-3xl text-2xl font-semibold  text-red-800 ">
                    New Rims | Top Picks
                </div>
                <Link className="flex justify-center" href={'/product/Tire'}>
                    <div className="items-start self-end pt-4 pr-4 pb-4 md:pr-16 md:text-3xl text-2xl  font-semibold underline text-red-800 ">
                        Show All
                    </div>
                </Link>
            </header>
            <div className="flex overflow-y-hidden pb-3 md:ml-10 mx-3">
                {data.map((product: Products, index: number) => (
                    <div key={index}>
                        <div className="flex-none px-5">
                            <div className="w-[230px] scroll scroll-smooth overfllow-x-scroll rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <div className="flex flex-col justify-between py-3 pr-2 pl-2 rounded-lg bg-white md:h-[500px] h-[460px] border-2 border-solid border-zinc-200 ">
                                    <div className="flex justify-center items-center ">
                                        <img
                                            loading="lazy"
                                            srcSet={urlForImage(product.productImage)}
                                            className="aspect-[0.9] w-[130px]"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center justify-between pb-3 mt-3 text-md font-semibold leading-6 text-sky-900 bg-white">
                                        <Link className="hover:underline" href={product.link || ''}>
                                            <div className="font-semibold tracking-wide text-center">{product.manufacturer}</div>
                                            <div className="mt-4 text-lg tracking-wide text-center">
                                                {product.name} -<br />
                                                {product.spec}
                                            </div>
                                        </Link>
                                        <div className="flex gap-2 self-stretch mt-1.5 text-neutral-600">
                                            <div className="justify-center px-3.5 py-2 bg-white rounded-md border border-gray-100 border-solid">
                                                {product.category}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 self-stretch mt-1.5 text-neutral-600">
                                            <div className="justify-center px-3.5 py-2 whitespace-nowrap ">
                                                <StarRating rating={product.rating} />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 self-stretch mt-1.5 text-neutral-600">
                                            {product.category == 'Rims' && product.rimType && (
                                                <div className="justify-center px-3.5 py-2 whitespace-nowrap bg-white rounded-md border border-gray-100 border-solid">
                                                    {product.rimType}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="justify-center items-center self-stretch px-16 py-5  text-2xl tracking-wide text-center text-white capitalize whitespace-nowrap bg-red-600 rounded-none max-md:px-5">
                                        <Link className="flex justify-center" href={product.link || ''}>
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function Accessories({ data }: { data: Products[] }) {

    return (
        <div>
            <header className="flex flex-row justify-between">
                <div className="items-start self-start pt-4 pr-4 pb-4 pl-4 md:pl-16 md:text-3xl text-2xl font-semibold  text-red-800 ">
                    New Accessories | Top Picks
                </div>
                <Link className="flex justify-center" href={'/product/Tire'}>
                    <div className="items-start self-end pt-4 pr-4 pb-4 md:pr-16 md:text-3xl text-2xl  font-semibold underline text-red-800 ">
                        Show All
                    </div>
                </Link>
            </header>
            <div className="flex overflow-y-hidden pb-3 md:ml-10 mx-3">
                {data.map((product: Products, index: number) => (
                    <div key={index}>
                        <div className="flex-none px-5">
                            <div className="w-[230px] scroll scroll-smooth overfllow-x-scroll rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <div className="flex flex-col justify-between py-3 pr-2 pl-2 rounded-lg bg-white md:h-[500px] h-[460px] border-2 border-solid border-zinc-200 whitespace-normal">
                                    <div className="flex justify-center items-center ">
                                        <img
                                            loading="lazy"
                                            srcSet={urlForImage(product.productImage)}
                                            className="aspect-[0.9] w-[130px]"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center justify-between pb-3 mt-3 text-md font-semibold leading-6 text-sky-900 bg-white">
                                        <div className="font-semibold tracking-wide text-center">{product.manufacturer}</div>
                                        <div className="mt-4 text-lg tracking-wide text-center">
                                            {product.name} -<br />
                                            {product.spec}
                                        </div>
                                        <div className="flex gap-2 self-stretch mt-1.5 text-neutral-600">
                                            <div className="justify-center px-3.5 py-2 bg-white rounded-md border border-gray-100 border-solid">
                                                {product.category}
                                            </div>

                                        </div>
                                        <div className="flex gap-2 self-stretch mt-1.5 text-neutral-600">

                                            <div className="justify-center px-3.5 py-2 whitespace-nowrap ">
                                                <StarRating rating={product.rating} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="justify-center items-center self-stretch px-16 py-5  text-2xl tracking-wide text-center text-white capitalize whitespace-nowrap bg-red-600 rounded-none max-md:px-5">
                                        <Link className="flex justify-center" href={product.link || ''}>
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

