import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import ChatBot, {Loading} from 'react-simple-chatbot';
import axios from 'axios'
import https from 'https'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const BASE_URL = "https://greetez.com:4444" 
const feedbackURL = BASE_URL + "/feedback"
const myURL = "https://greetez.com:3000"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//const uuidv4 = require('uuid/v4');
//const myuuid = uuidv4();

var IDLE_TIMEOUT = 30; //seconds
var _idleSecondsCounter = 0;
var interval;
window.onkeydown = function() {
  _idleSecondsCounter = 0;
};
window.onkeyup = function() {
  _idleSecondsCounter = 0;
};
window.onkeypress = function() {
  _idleSecondsCounter = 0;
};
window.oninput = function() {
  _idleSecondsCounter = 0;
};

var history = [];


const models = ["/retrieve", "/generate_gpt2_ind", "/generate_dialogpt2", "/generate_pipeline"];
const model = models[Math.floor(Math.random()*models.length)];
const URL = BASE_URL + model;
console.log(model);
var start = ['What are you doing today?', 'What are you doing right now?', 'What\'s up?', 'How are you today?', 'What do you like to do?', 'How are you?']

//class FeedbackButton extends React.Component {
//  constructor(props) {
//    super(props)
//  }
//  render() {
//    return (
//      <Button variant="contained" size="small" color="default" onClick={() => 
//        { 
//            window.clearInterval(interval); 
//            this.props.triggerNextStep({value : 'yes', trigger: 'feedback-form'});
//      }}>
//              Wrong Response? Click Me!
//      </Button>
//    );
//  }
//}
//
//class NewTopic extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {result: <Loading />};
//    this.state.result = this.getRandomStart();
//    this.props.triggerNextStep();
//  }
//  getRandomInt(max) {
//    return Math.floor(Math.random() * Math.floor(max));
//  }
//  getRandomStart(){
//    const message = start[this.getRandomInt(start.length)];
//    history[history.length -1] = history[history.length -1] + ' ' + message;
//    //console.log('message');
//    return(message);
//  }
//  render() {
//    return(this.state.result)
//  }
//}
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
      "joketuple" : history,
      'feedback' : props.steps['user-feedback']['message'],
	'model': model,
    }
    const instance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false,
        strictSSL: false
      })
    });

    return instance.post(feedbackURL,tosend)
    .then(function(response) {
      console.log(response.data);
      history = [];
      return response.data;
    })
    .catch(err=>console.log(err))
  }
  //refresh() {
  //  window.location.replace(myURL);
  //}
}

class FeedbackNoJoke extends React.Component {
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
      "joketuple" : history,
      'feedback' : props.steps['user-nojoke']['message'],
	'model': model,
    }
    const instance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false,
        strictSSL: false
      })
    });


    return instance.post(feedbackURL,tosend)
    .then(function(response) {
      console.log(response.data);
      history = [];
      return response.data;
    })
    .catch(err=>console.log(err))
  }
  //refresh() {
  //  window.location.replace(myURL);
  //}
}

