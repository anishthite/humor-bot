import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import ChatBot, {Loading} from 'react-simple-chatbot';
import axios from 'axios'
import https from 'https'
import Button from '@material-ui/core/Button';


const URL = "https://greetez.com:4444/retrieve"
const feedbackURL = "https://greetez.com:4240/feedback"
const myURL = "https://pal-ai.github.io/chat"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const uuidv4 = require('uuid/v4');
const myuuid = uuidv4();

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
var start = ['What are you doing today?', 'What are you doing right now?', 'What\'s up?', 'How are you today?', 'What do you like to do?', 'How are you?']

class FeedbackButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Button variant="contained" size="small" color="default" onClick={() => 
        { 
            window.clearInterval(interval); 
            this.props.triggerNextStep({value : 'yes', trigger: 'feedback-form'});
      }}>
              Wrong Response? Click Me!
      </Button>
    );
  }
}

class NewTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: <Loading />};
    this.state.result = this.getRandomStart();
    this.props.triggerNextStep();
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  getRandomStart(){
    const message = start[this.getRandomInt(start.length)];
    history[history.length -1] = history[history.length -1] + ' ' + message;
    //console.log('message');
    return(message);
  }
  render() {
    return(this.state.result)
  }
}

class Thanks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, result: <Loading />, trigger: false};
    this.state.result = '';
    this.searchInputTimeout = setTimeout(() => {this.sendfeedback(props).then(
      myresponse => {
        console.log(myresponse);
        this.refresh();
      });
  }, 400);
  }
  render() {
    return (this.state.result);
  }

  sendfeedback(props) {
    var tosend = {
      "history" : history,
      "id" : myuuid,
      'feedback' :props.steps['user-feedback']['message']
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
      return response.data;
    })
    .catch(err=>console.log(err))
  }
  refresh() {
    window.location.replace(myURL);
  }
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
      this.state.result = myresponse;
      history.push(myresponse);
      this.startTimer();
      this.props.triggerNextStep();
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
      this.props.triggerNextStep({value : 'yes', trigger: 'start1'});
      _idleSecondsCounter = 0;
    }
}
}
class Interfacer extends React.Component{
  constructor(props) {
    super(props);
    this.stopTimer();
    this.CheckIdleTime=this.CheckIdleTime.bind(this);
    this.state = {loading: true, result: <Loading />, trigger: false, trigfunc: this.props.triggerNextStep};
    history.push(props.previousStep.message);
    this.searchInputTimeout = setTimeout(() => {this.makeprediction().then(
      myresponse => {
      this.state.result = myresponse;
      history.push(myresponse);
      this.startTimer();
      this.props.triggerNextStep();
    });
  }, 400);
  }

  makeprediction(){
    var tosend = {
      "history" : history.slice(-(2*10+1)),
      "device" : "cpu",
      "top_p" : 0.0,
      "top_k" : 10,
      "temperature" : 1,
      "id" : myuuid
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
Retriever.propTypes = {
  previousStep: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Retriever.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};



Interfacer.propTypes = {
  previousStep: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Interfacer.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

var steps = [
  {
    id: 'start0',
    message: 'Hello there! Please type a keyword and I will write a joke based on it)',
    trigger: 'user',
  },
  {
    id: 'start1',
    component: <NewTopic />,
    asMessage: true,
    waitAction: true,
    trigger: 'user',
  },
  {
    id: 'user',
    user: true,
    trigger: 'message-returner',
  },
  {
    id: 'message-returner',
    component: <Retriever />,
    trigger: 'start0',
    waitAction: true,
    asMessage: true
  },
  {
    id: 'feedback',
    component: <FeedbackButton />,
    asMessage: true,
    trigger: 'user'
  },
  {
    id: 'feedback-form',
    message: 'What should have I said?',
    trigger: 'user-feedback'
  },
  {
    id: 'user-feedback',
    user: true,
    trigger: 'thanks-message'
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
    delay: 100
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

