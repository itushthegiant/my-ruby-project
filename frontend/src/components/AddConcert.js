import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArtistsSuggestion from './ArtistsSuggestions';
import VenueSuggestions from './VenueSuggestions';



export default class AddConcert extends Component {

    state = {
        title: '',
        date: '',
        artist: '',
        venue: ''
    }


    handleOnChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:9292/concerts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                date: this.state.date,
                artist: this.state.artist,
                venue: this.state.venue
            })
        })
        .then(resp => resp.json())
        .then(this.props.history.push("/concerts"))

    }

    getValueFromSuggestion = (value) => {
        this.setState({
            artist: value
        })
    }

    getValueFromVenue = (value) => {
        this.setState({
            venue: value
        })
    }



    render() {

        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <TextField
                        name='title'
                        onChange={this.handleOnChange}
                        id="standard-full-width"
                        label="Concert Title"
                        style={{ margin: 8 }}
                        placeholder="Title"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        onChange={this.handleOnChange}
                        name='date'
                        id="standard-full-width"
                        label="Date"
                        style={{ margin: 8 }}
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        onChange={this.handleOnChange}
                        name='venue'
                        id="standard-full-width"
                        label="Venue Name"
                        style={{ margin: 8 }}
                        placeholder="Venue"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <VenueSuggestions getValueFromVenue={this.getValueFromVenue}/>
                    <ArtistsSuggestion getValueFromSuggestion={this.getValueFromSuggestion} />
                    <Button className="add-concert" variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}