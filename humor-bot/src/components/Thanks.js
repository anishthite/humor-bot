import React from 'react';
import '../App.css';
import {Loading} from 'react-simple-chatbot';
import axios from 'axios'
import https from 'https'
class Thanks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {loading: true, result: <Loading />, trigger: false};
      this.searchInputTimeout = setTimeout(() => {this.sendfeedback(props).then(
        myresponse => {
          console.log(myresponse);
            if (props.steps['goodoptions']['message']=='😍') {
                this.state.result = '(~˘▾˘)~ That’s great! Glad you liked it!';
            }
            else{
                console.log(props.steps['goodoptions']['message'])
                this.state.result = 'I’ll try harder next time… ᕙ(⇀‸↼‶)ᕗ';
            }
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
        'feedback' :props.steps['goodoptions']['message'],
        'model' : this.props.model
      }
      const instance = axios.create({
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false,
          strictSSL: false
        })
      });
  
      return instance.post(this.props.FEEDBACK_URL,tosend)
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
export default Thanks;