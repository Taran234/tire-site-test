import * as React from "react";
import { client } from "../../../../sanity/lib/client";

import { SearchResult } from "@/app/_components/product-list";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { Products } from "@/app/_components/homePage";

// interface ResultProps {
//     search: string;
//     season: string;
//     width: string;
//     profile: string;
//     wheelSize: string;
// }

async function getFilteredData({ season, width, profile, wheelSize }: { season: string, width: string, profile: string, wheelSize: string }): Promise<Products[]> {
    let categoryCondition = 'true';
    if (season) {
        categoryCondition = `tireType == '${season}'`;
    } else {
        categoryCondition = `true`;
    }
    // searchCondition = `name match '*${search2}*' || name match '*${search1}*' || spec match '*${search1}*' || spec match '*${search2}*'`;
    let searchCondition = `name match ["*${width}","${profile}"]`;


    const query = `*[(${categoryCondition}) && (${searchCondition})] {
        name,
        spec,
        link,
        rating,
        category,
        rimType,
        tireType,
        productImage,
    }`;
    const data = await client.fetch<Products[]>(query, {}, { cache: 'reload' });
    return data;
}

async function getParaData(parameter: string): Promise<Products[]> {


    const query = `*[(_type == 'products') && category == '${parameter}'] {
        name,
        spec,
        link,
        rating,
        category,
        rimType,
        tireType,
        productImage,
    }`;
    const data = await client.fetch<Products[]>(query, {}, { cache: 'reload' });
    return data;
}


export default async function ProductPage({
    params
}: {
    params: { parameter: string }
}) {
    const parameter = decodeURIComponent(params.parameter);
    console.log(parameter);
    let data = null;
    if (parameter === 'Accessories' || parameter === 'Tire' || parameter === 'Rims') {
        data = await getParaData(parameter);
    } else {
        // Extracting values from the parameter
        const widthMatch = parameter.match(/width=(.*?)\*/);
        const profileMatch = parameter.match(/\+profile=(.*?)\*/);
        const wheelSizeMatch = parameter.match(/\+wheelSize=(.*?)\*/);
        const seasonMatch = parameter.match(/\+season=(.*?)\*/);

        const width = widthMatch ? widthMatch[1] : '';
        const profile = profileMatch ? profileMatch[1] : '';
        const wheelSize = wheelSizeMatch ? wheelSizeMatch[1] : '';
        const season = seasonMatch ? seasonMatch[1] : '';

        // Getting data based on extracted values
        console.log(season, width, profile, wheelSize);
        if (width) {
            data = await getFilteredData({ season, width, profile, wheelSize });
        } else {
            data = await getParaData('Tire'); // Default to Tire if no season or search parameters
        }
    }
    console.log(data);
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            <SearchResult data={data} />
            <Footer />
        </div>
    );
}

