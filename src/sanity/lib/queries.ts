import { defineQuery } from "next-sanity";

export const startup_query = defineQuery(
    `
        *[_type == 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author-> name match $search]
        | order(_createdAt desc)
        {
            _id,
            title,
            slug,
            _createdAt,
            author->{
                _id,name,image,bio
            },
            views,
            description,
            category,
            image
        }
    `
)

export const startup_id = defineQuery(
    `
        *[_type == 'startup' && _id == $id][0]
        {
            _id,
            title,
            slug,
            _createdAt,
            author->{
                _id,name,image,bio
            },
            views,
            description,
            category,
            image
        }
    `
)

export const startup_views = defineQuery(
    `
        *[_type == 'startup' && _id == $id][0]
        {
            _id,
            views
        }
    `
)

export const author_id =defineQuery(
    `
        *[_type == 'author' && id == $id][0]{
            _id,
            id,
            email,
            username,
            name,
            image,
            bio
        }
    `
)

export const authors_id =defineQuery(
    `
        *[_type == 'author' && _id == $id][0]{
            _id,
            id,
            email,
            username,
            name,
            image,
            bio
        }
    `
)

export const startup_author_query = defineQuery(
    `
        *[_type == 'startup' && author._ref == $id]
        | order(_createdAt desc)
        {
            _id,
            title,
            slug,
            _createdAt,
            author->{
                _id,name,image,bio
            },
            views,
            description,
            category,
            image
        }
    `
)

export const playlist_query = defineQuery(
    `
        *[_type == 'playlist' && slug.current == $slug][0]
        | order(_createdAt desc)
        {
            _id,
            title,
            slug,
            select[]=>{
            _id,
            _createdAt,
            title,
            slug,
            author->{
                _id,name,image,bio,slug
            },
            views,
            description,
            category,
            image,
            pitch
            }
        }
    `
)