//ルーティングの設定はCSRと同様
//このファイルを作成し、動的ルートを設定します。このファイル名の構成により、URLの{id}部分が動的に変化

import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React from 'react'
import MovieDetail from './MovieDetail'
import MovieReviews from '@/components/MovieReviews'

export default function index({ movie, movieId }) {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail
                </h2>
            }>
            <Head>
                <title>Detail - CinemaLoveReview</title>
            </Head>

            <MovieDetail movie={movie} />
            <MovieReviews movieId={movieId} />
            {/* <ReviewForm /> */}
        </AppLayout>
    )
}
//サーバーサイドレンダリングではgetServerSideProps()関数を使用する
//クライアントがページを開いたときに、すでにデータが存在している状態で表示されるため、初回ロードが速くなり、SEOの効果が高まる

export async function getServerSideProps(context) {
    //ルートパラメータ（URLのパス部分）を含むオブジェクト
    //例えば、/movie/123 のような URL であれば、context.params には { id: '123' } が含まれ
    const { id } = context.params

    try {
        const responseJP = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )
        const movieJP = await responseJP.json()
        let overview = movieJP.overview

        //もし日本語版のあらすじがなかったら…
        if (!overview) {
            const responseEN = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            )
            const movieEN = await responseEN.json()
            overview = movieEN.overview
        }
        //overviewの動きとしては、日本語版のあらすじがあったらそれが代入され、なかったら英語版が代入される

        // props オブジェクトとして movie を返す
        //　movieJPを展開して、overviewおよび『movieId: id』を追加する。（すでにあったら上書き）
        return { props: { movie: { ...movieJP, overview }, movieId: id } }
    } catch (error) {
        console.error('Error fetching movie details:', error)
        return { props: { movie: null } }
    }
}

//props オブジェクト:
//props は特別なオブジェクトで、ページコンポーネントにデータを渡すために使われます。
//props: { movie: { ...movieJP, overview } } とすることで、movie というキーを持つオブジェクトが props に渡されます。
//返された props がページに渡される:
//こうして props オブジェクトに含まれる movie がページコンポーネントに渡され、そのページで使用されます。
