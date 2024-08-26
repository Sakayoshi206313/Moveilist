//このファイルがボタンを押した後に遷移するページのスタイル
//クライアントサイドレンダリングを行う際に使用する
// import { Box, CircularProgress, Grid, Typography } from '@mui/material'
// import { useRouter } from 'next/router'
// import React, { useEffect, useState } from 'react'

// export default function MovieDetail() {
//     const router = useRouter()
//     const { id } = router.query
//     const [movieJP, setMovieJP] = useState(null)
//     const [movieEN, setMovieEN] = useState(null)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchMovieDetails = async () => {
//             try {
//                 if (id) {
//                     const response = await fetch(`/api/${id}`)
//                     if (!response.ok) {
//                         throw new Error(
//                             `HTTP error! status: ${response.status}`,
//                         )
//                     }
//                     const data = await response.json()
//                     setMovieEN(data.en)
//                     setMovieJP(data.jp)
//                 }
//             } catch (error) {
//                 console.error('Error fetching movie details:', error)
//                 setError(error.message)
//             }
//         }

//         fetchMovieDetails()
//     }, [id])

//     if (!movieJP) {
//         return <CircularProgress />
//     }

//     return (
//         <Box py={3}>
//             <Box maxWidth="lg" mx="auto">
//                 <Grid container spacing={3} sx={{ p: '30px' }}>
//                     <Grid item xs={12} md={5}>
//                         <img
//                             src={`https://image.tmdb.org/t/p/original${movieJP.poster_path}`}
//                             alt={movieJP.title || movieJP.original_title}
//                             style={{
//                                 width: '100%',
//                                 maxHeight: '500px',
//                                 objectFit: 'contain',
//                                 filter: 'blur(30px)',
//                             }}
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={7}>
//                         <Typography
//                             variant="h4"
//                             fontWeight="bold"
//                             sx={{ mt: '50px' }}>
//                             {movieJP.title || movieJP.original_title}
//                         </Typography>
//                         <Typography variant="subtitle1" sx={{ mt: '30px' }}>
//                             {movieJP?.overview || movieEN?.overview}
//                         </Typography>
//                         <Typography
//                             variant="body1"
//                             component="p"
//                             sx={{ mt: '10px' }}>
//                             公開日： {movieJP.release_date}
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Box>
//     )
// }

//サーバーサイドレンダリングを行うときに使用する
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'

export default function MovieDetail({ movie }) {
    //movie が存在しない場合にローディングのための <CircularProgress /> を表示し、movie が存在すればそのデータを使って映画の詳細情報を表示する
    if (!movie) {
        return <CircularProgress />
    }

    return (
        <Box py={3}>
            <Box maxWidth="lg" mx="auto">
                <Grid container spacing={3} sx={{ p: '30px' }}>
                    <Grid item xs={12} md={5}>
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title || movie.original_title}
                            style={{
                                width: '100%',
                                maxHeight: '500px',
                                objectFit: 'contain',
                                // filter: 'blur(30px)',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ mt: '50px' }}>
                            {movie.title || movie.original_title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: '30px' }}>
                            {movie.overview || 'あらすじがありません。'}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{ mt: '10px' }}>
                            公開日： {movie.release_date}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

//movieは実際はprops.movie
//props オブジェクトの movie プロパティに相当します
//{ movie } と書くことで、props.movie を直接 movie という変数名で扱えるようにしている
