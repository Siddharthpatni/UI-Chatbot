import React, { useState } from 'react';
import { Button, Form, Card, Spinner, Alert } from 'react-bootstrap';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';

const WebSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/web-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" onClick={() => window.history.back()} className="mb-3">
        <FaArrowLeft className="me-2" /> Back
      </Button>
      
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3><FaSearch className="me-2" />Web Search</h3>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your search query..."
              />
              <Button variant="primary" onClick={handleSearch} disabled={!query || isLoading}>
                {isLoading ? <Spinner size="sm" /> : <FaSearch />}
              </Button>
            </div>
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="search-results mt-4">
            {results.map((result, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title><a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a></Card.Title>
                  <Card.Text>{result.snippet}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WebSearch;