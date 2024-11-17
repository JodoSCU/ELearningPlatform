import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LearningPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations } = location.state || {};

  const handleBackToResults = () => {
    navigate(-1);  // Navigates back to the previous page
  };

  return (
    <div className="learning-path-container">
      <h2>Your Personalized Learning Path</h2>
      {recommendations ? (
        <div>
          <p>Here are some recommendations to improve your skills in this category:</p>
          <ul>
            {recommendations.split('\n').map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No recommendations available. Please try again.</p>
      )}
      <button onClick={handleBackToResults}>Back to Results</button>
    </div>
  );
}

export default LearningPath;
