import React from 'react';

class QueryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            submit_disabled: true,
            sentiment: ''
        };
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        });

        if (event.target.value.trim() !== '') {
            this.setState({
                submit_disabled: false
            });
        } else {
            this.setState({
                submit_disabled: true,
                sentiment: ''
            });
        }
    }

    fetchSentiment = () => {
        return fetch('http://localhost:12345/sentilize', {
            method: 'POST',
            body: JSON.stringify({
                sentence: this.state.value
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            this.setState({
                sentiment: responseJSON.sentiment
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        let response_div = '';
        if (this.state.sentiment !== '') {
            response_div = <div className='response-wrapper'>
                <h3>Sentiment:</h3>
                <div className='response-text'>{this.state.sentiment}</div>
            </div>
        }
        return (
            <div className='query-page-wrapper'>
                <h1 className='page-heading'>Sentilizer</h1>
                <div className='query-form-wrapper'>
                    <label>Enter text to analyze its sentiment:</label>
                    <textarea
                        id='sentiment'
                        value={this.state.value}
                        onChange={this.handleChange} />
                    <button
                        type='button'
                        disabled={this.state.submit_disabled}
                        onClick={this.fetchSentiment} >Submit</button>
                </div>
                {response_div}
            </div>
        )
    }
}

export default QueryForm;