import React from 'react';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import './App.css';
//import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
//import axios from 'axios'
//import https from 'https'
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
import FeedbackBadJoke from './components/FeedbackBadJoke.js'
import FeedbackNoJoke from './components/FeedbackNoJoke.js'
import Thanks from './components/Thanks.js'
import ThanksClassifier from './components/ThanksClassifer.js'
import GeneratorModel from './components/GeneratorModel.js'
import ClassifierModel from './components/ClassifierModel.js'
import Home from './components/Home.js'
import EvaluationProcess from './components/Home.js'

const BASE_URL = "https://raspi.brrrr.live:4242" 
const FEEDBACK_URL = BASE_URL + "/feedback"
const CLASS_URL = BASE_URL + "/classify"
//const myURL = "https://greetez.com:3000"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//const uuidv4 = require('uuid/v4');
//const myuuid = uuidv4();

// var IDLE_TIMEOUT = 30; //seconds
// var _idleSecondsCounter = 0;
// var interval;
// window.onkeydown = function() {
//   _idleSecondsCounter = 0;
// };
// window.onkeyup = function() {
//   _idleSecondsCounter = 0;
// };
// window.onkeypress = function() {
//   _idleSecondsCounter = 0;
// };
// window.oninput = function() {
//   _idleSecondsCounter = 0;
// };

var history = [];

//pick a model
// const models = ["/generate_gpt2_ind", "/generate_dialogpt2", "/generate_pipeline"];
// const model = models[Math.floor(Math.random()*models.length)];
// const URL = BASE_URL + model;
// console.log(FEEDBACK_URL);

// console.log(model);
//var start = ['What are you doing today?', 'What are you doing right now?', 'What\'s up?', 'How are you today?', 'What do you like to do?', 'How are you?']

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

