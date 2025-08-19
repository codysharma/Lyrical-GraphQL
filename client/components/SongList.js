import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
    onSongDelete(id){
        this.props.mutate({ 
            variables: { id },
            refetchQueries: [{ query: queryAllSongs }]
        })
            // .then(() => this.props.data.refetch());
    }

    renderSongs() {
        // if trying to return a map of each song initially, will be undefined since it needs time to load
        return this.props.data.songs.map(({id, title}) => {
            return (
                <li key={id} className='collection-item'>
                    <Link to={`/songs/${id}`}>
                        {title}
                    </Link>
                    <i className='material-icons' onClick={() => this.onSongDelete(id)}
                    >delete</i>
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
                <Link to="/songs/new" className="btn-floating btn-large red right">
                <i className='material-icons'>add</i>
                </Link>
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

const mutation = gql`
    mutation DeleteSong($id:ID) {
        deleteSong(id:$id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(queryAllSongs)(SongList)
);

