import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
	renderSongs() {
		const songs = this.props.data.songs;

		return songs.map(({ id, title }) => (
			<li key={`${id}`} className="collection-item">
				<Link to={`/songs/${id}`}>{title}</Link>
				<i onClick={() => this.onSongDelete(id)} className="material-icons">
					delete
				</i>
			</li>
		));
	}

	onSongDelete(id) {
		this.props
			.mutate({
				variables: { id },
			})
			.then(() => this.props.data.refetch());
	}

	render() {
		return this.props.data.loading ? (
			<div>Loading...</div>
		) : (
			<div>
				<ul className="collection">{this.renderSongs()}</ul>
				<Link to="/songs/new" className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));