class Thanks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, result: <Loading />, trigger: false};
    this.searchInputTimeout = setTimeout(() => {this.sendfeedback(props).then(
      myresponse => {
        console.log(myresponse);
      	this.state.result = 'Thanks for the feedback! Please type another keyword and I will write a joke based on it';
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
      "joketuple" : history,
      'feedback' :props.steps['goodoptions']['message']
    }
    const instance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false,
        strictSSL: false
      })
    });

    return instance.post(feedbackURL,tosend)
    .then(function(response) {
      console.log(response.data);
      history = [];
      return response.data;
    })
    .catch(err=>console.log(err))
  }
  //refresh() {
  //  window.location.replace(myURL);
  //}
}
class Retriever extends React.Component{
  constructor(props) {
    super(props);
    this.stopTimer();
    this.CheckIdleTime=this.CheckIdleTime.bind(this);
    this.state = {loading: true, result: <Loading />, trigger: false, trigfunc: this.props.triggerNextStep};
    history.push(props.previousStep.message);
    this.searchInputTimeout = setTimeout(() => {this.makeprediction().then(
      myresponse => {
      history.push(myresponse);
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
      "history" : history[history.length-1],
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
  interval = window.setInterval(this.CheckIdleTime, 1000);
}

stopTimer() {
  window.clearInterval(interval);
}
CheckIdleTime() {
    _idleSecondsCounter++;
    //console.log(_idleSecondsCounter)
    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
      //this.props.triggerNextStep({value : 'yes', trigger: 'start1'});
      _idleSecondsCounter = 0;
    }
}
}
//class Interfacer extends React.Component{
//  constructor(props) {
//    super(props);
//    this.stopTimer();
//    this.CheckIdleTime=this.CheckIdleTime.bind(this);
//    this.state = {loading: true, result: <Loading />, trigger: false, trigfunc: this.props.triggerNextStep};
//    history.push(props.previousStep.message);
//    this.searchInputTimeout = setTimeout(() => {this.makeprediction().then(
//      myresponse => {
//      this.state.result = myresponse;
//      history.push(myresponse);
//      this.startTimer();
//      this.props.triggerNextStep();
//    });
//  }, 400);
//  }
//
//  makeprediction(){
//    var tosend = {
//      "history" : history.slice(-(2*10+1)),
//      "device" : "cpu",
//      "top_p" : 0.0,
//      "top_k" : 10,
//      "temperature" : 1,
//      "id" : myuuid
//    }
//    const instance = axios.create({
//      httpsAgent: new https.Agent({  
//        rejectUnauthorized: false,
//        strictSSL: false
//      })
//    });
//
//    return instance.post(URL,tosend)
//    .then(function(response) {
//      return response.data;
//    })
//    .catch(err=>console.log(err))
//  }
//
//  render() {
//    return(this.state.result);
//  }
//startTimer() {
//  interval = window.setInterval(this.CheckIdleTime, 1000);
//}
//
//stopTimer() {
//  window.clearInterval(interval);
//}
//CheckIdleTime() {
//    _idleSecondsCounter++;
//    //console.log(_idleSecondsCounter)
//    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
//      //this.props.triggerNextStep({value : 'yes', trigger: 'start1'});
//      _idleSecondsCounter = 0;
//    }
//}
//}
Retriever.propTypes = {
  previousStep: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Retriever.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};



//Interfacer.propTypes = {
//  previousStep: PropTypes.object,
//  triggerNextStep: PropTypes.func,
//};
//
//Interfacer.defaultProps = {
//  steps: undefined,
//  triggerNextStep: undefined,
//};

var steps = [
  {
    id: 'start0',
    message: 'Hello there! Please type a keyword and I will write a joke based on it',
    trigger: 'user',
  },
  {
    id: 'continue new',
    message: 'Please type another keyword and I will write a joke based on it',
    trigger: 'user',
  },
//  {
//    id: 'start1',
//    component: <NewTopic />,
//    asMessage: true,
//    waitAction: true,
//    trigger: 'user',
//  },
 {
    id: 'user-nojoke',
    user: true,
    trigger: 'feedback-nojoke',
  },
 {
    id: 'user',
    user: true,
    trigger: 'message-returner',
  },
  {
    id: 'message-returner',
    component: <Retriever />,
   // trigger: 'quality',
    waitAction: true,
    asMessage: true
  },
  {
    id: 'quality',
    message: 'Was this joke good?',
    trigger: 'goodoptions'	  
  },  
  {
    id: 'goodoptions',
    options:[
	    {value: 'yes', label: 'yes',trigger:'thanks'},
	    {value: 'no', label: 'no',trigger:'feedback-form'}
    ],	  
  },
  {
    id: 'feedback-nojoke',
    component: <FeedbackNoJoke />,
    asMessage: true,
    waitAction: true,
    trigger: 'continue new'
  },
  {
    id: 'feedback-badjoke',
    component: <FeedbackBadJoke />,
    asMessage: true,
    waitAction: true,
    trigger: 'continue new'
  },
  {
    id: 'feedback-form',
    message: 'Please tell me a better joke (hit enter if you can\'t think of one).',
    trigger: 'user-feedback'
  },
  {
    id: 'user-feedback',
    user: true,
    trigger: 'feedback-badjoke'
  },
   {
    id: 'thanks-message',
    delay: 1500,
    message: 'Thanks!',
    trigger: 'thanks'
   },
   {
    id: 'thanks',
    component: <Thanks />,
    asMessage: true,
    waitAction: true,
    trigger: 'continue new'
  }
];

function App() {
  return (
     <div className="App">
	<div>
      <ChatBot width="100%" enableMobileAutoFocus='true' steps={steps} headerTitle="Humor Generator" contentStyle={{ height: '86vh' }} style={{ height: '100%' }} botDelay={0} userDelay={50} />
      </div>
     </div>
  );
}

export default App;
