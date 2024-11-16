import React, { useState } from "react";
import { Container, Paper } from "@mui/material";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container maxWidth="xs">
            <Paper elevation={10}>
                Login
            </Paper>
        </Container>
    )
}

export default LoginPage;

