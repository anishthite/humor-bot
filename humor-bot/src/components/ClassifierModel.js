import React from 'react';
import '../App.css';
import {Loading} from 'react-simple-chatbot';
import axios from 'axios'
import https from 'https'
import PropTypes from 'prop-types';
var IDLE_TIMEOUT = 30;
class ClassifierModel extends React.Component{
    constructor(props) {
      super(props);
      this.stopTimer();
      this.CheckIdleTime=this.CheckIdleTime.bind(this);
      this.state = {loading: true, result: <Loading />, trigger: false, trigfunc: this.props.triggerNextStep};
      var joke = props.previousStep.message
      this.props.history.push(joke);
      this.searchInputTimeout = setTimeout(() => {this.makeprediction().then(
        myresponse => {
        this.props.history.push(myresponse);
        var next_step;
        this.state.result = myresponse;
        next_step = 'classifier_agree';
        this.startTimer();
        console.log('here')
        this.props.triggerNextStep({ value: next_step , trigger: next_step} );
      });
    }, 400);
    }
  
    makeprediction(){
      var tosend = {
        "history" : this.props.history[this.props.history.length-1],
      }
      const instance = axios.create({
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false,
          strictSSL: false
        })
      });
	console.log('IRL'); 
	console.log(this.props.url);
      return instance.post(this.props.url,tosend)
      .then(function(response) {
        return response.data;
      })
      .catch(err=>console.log(err))
    }
  
    render() {
      return(this.state.result);
    }
  startTimer() {
    this.interval = window.setInterval(this.CheckIdleTime, 1000);
  }
  
  stopTimer() {
    window.clearInterval(this.interval);
  }
  CheckIdleTime() {
      this._idleSecondsCounter++;
      //console.log(_idleSecondsCounter)
      if (this._idleSecondsCounter >= IDLE_TIMEOUT) {
        //this.props.triggerNextStep({value : 'yes', trigger: 'start1'});
        this._idleSecondsCounter = 0;
      }
  }
  }

  ClassifierModel.propTypes = {
    previousStep: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
  ClassifierModel.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };
export default ClassifierModel;