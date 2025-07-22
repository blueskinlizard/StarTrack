import { useState, useEffect } from "react";
import StarInformationCard from "./StarInformationCard";
import StarInformationTable from "./StarInformationTable";
export default function StarSearchbar(){
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() =>{
        const handleSearch = async() =>{
            setLoading(true);
            try{
                const fetchedSearchDataStarJson = await fetch('http://localhost:8080/api/findStar', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ searchedStar: searchTerm })
                });
                if(fetchedSearchDataStarJson.ok){
                    const fetchedSearchDataStar = await fetchedSearchDataStarJson.json();
                    setSearchResults(fetchedSearchDataStar)
                    setLoading(false)
                }
            }catch(error){
                console.error("Error searching for star", error);
            }
        }
        if(searchTerm){
            handleSearch()
        }
    }, [searchTerm])
    const handleForm = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.userSearchInput.value);
    }
    if(loading){
        return(
            <>
                <h2>Loading...</h2>
            </>
        )
    }
    return(
        
        <div className="starSearchBar">
            <form id="searchForm" onSubmit={handleForm}>
                <input id="userSearchInput" name="userSearchInput" type="text" placeholder="PLATE-MJD-FIBERID"></input>
            </form>

            {searchResults && (
                <>
                    <StarInformationCard starType={searchResults.result.SPECTRAL_GROUP} modelPrediction={searchResults.result.predicted_label}
                    modelConfidence={searchResults.result.predicted_confidence} modelType={searchResults.result.model}/>
                    <StarInformationTable tableInformation={searchResults.result}/>
                </>
            )}
        </div>
        
    )
}