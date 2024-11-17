import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import useLocation and Link
import '../styles/Results.css'; // Import the Results CSS

function Results() {
    const navigate = useNavigate();
  const location = useLocation(); // Get location to access the passed state
  const { categoryScores } = location.state || {}; // Destructure categoryScores from state

  const handleTakeQuizAgain = () => {
    navigate('/quiz');  // Navigate back to the quiz page
  };

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <div className="results-header">
        <p>Your Score Breakdown:</p>
      </div>
      <p>Python: {categoryScores.Python} / 5</p>
      <p>React: {categoryScores.React} / 5</p>
      <p>AWS: {categoryScores.AWS} / 5</p>

      <div className="results-footer">
        <button onClick={handleTakeQuizAgain}>Take Quiz Again</button>
        <p>
          Want to learn more? <Link to="/learn-more">Click here</Link> for more tutorials.
        </p>
      </div>
    </div>
  );
}

export default Results;
