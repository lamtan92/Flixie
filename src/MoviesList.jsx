import React, { Component } from 'react';
import MoviesCard from './MovieCard'

export default class MoviesList extends Component {
    render() {
        return <div>
                {this.props.movies.map (m => <MoviesCard movie={m}/>)}
            </div>
    }
}
