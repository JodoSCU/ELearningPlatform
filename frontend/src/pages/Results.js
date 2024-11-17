import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Results.css';

function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryScores } = location.state || {};

  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // Determine the category with the lowest score
  const lowestScore = Math.min(categoryScores.Python, categoryScores.React, categoryScores.AWS);
  const lowestCategory = Object.keys(categoryScores).find(
    category => categoryScores[category] === lowestScore
  );

  const handleTakeQuizAgain = () => {
    navigate('/quiz');
  };

  // Handle the click for generating personalized learning path
  const handleGenerateLearningPath = async () => {
    setLoading(true); // Start loading animation
    setErrorMessage(''); // Reset error message before API call

    try {
      const response = await fetch(
        'https://qfy2a8pvdh.execute-api.us-east-1.amazonaws.com/prod', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify({ lowestCategory: lowestCategory }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      console.log('Recommendations:', data.body);

      // Navigate to the learning path page with recommendations
      navigate('/learning-path', { state: { recommendations: data.body } });

    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setErrorMessage('Unable to generate recommendations. Please try again later.');
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <div className="results-header">
        <p>Your Score Breakdown:</p>
      </div>
      <p style={{ color: lowestCategory === "Python" ? "red" : "black" }}>Python: {categoryScores.Python} / 5</p>
      <p style={{ color: lowestCategory === "React" ? "red" : "black" }}>React: {categoryScores.React} / 5</p>
      <p style={{ color: lowestCategory === "AWS" ? "red" : "black" }}>AWS: {categoryScores.AWS} / 5</p>

      {lowestCategory && (
        <p style={{ marginTop: "1rem", fontWeight: "bold", color: "red" }}>
          You need to work on {lowestCategory}
        </p>
      )}

      <div className="results-footer">
        <button onClick={handleTakeQuizAgain}>Take Quiz Again</button>
      </div>
      <div className="results-footer">
        <button onClick={handleGenerateLearningPath} disabled={loading}>
          {loading ? "Loading..." : "Generate Personalized Learning Path"}
        </button>
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your recommendations...</p>
        </div>
      )}

      {/* Error message display */}
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
}

export default Results;
