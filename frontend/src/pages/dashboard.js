import AppLayout from '@/components/Layouts/AppLayout'
import MovieList from '@/components/MovieList'
import FullWidthTextField from '@/components/Search'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Dashboard = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('api/getNowPlayingMovies')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setMovies(data.results)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovies()
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Dashboard - CinemaLoveReview</title>
            </Head>
            <FullWidthTextField />

            <MovieList title="上映中の映画" movies={movies} />
        </AppLayout>
    )
}

export default Dashboard
