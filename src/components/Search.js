import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debounceTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    }
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: "query",
          list: "search",
          origin: '*',
          format: 'json',
          srsearch: debounceTerm
        }
      });

      setResults(data.query.search);
    };
    search();
  }, [debounceTerm]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          {result.snippet}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input 
            className="input"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  );
};

export default Search;