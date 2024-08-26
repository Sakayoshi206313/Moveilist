//ここで検索後のページを作成する
//このページは検索クエリごとに表示を変えなくてはいけないのでそのように実装する
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Box,
    CardActionArea,
    CircularProgress,
    Grid,
    Typography,
} from '@mui/material'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Search from '@/components/Search'

export default function SearchResults() {
    const router = useRouter()
    const { query } = router.query
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = query => {
        setSearchQuery(query)
    }

    const handlClick = id => {
        router.push(`/detail/movie/${id}`)
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `/api/getSearchResults?query=${query}`,
                )
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setMovies(data.results)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching movies:', error)
                setLoading(false)
            }
        }

        if (query) {
            fetchMovies()
        }
    }, [query])

    if (loading) {
        return <CircularProgress />
    }

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

            <Search onSearch={handleSearch} />
            <Box py={3} px={5}>
                <Box maxWidth="lg" mx="auto">
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                        検索結果: {query}
                    </Typography>
                    <Grid container spacing={3}>
                        {movies.map(movie => (
                            <Grid item xs={12} sm={6} md={4} key={movie.id}>
                                <CardActionArea
                                    onClick={() => handlClick(movie.id)}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                        }}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{
                                                width: 'auto',
                                                height: '500px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{ mt: 2 }}>
                                            {movie.title}
                                        </Typography>
                                    </Box>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </AppLayout>
    )
}
