//APIエンドポイントを作成する
//ここでは検索クエリに応じて、取得したいデータが異なるのでそれに応じたAPIエンドポイントを作成することを考える

export default async function handler(req, res) {
    // クエリパラメータから検索クエリを取得
    const { query } = req.query

    //検索クエリに応じて取得するデータを変える
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=ja-JP&query=${query}`,
        )
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching movies:', error)
        res.status(500).json({
            message: 'エラーが発生しました',
            error: error.toString(),
        })
    }
}
