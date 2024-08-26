// //クライアントサイドレンダリングを行う際に使用する
// //このファイルはAPIを作成している

// export default async function handler(req, res) {
//     const { id } = req.query
//     try {
//         // 英語のあらすじを取得
//         const response = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
//         )
//         // 日本語のあらすじを取得
//         const responseJP = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
//         )

//         // 英語のあらすじに対するエラーチェック
//         if (!response.ok) {
//             throw new Error('Network response was not ok')
//         }
//         // 日本語のあらすじに対するエラーチェック
//         if (!responseJP.ok) {
//             throw new Error('Network response was not ok')
//         }

//         const data = await response.json()
//         const dataJP = await responseJP.json()

//         // 両方のデータをレスポンスとして返す
//         res.status(200).json({
//             en: data,
//             jp: dataJP,
//         })

//         // デバッグ用のログ
//         console.log(data)
//         console.log(dataJP)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: 'エラーが発生しました',
//             error: error.toString(),
//         })
//     }
// }
