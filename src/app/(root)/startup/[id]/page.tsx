import { formatDate } from "@/src/app/lib/utils";
import { client } from "@/src/sanity/lib/client";
import { playlist_query, startup_id } from "@/src/sanity/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Image from "next/image";
import markdownit from 'markdown-it'
import StartupCard, { StartupCardType } from "@/src/app/components/StartupCard";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/src/app/components/View";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    const param = { id }
    const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(startup_id, { id }),
    client.fetch(playlist_query, {
      slug: "editor-picks-new",
    }),
  ]);
    console.log(JSON.stringify({ post: post }));
    const md = markdownit()
    const parsedContent = md.render(post?.pitch || '')
    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post?._createdAt)}</p>

                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>

            <section className="section_container">
                <img
                    src={post.image}
                    alt="thumbnail"
                    className="w-full h-auto rounded-xl"
                />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link
                            href={`/user/${post.author?._id}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            <Image
                                src={post.author.image}
                                alt="avatar"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />

                            <div>
                                <p className="text-20-medium">{post.author.name}</p>
                                <p className="text-16-medium !text-black-300">
                                    @{post.author.name}
                                </p>
                            </div>
                        </Link>

                        <p className="category-tag text-white">{post.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                <hr className="divider" />

                {editorPosts?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>

                        <ul className="mt-7 card_grid-sm">
                            {editorPosts.map((post: StartupCardType, i: number) => (
                                <StartupCard key={i} post={post} />
                            ))}
                        </ul>
                    </div>
                )}

                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    )
}
export default Page