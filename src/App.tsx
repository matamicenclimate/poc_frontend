import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()
import './i18n/config'
import { useTranslation } from 'react-i18next'
function App() {
    const { t } = useTranslation()
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="App-header">
                    <h1 className="text-5xl font-bold underline">
                        Hello world!
                    </h1>
                    <h2>{t('title')}</h2>
                    <p>{t('description.part1')}</p>
                    <p>{t('description.part2')}</p>
                    <p>{t('description.part3')}</p>
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
