import { useState } from 'react';
import './App.css';
import { init, AuthType, SearchEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';
import { HostEvent } from '../node_modules/@thoughtspot/visual-embed-sdk/lib/src/types';

function App() {
  const [searchString, setSearchString] = useState('');
  const embedRef = useEmbedRef<typeof SearchEmbed>();
  // Initialize ThoughtSpot Embed SDK
  init({
    thoughtSpotHost: 'https://se-thoughtspot-cloud.thoughtspot.cloud/',
    authType: AuthType.None,
  });
  const onSearch = (query: string) => {
    //setSearchString(query)
    embedRef.current.trigger(HostEvent.Search, {
      searchQuery: query,
      execute: true
    })
  }
  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      {/* Search Input */}
      <SearchInput onSearch={onSearch} />

      {/* Search Embed */}
      <div className="w-full max-w-4xl h-96 mt-4">
        <SearchEmbed
         ref={embedRef}
         frameParams={{width:'100%',height:'800px'}}
          dataSource='b0f01374-9e26-46e0-b28c-1c496b19abb2'
          searchOptions={{
            searchTokenString: searchString, // Update only when Go button is clicked
            executeSearch: true,
          }}
        />
      </div>
    </div>
  );
}
function SearchInput({ onSearch } : any) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      {/* Text Input */}
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Enter your search query"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update local state
      />

      {/* Go Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => onSearch(inputValue)} // Pass value to parent component
      >
        Go
      </button>
    </div>
  );
}
export default App;
