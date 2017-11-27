import React, { Component } from "react";
import logo from "./logo.svg";
import loadinfo from "./loadinfo.gif";
import "./App.css";
import { Container, Image } from "bloomer";
import "bulma/css/bulma.css";
import fetchJsonp from "fetch-jsonp";
import InfiniteScroll from 'react-infinite-scroll-component';

import MoviesList from "./MoviesList";
import SearchBar from "./SearchBar";
import EndpointBox from "./EndpointBox";


var currentEndpoint = "now_playing";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMovies: [],
      listMovie: [],
      isLoading: true,
      currentPage: 1
    };

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      isLoading: true
    });
    var url =
      "https://api.themoviedb.org/3/movie/" +
      currentEndpoint +
      "?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=" + this.state.currentPage;

    fetchJsonp(url)
      .then(data => {
        return data.json();
      })
      .then(json => {
        this.movies = json.results;
        this.setState({
          showMovies: this.movies,
          listMovie: this.movies,
          isLoading: false
        });
      });
  }

  handleSearch(character) {
    this.setState({
      showMovies: this.state.listMovie.filter(film =>
        film.title.toLowerCase().includes(character.toLowerCase())
      )
    });
  }

  changeEndPoint(endpoint) {
    this.setState({
      currentPage: 1,
    })
    currentEndpoint = endpoint;
    this.loadData(endpoint);
  }

  changeSorting(sorting) {
    switch (sorting) {
      case "rating":
      this.setState({
        showMovies: this.state.showMovies.sort(function(a, b){return b.vote_average-a.vote_average})
      });
      break;
      case "popularity":
      this.setState({
        showMovies: this.state.showMovies.sort(function(a, b){return b.popularity-a.popularity})
      });
      break;
      case "release_date":
      this.state.showMovies.sort();
      this.setState({
        showMovies: this.state.showMovies.reverse()
      });
      break;
      default:
      break;
    }
  }

  loadNextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
    
    var url =
    "https://api.themoviedb.org/3/movie/" +
    currentEndpoint +
    "?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=" + this.state.currentPage;

  fetchJsonp(url)
    .then(data => {
      return data.json();
    })
    .then(json => {
      this.movies = json.results;
      this.setState({
        showMovies: this.state.showMovies.concat(this.movies),
        listMovie: this.state.listMovie.concat(this.movies)
      });
    });
  }

  render() {
    let content;
    if (this.state.isLoading) {
      content = (
        <div className="App-loading">
          {" "}
          <Image isSize="64x64" src={loadinfo} />{" "}
        </div>
      );
    } else {
      content = <MoviesList movies={this.state.showMovies} />;
    }
    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Flixie</h1>
          </header>
          <Container>
            <SearchBar onSearch={this.handleSearch.bind(this)} />
            <EndpointBox changeEndPoint={this.changeEndPoint.bind(this)}
                          changeSorting={this.changeSorting.bind(this)}/>
          </Container>
          <InfiniteScroll loader={<h4>Loading...</h4>} next={this.loadNextPage.bind(this)} hasMore={true}>
              {content}
            </InfiniteScroll>
        </div>
      </Container>
    );
  }
}

export default App;
