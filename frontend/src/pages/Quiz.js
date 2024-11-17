import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../styles/Quiz.css'; // Import your styles

function Quiz() {
  const [score, setScore] = useState({
    Python: 0,
    React: 0,
    AWS: 0
  });
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Define questions and correct answers for Python, React, and AWS Services
  const questions = [
    // Python Questions
    { id: 1, category: "Python", question: "What is Python primarily used for?", options: ["Web Development", "Data Science", "Gaming", "Mobile Apps"], answer: "Data Science" },
    { id: 2, category: "Python", question: "Which command is used to install packages in Python?", options: ["npm", "pip", "apt-get", "brew"], answer: "pip" },
    { id: 3, category: "Python", question: "Which of these is not a valid Python data type?", options: ["list", "tuple", "array", "dictionary"], answer: "array" },
    { id: 4, category: "Python", question: "What is the output of `print(2 + 3 * 2)`?", options: ["10", "8", "7", "12"], answer: "8" },
    { id: 5, category: "Python", question: "Which Python module is used for regular expressions?", options: ["os", "re", "sys", "math"], answer: "re" },

    // React Questions
    { id: 6, category: "React", question: "What is the function of React's `useState` hook?", options: ["Handles side effects", "Manages component state", "Fetches data", "Renders JSX"], answer: "Manages component state" },
    { id: 7, category: "React", question: "Which method is used to render a component in React?", options: ["render()", "ReactDOM.render()", "useRender()", "componentRender()"], answer: "ReactDOM.render()" },
    { id: 8, category: "React", question: "What is JSX?", options: ["JavaScript and HTML mixed", "JavaScript XML", "A new JavaScript library", "None of the above"], answer: "JavaScript and HTML mixed" },
    { id: 9, category: "React", question: "What does `props` stand for in React?", options: ["Properties", "Propagation", "Processed", "Protocols"], answer: "Properties" },
    { id: 10, category: "React", question: "What is the purpose of the `key` prop in React?", options: ["To uniquely identify elements in the DOM", "To bind state", "To make components reusable", "To pass data"], answer: "To uniquely identify elements in the DOM" },

    // AWS Services Questions
    { id: 11, category: "AWS", question: "Which AWS service is used for serverless compute?", options: ["EC2", "Lambda", "S3", "RDS"], answer: "Lambda" },
    { id: 12, category: "AWS", question: "Which AWS service is used for object storage?", options: ["EC2", "S3", "RDS", "DynamoDB"], answer: "S3" },
    { id: 13, category: "AWS", question: "What is the primary purpose of AWS CloudFormation?", options: ["Orchestrate machine learning", "Define infrastructure as code", "Data backup", "Compute resources"], answer: "Define infrastructure as code" },
    { id: 14, category: "AWS", question: "Which AWS service is used for message queuing?", options: ["S3", "SNS", "SQS", "Lambda"], answer: "SQS" },
    { id: 15, category: "AWS", question: "Which AWS service is best for deploying a web application?", options: ["EC2", "S3", "Elastic Beanstalk", "RDS"], answer: "Elastic Beanstalk" },
  ];

  // Handle answer selection
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  // Check answers on submission and navigate to the results page
  const handleSubmit = () => {
    const newScore = { Python: 0, React: 0, AWS: 0 };

    // Iterate through the questions and calculate scores for each category
    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        newScore[question.category] += 1;
      }
    });

    setScore(newScore);
    setSubmitted(true);

    // Navigate to results page and pass the scores as state
    navigate('/results', { state: { categoryScores: newScore } });
  };

  return (
    <div>
      <h2>Quiz: Python, React, and AWS Services</h2>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.question}</p>
          {question.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => handleAnswerChange(question.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>

      {submitted && (
        <div>
          <h3>Results</h3>
          <p>Python Score: {score.Python} / 5</p>
          <p>React Score: {score.React} / 5</p>
          <p>AWS Score: {score.AWS} / 5</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
