import { NextPageContext } from 'next/types'
import { getSession } from 'next-auth/react'
import Navbar from '@/Components/Navbar/Navbar'
import Billboard from '@/Components/Billboard/Billboard'
import useMovieList from '@/hooks/useMovieList'
import MovieList from '@/Components/Movie/MovieList'
import useFavoriteMovies from '@/hooks/useFavoriteMovies'

const Home = () => {
  const { data = [], isLoading } = useMovieList()
  const {data:favoriteMovies=[] , isLoading:loadfavorites , mutate} =useFavoriteMovies()
  console.log(favoriteMovies);
  
  return (
    <>
      <Navbar />
      <Billboard />
      {!isLoading && <MovieList data={data.movies} title='Trending Now' />}
      {!loadfavorites && <MovieList data={favoriteMovies.movies} title='Your List'  />
      }
    </>
  )
}
export default Home

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req })
  if (!session)
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  return {
    props: {}
  }
}


