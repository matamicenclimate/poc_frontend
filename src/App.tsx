import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="App-header">
                    <h1 className="text-5xl font-bold underline">
                        Hello world!
                    </h1>
                </header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<p>home</p>} />
                    <Route path="about" element={<p>About </p>} />
                </Routes>
            </div>
        </QueryClientProvider>
    )
}

export default App
