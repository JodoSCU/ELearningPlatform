import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Quiz.css'; // Go up one level and then into the styles folder
import { Card } from '@aws-amplify/ui-react';


function Quiz() {
  const [score, setScore] = useState({
    Python: 0,
    React: 0,
    AWS: 0
  });
  const [lowestCategory, setLowestCategory] = useState(null); // New state for lowest score category
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});

  // Define questions and correct answers for Python, React, and AWS Services
  const questions = [
    { id: 1, category: "Python", question: "What is Python primarily used for?", options: ["Web Development", "Data Science", "Gaming", "Mobile Apps"], answer: "Data Science" },
    { id: 2, category: "Python", question: "Which command is used to install packages in Python?", options: ["npm", "pip", "apt-get", "brew"], answer: "pip" },
    { id: 3, category: "Python", question: "Which of these is not a valid Python data type?", options: ["list", "tuple", "array", "dictionary"], answer: "array" },
    { id: 4, category: "Python", question: "What is the output of `print(2 + 3 * 2)`?", options: ["10", "8", "7", "12"], answer: "8" },
    { id: 5, category: "Python", question: "Which Python module is used for regular expressions?", options: ["os", "re", "sys", "math"], answer: "re" },
    { id: 6, category: "React", question: "What is the function of React's `useState` hook?", options: ["Handles side effects", "Manages component state", "Fetches data", "Renders JSX"], answer: "Manages component state" },
    { id: 7, category: "React", question: "Which method is used to render a component in React?", options: ["render()", "ReactDOM.render()", "useRender()", "componentRender()"], answer: "ReactDOM.render()" },
    { id: 8, category: "React", question: "What is JSX?", options: ["JavaScript and HTML mixed", "JavaScript XML", "A new JavaScript library", "None of the above"], answer: "JavaScript and HTML mixed" },
    { id: 9, category: "React", question: "What does `props` stand for in React?", options: ["Properties", "Propagation", "Processed", "Protocols"], answer: "Properties" },
    { id: 10, category: "React", question: "What is the purpose of the `key` prop in React?", options: ["To uniquely identify elements in the DOM", "To bind state", "To make components reusable", "To pass data"], answer: "To uniquely identify elements in the DOM" },
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

  // Check answers on submission
  const handleSubmit = async () => {
    const newScore = { Python: 0, React: 0, AWS: 0 };

    // Calculate scores for each category
    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        newScore[question.category] += 1;
      }
    });

    setScore(newScore);
    setSubmitted(true);

    // Determine the category with the lowest score
    const minScore = Math.min(newScore.Python, newScore.React, newScore.AWS);
    const categoryWithLowestScore = Object.keys(newScore).find(category => newScore[category] === minScore);

    setLowestCategory(categoryWithLowestScore);

    const apiEndpoint = "https://i44lou520m.execute-api.us-east-1.amazonaws.com/dev/SaveQuizScores";

  const requestData = {
    userId: "unique-user-id", // Replace with actual user ID logic
    pythonScore: newScore.Python,
    reactScore: newScore.React,
    awsScore: newScore.AWS,
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();
    console.log("Score saved successfully:", result);
  } catch (error) {
    console.error("Error saving score:", error);
  }
  };

  return (
    <>

      <div>
        <h2>Quiz: Python, React, and AWS Services</h2>
        <div style={{ padding: '0 7rem'}}>
          {questions.map((question) => (
            <Card variation="elevated" key={question.id} margin="2rem 0" borderRadius="12px">
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
            </Card>
          ))}
        </div>
        <div style={{ padding: '1 7rem', paddingBottom: '2em'}}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        

        {submitted && (
          <div>
            <h3>Results</h3>
            <p>Python Score: {score.Python} / 5</p>
            <p>React Score: {score.React} / 5</p>
            <p>AWS Score: {score.AWS} / 5</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Quiz;
