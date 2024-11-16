import './App.css';
import React from "react"; 
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
//import LoginPage from "./pages/LoginPage";
import { Container, Paper } from "@mui/material";

function App() {
  return (
    <Container maxWidth="xs">
      <Paper elevation={10}>
        Login
      </Paper>
    </Container>

  );
}

export default App;
