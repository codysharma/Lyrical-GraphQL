import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
    renderSongs() {
        // if trying to return a map of each song initially, will be undefined since it needs time to load
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className='collection-item'>
                    {song.title}
                </li>
            )
        })
    }

    render() {
        // console.log(this.props.data.songs);
        if (this.props.data.loading) { return <div>Loading...</div>;}

        return (
            <div>
                <h3>SongList</h3>
                <ul className='collection'>
                    {this.renderSongs()}
                </ul>
            </div>
        );
    }
}

const queryAllSongs = gql`
    {
        songs {
            id    
            title
        }
    }
`;

export default graphql(queryAllSongs)(SongList);