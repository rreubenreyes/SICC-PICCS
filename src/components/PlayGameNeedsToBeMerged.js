import React, { Component } from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import Clarifai from 'clarifai';

const clarifaiApp = new Clarifai.App({
    apiKey: '78812b999a7e4e76b5c5765356651516',
});

const GAMES_SUBSCRIPTION = gql`
    subscription GamesSubscription($gameId: String!) {
        games(where: { status: { _eq: "inProgress" }, id: { _eq: $gameId } }) {
            id
            createdBy
            status
        }
    }
`;

class PlayGame extends Component {
    state = {
        huntedItem: 'banana',
        imageURL: '',
        results: [],
    };

    handleUpload = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'siccpiccs');
        const res = await fetch('https://api.cloudinary.com/v1_1/brandonstinson/image/upload', {
            method: 'POST',
            body: data,
        });
        const file = await res.json();
        this.setState({ imageURL: file.secure_url }, this.getClarifaiData);
    };

    getClarifaiData = () => {
        const { imageURL } = this.state;
        clarifaiApp.models
            .predict('bd367be194cf45149e75f01d59f77ba7', imageURL)
            .then(res => this.setState({ results: res }, this.checkSubmission));
    };

    checkSubmission = () => {
        const { huntedItem, results } = this.state;
        const names = [];
        results.outputs[0].data.concepts
            .filter(concept => concept.value > 0.9)
            .map(filtered => names.push(filtered.name));
        return names.includes(huntedItem);
    };

    render() {
        const { gameId } = this.props;
        return (
            <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
                {({ data = {}, error, loading }) => {
                    console.log({ data, error, loading });
                    const { games = [] } = data;
                    if (games.length === 1) {
                        return <h3>You are playing the game!</h3>;
                    }
                    return <h3>You are waiting for the game to start</h3>;
                }}
            </Subscription>
        );
    }
}

export default PlayGame;
