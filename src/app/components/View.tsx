import React from "react";
import Ping from "./Ping";
import { client } from "@/src/sanity/lib/client";
import { startup_views } from "@/src/sanity/lib/queries";
import { writeClient } from "@/src/sanity/lib/write-client";
const View = async ({ id }: { id: string }) => {

    const result = await client.withConfig({ useCdn: false }).fetch(startup_views, { id }) ?? {};
    const { views: totalviews = 0 } = result;
    await writeClient.patch(id).set({views:totalviews + 1}).commit()
    return (
        <>
            <div className="view-container ">
                <div className="absolute -top-2 -right-2 ">
                    <Ping />
                </div>
                <p className="view-text">
                    <span className="font-black text-2xl text-white">Views:{totalviews}</span>
                </p>
            </div>
        </>
    )
}

export default View