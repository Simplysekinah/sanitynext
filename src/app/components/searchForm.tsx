
import React from "react";
import form from 'next/form'
import SearchFormRest from "./SearchFormRest";
import { Search } from "lucide-react";

const SearchForm = async ({query}:{query?:string}) => {
    // const query = "Test"
    
    return (
        <>
            <form action="" className="search-form">
                <input type="text"
                    name="query"
                    defaultValue=""
                    className="search-input"
                    placeholder="Search Startups"
                  />
                  <div className="flex gap-2">
                    {query && <SearchFormRest/>}
                    <button type="submit" className="search-btn text-white">
                        <Search className="size-50"/>
                    </button>
                  </div>
            </form>
        </>
    )
}

export default SearchForm