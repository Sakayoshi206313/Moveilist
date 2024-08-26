import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Rating from '@mui/material/Rating'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function ReviewForm() {
    const [open, setOpen] = React.useState(false)
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [error, setError] = useState('')
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = () => {
        // バリデーション: レビュー本文と評価が入力されているか確認
        if (reviewText.trim() === '' || rating === 0) {
            setError('レビューと評価は必須です')
            return
        }
        // フォームが正しく入力されている場合、onSubmit関数を呼び出し、レビューを送信
        onSubmit({ reviewText, rating })
        // フォームをリセット
        setReviewText('')
        setRating(0)
        setError('')
    }

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{
                    display: 'block',
                    mx: 'auto',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>
                レビューを投稿する
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}>
                        レビューを投稿する
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        sx={{ fontSize: '40px' }}
                    />
                    <TextField
                        label="レビュー"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        placeholder="ここにレビューを入力してください"
                        sx={{ mt: 1 }}
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        variant="outlined"
                        onClick={handleSubmit}
                        sx={{
                            mt: 2,
                            border: '1px solid #B5B5B5',
                            color: '#333333',
                            '&:hover': {
                                backgroundColor: '#A0A0A0',
                            },
                        }}>
                        レビューを投稿する
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