class Survey extends React.Component{
    constructor(props) {
        super(props);
    }
	 componentDidMount() {
      if (typeof window !== 'undefined') {
           window.location.href = "http://google.com";
      }
 }
    render() {
	return (<div></div>)
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


//Interfacer.propTypes = {
//  previousStep: PropTypes.object,
//  triggerNextStep: PropTypes.func,
//};
//
//Interfacer.defaultProps = {
//  steps: undefined,
//  triggerNextStep: undefined,
//};
function stepsfrommodel(model) {
  const URL = BASE_URL + model;
  var steps = [
    {
       id: 'startemoji',
       message: 'Hey there! This is Eddie  (•◡•) /',
       trigger: 'startemoji2'
     },
    {
       id: 'startemoji2',
     message: 'Hope you are having a great day! How would you rate your mood today?',
          trigger: 'emoji-buttons'
    
    
    },
    {
     id: 'emoji-buttons',
     options:[
      {value: '😩', label: '😩',trigger:'crazy'}, //😓
       {value: '😱', label: '😱',trigger:'ohno'},
       {value: '😭', label: '😭',trigger:'crying'},
       {value: '🙁', label: '🙁',trigger:'unhappy'},
       {value: '😞', label: '😞',trigger:'worried'},
       {value: '🙃', label: '🙃',trigger:'upsidedown'},
       {value: '😕', label: '😕',trigger:'uncertain'},
       {value: '😊', label: '😊',trigger:'smiley'},
       {value: '😆', label: '😆',trigger:'laughing'}
     ]
   },
   
     {
       id: 'crazy',
       message: 'Oh no! Well my week has been quite rough too. We got this!',
       trigger: 'tellme'
     },
     {
       id: 'ohno',
       message: 'Honestly relatable, but we got this!',
       trigger: 'tellme'
     },
     {
       id: 'crying',
       message: 'Aww, maybe I can help make you feel better',
       trigger: 'tellme'
     },
     {
       id: 'unhappy',
       message: 'Aww, maybe I can help make you feel better',
       trigger: 'tellme'
     },
     {
       id: 'worried',
       message: 'I hope I can cheer you up with my jokes!',
       trigger: 'tellme'
     },
     {
       id: 'smiley',
       message: 'Yay!',
       trigger: 'tellme'
     },
     {
       id: 'laughing',
       message: 'Glad to hear that!',
       trigger: 'tellme'
     },
     {
       id: 'upsidedown',
       message: 'Oh no!',
       trigger: 'tellme'
     },
     {
       id: 'uncertain',
       message: 'Hmm.',
       trigger: 'tellme'
     },
     {
       id: 'tellme',
       message: 'Tell me what you want to do today (づ｡◕‿‿◕｡)づ',
       trigger: 'task_options',
     },  
     {
       id: 'task_options',
        options:[
         //{value: 'game', label: 'Play a game 🎮',trigger:'jokestart'},
         {value: 'joke', label: 'Give me a joke 🤣',trigger:'jokestart'},
         {value: 'judge', label: 'Judge my joke ⚖️',trigger:'ask_joke'}, 
         {value: 'exit', label: 'Exit the game', trigger: 'exit_game'}
   
       ]
     },
     { id: 'jokestart',
       message: 'Alright! Just pick a topic for me! ヾ(⌐■_■)ノ',
       trigger: 'topicoptions'	  
     },
     {
       id: 'topicoptions',
       options: [
         {value: 'music', label: 'Music 🎵',trigger:'message-returner'},
         {value: 'sports', label: 'Sports 🏀',trigger:'message-returner'},
         {value: 'school', label: 'School 📝',trigger:'message-returner'},
         {value: 'food', label: 'Food 🍕',trigger:'message-returner'},
         {value: 'covid', label: 'COVID 🤢',trigger:'message-returner'},
         {value: 'random', label: 'Random',trigger:'message-returner'},
         {value: 'custom', label: 'Custom',trigger:'custom'}
       ]
     },
     {
      id: 'custom',
      message: 'What’s your keyword?',
      trigger: 'user'	  
     },
     {
       id: 'user',
       user: true,
       trigger: 'message-returner',
     },
     {
       id: 'message-returner',
       component: <GeneratorModel history={history} model={model} url={URL}/>,
      // trigger: 'quality',
       waitAction: true,
       asMessage: true
     },
     {
       id: 'quality',
       message: 'Did you like the joke?? \ (•◡•) /',
       trigger: 'goodoptions'	  
     }, 
     {
       id: 'goodoptions',
       options:[
         {value: 'good', label: '😍',trigger:'thanks'},
         {value: 'bad', label: '😩',trigger:'thanks'}
       ],	  
     },
     {
       id: 'thanks',
       component: <Thanks history={history} model={model} feedbackurl={FEEDBACK_URL} />,
       asMessage: true,
       waitAction: true,
       trigger: 'anotherjoke'
     },
   
     {
       id: 'anotherjoke',
       message:'Do you want me to make more jokes?',
       trigger: 'anotherjokeoptions'
     },
     {
       id: 'anotherjokeoptions',
       options:[
         {value: 'jokestart', label: 'Sure',trigger:'jokestart'},
         {value: 'no', label: 'Nah',trigger:'tellme'}
       ]
     },
   // BEGIN HUMOR CLASSIFIER SCRIPT
     {
       id: 'ask_joke',
       message: 'What’s your joke?? 🤩',
       trigger: 'user_joke'
     },
     {
       id: 'user_joke',
       user: true,
       trigger: 'message_classifier'
     },
     {
       id: 'message_classifier',
       component: <ClassifierModel history={history} url={CLASS_URL}/>,
      // trigger: 'quality',
       waitAction: true,
       asMessage: true
     },
     {
       id: 'classifier_agree',
       message: 'Do you agree with the score?',
       trigger: 'classifier_eval_options'
     }, 
     {
       id: 'classifier_eval_options',
       options: [
         {value: '😤', label: '😤',trigger:'classifier_feedback'},
         {value: '😆', label: '😆',trigger:'classifier_feedback'}
       ]
     },
     {
       id: 'classifier_feedback',
       component: <ThanksClassifier history={history} feedbackurl={FEEDBACK_URL} />,
       asMessage: true,
       waitAction: true,
       trigger: 'want_another'
     },
     {
       id: 'want_another',
       options: [
         {value: 'nah', label: 'nah',trigger:'tellme'},
         {value: 'yea', label: 'yea',trigger:'ask_joke'}
       ]
     },
   
   
     //{
     //  id: 'start0',
     //  message: 'Hello there! Please type a keyword and I will write a joke based on it',
     //  trigger: 'user',
     //},
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
       id: 'feedback-nojoke',
       component: <FeedbackNoJoke history={history} model={model} feedbackurl={FEEDBACK_URL}/>,
       asMessage: true,
       waitAction: true,
       trigger: 'continue new'
     },
     {
       id: 'feedback-badjoke',
       component: <FeedbackBadJoke history={history} model={model} feedbackurl={FEEDBACK_URL}/>,
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
        id: 'exit_game',
     component: ( <div> It's time to say goodbye, hope to see you again. Before you leave, would you mind taking a survey for me? It will be very helpful for me to improve.  <a href="https://www.google.com/">Take the Survey</a> </div>
     ),
        asMessage: true,
   
      },
      {
        id: 'exitlink',
        component: (
           <div> Link Doesn't work yet <a href="https://www.google.com/">Take the Survey:</a> </div>
         ),
        asMessage: true,
      }
   ];
   return steps
}


function App() {
  return (

     <div className="App">
         <Router>
         <Switch>
         <Route exact path = "/" component={Home}/>
         </Switch>
          <Route path="/generate">
            <div>
      <ChatBot width="100%" botAvatar='svgtopng/robot 3.png' userAvatar='svgtopng/happy 2.png' enableMobileAutoFocus='true' steps={stepsfrommodel("/generate_pipeline")} headerComponent ={
        <div class="header"> 
        <img src="svgtopng/robot 1.png" align="left" />
        <h1 style={{ fontSize: '36px', fontFamily: "Suez One"}}>Hi there!</h1>
        <p style={{ fontSize: '16px', fontFamily: "Open Sans", paddingLeft : '6%' }}>Hi!  I am Eddie. I can make and judge jokes.</p></div>
      }
       contentStyle={{ height: '86vh' }} style={{ height: '100%' }} botDelay={0} userDelay={50} />
      </div>
          </Route>

          <Route path="/retrieve">
            <div>
      <ChatBot width="100%" botAvatar='svgtopng/robot 3.png' userAvatar='svgtopng/happy 2.png' enableMobileAutoFocus='true' steps={stepsfrommodel("/retrieve")} headerComponent ={
        <div class="header"> 
        <img src="svgtopng/robot 1.png" align="left" />
        <h1 style={{ fontSize: '36px', fontFamily: "Suez One"}}>Hi there!</h1>
        <p style={{ fontSize: '16px', fontFamily: "Open Sans", paddingLeft : '6%' }}>This is Eddie, I am a chatbot. I can help with xxx</p></div>
      }
       contentStyle={{ height: '86vh' }} style={{ height: '100%' }} botDelay={0} userDelay={50} />
      </div>
          </Route>
      <Switch>
      <Route  path = "/evaluation_process" component={EvaluationProcess}/>
      </Switch>
      </Router>
     </div>
  );
}

// function Bot() {
//   return (
//       <div>
//       <ChatBot width="100%" botAvatar='svgtopng/robot 3.png' userAvatar='svgtopng/happy 2.png' enableMobileAutoFocus='true' steps={steps} headerComponent ={
//         <div class="header"> 
//         <img src="svgtopng/robot 1.png" align="left" />
//         <h1 style={{ fontSize: '36px', fontFamily: "Suez One"}}>Hi there!</h1>
//         <p style={{ fontSize: '16px', fontFamily: "Open Sans", paddingLeft : '6%' }}>This is Eddie, I am a chatbot. I can help with xxx</p></div>
//       }
      

//        contentStyle={{ height: '86vh' }} style={{ height: '100%' }} botDelay={0} userDelay={50} />
//       </div>
//   );
// }



export default App;
