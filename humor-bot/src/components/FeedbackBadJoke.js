import React from 'react';
import '../App.css';
import {Loading} from 'react-simple-chatbot';
import axios from 'axios'
import https from 'https'
class FeedbackBadJoke extends React.Component {
    constructor(props) {
      super(props);
      this.state = {loading: true, result: <Loading />, trigger: false};
      this.searchInputTimeout = setTimeout(() => {this.sendfeedback(props).then(
        myresponse => {
          console.log(myresponse);
            this.state.result = 'Thanks for the feedback!';
      this.props.triggerNextStep();
      //this.refresh();
        });
    }, 400);
    }
    render() {
      return (this.state.result);
    }
  
    sendfeedback(props) {
      var tosend = {
        "joketuple" : this.props.history,
        'feedback' : props.steps['user-feedback']['message'],
      'model': this.props.model,
      }
      const instance = axios.create({
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false,
          strictSSL: false
        })
      });
  
      return instance.post(this.props.feedbackURL,tosend)
      .then(function(response) {
        console.log(response.data);
        this.props.history = [];
        return response.data;
      })
      .catch(err=>console.log(err))
    }
    //refresh() {
    //  window.location.replace(myURL);
    //}
}

export default FeedbackBadJoke;