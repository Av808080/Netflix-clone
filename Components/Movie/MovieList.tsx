import React from 'react'
import MovieCard from './MovieCard'
import { isEmpty } from 'lodash'
interface MovieListProps {
    data: Record<string, any>[]
    title: string
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
    if(isEmpty(data))
        return null    
    return (
        <section className='m-3 '>
            <h2 className='text-white text-3xl font-semibold my-8'>{title}</h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-8'>
            {data.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
            </div>
        </section>
    )
}

export default MovieList
