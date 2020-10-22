import React from 'react';
import '../App.css';
import {Loading} from 'react-simple-chatbot';
import axios from 'axios'
import https from 'https'
import PropTypes from 'prop-types';
var IDLE_TIMEOUT = 30;
class GeneratorModel extends React.Component{
    constructor(props) {
      super(props);
      this.stopTimer();
      this.CheckIdleTime=this.CheckIdleTime.bind(this);
      this.state = {loading: true, result: <Loading />, trigger: false, trigfunc: this.props.triggerNextStep};
      this.props.history.push(props.previousStep.message);
      this.searchInputTimeout = setTimeout(() => {this.makeprediction().then(
        myresponse => {
        this.props.history.push(myresponse);
        var next_step;
        if (myresponse == "Sorry I don't have a joke about that right now"){
      this.state.result = 'There was no joke returned. Can you please suggest a joke for us? If you can\'t think of one please type no' 
      next_step = 'user-nojoke';
        } else {
          this.state.result = myresponse;
            next_step = 'quality';
        }
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
  
      return instance.post(URL,tosend)
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

  GeneratorModel.propTypes = {
    previousStep: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
  GeneratorModel.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };
export default GeneratorModel;