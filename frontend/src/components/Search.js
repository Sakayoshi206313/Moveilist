import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function FullWidthTextField() {
    //queryの状態を管理する変数を定義する（入力された文字が今なんなのかみたいなイメージ）
    const [query, setQuery] = useState('')
    //ルートを管理する
    const router = useRouter()

    //ここは入力フィールドに文字が入力されたときに呼び出される関数
    const handleInputChange = event => {
        setQuery(event.target.value)
    }

    //ボタンがクリックされたときに検索クエリがあった場合、router.pushにて検索クエリをURLに含めて検索結果ページにリダイレクトします
    const handleSearchClick = e => {
        e.preventDefault()
        if (query) {
            router.push(`/search/${query}`)
        }
    }

    //ボタンがクリックされたときにfetchMoviesが実行される
    // const handleSearchClick = () => {
    //     fetchMovies()
    // }

    // //queryが空の状態でない場合に実行される
    // //
    // const fetchMovies = async () => {
    //     if (query) {
    //         try {
    //             const response = await fetch(
    //                 `/api/getSearchResults?query=${query}`,
    //             )
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok')
    //             }
    //             const data = await response.json()
    //             //データを保存　movies の状態が data.results に更新される
    //             setMovies(data.results)
    //             console.log(data)
    //         } catch (error) {
    //             console.error('Error fetching movies:', error)
    //         }
    //     }
    // }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10px',
            }}>
            <TextField
                fullWidth
                label="映画のタイトルを入力してください"
                id="fullWidth"
                onChange={handleInputChange}
                sx={{
                    mb: 2,
                    width: '100%',
                    maxWidth: 500,
                }}
            />
            <Button
                variant="contained"
                href="#contained-buttons"
                onClick={handleSearchClick}>
                検索
            </Button>
        </Box>
    )
}
