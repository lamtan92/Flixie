import React, { Component } from "react";
import { Box, Card, CardImage, Image, 
         Media, MediaLeft, MediaContent, Title, Subtitle } from "bloomer";
import "./MovieCard.css";

export default class MovieCard extends Component {
  render() {
    return (
      <Box className="MovieCard-Box">
        <Card>
          <Media>
          <MediaLeft>
              <CardImage>
                <Image
                  src={
                    "http://image.tmdb.org/t/p/w342" +
                    this.props.movie.poster_path
                  }
                />
              </CardImage>
              </MediaLeft>
                    <MediaContent>
                    <Title isSize={4}>{this.props.movie.title}</Title>
                    <Subtitle isSize={6}>{this.props.movie.overview}</Subtitle>
                    </MediaContent>
            
          </Media>
        </Card>
      </Box>
    );
  }
}
