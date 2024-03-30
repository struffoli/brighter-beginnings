const SearchBar = ({posts, getSearchResults}) => {
    const handleSubmit = (e) => e.preventDefault();
    const handleSearchChnage = (e) => {
        if (!e.target.value) return setSearchResults(posts);

        const resultsArray = posts.filter(post => post.title.includes(e.target.value) || post.body.includes(e.target.value))
        setSearchResults(restulsArray);
    }

    return (
        <header>
            <form className = "search" onSubmit = {handleSubmit}>
                <input className = "searchInput" type = "text" id = "search" onChange={handleSearchChnage}/>
                <button className = "searchButton"/>
            </form>
        </header>
    )
}

export default SearchBar;

