
const Search = ({searchItem, setSearchItem}) => {
    return (
       
        <div className="search">
            <div>
                
                <img src="./search.svg" alt="Search Icon" />
                <input 
                type="text"
                placeholder="Search for movies or TV shows..." 
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                />
            </div>
        </div>
      
    );
}

export default Search;