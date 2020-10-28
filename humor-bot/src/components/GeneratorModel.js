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
      console.log(props.previousStep)
      //decide 
      var topic = props.previousStep.message
      if ( topic == 'Random'){
        topic = getRandomKeyword(topic)
      }
      else if (Object.keys(topicdict).includes(topic)) {
        topic = getKeyword(topic)
      }

      this.props.history.push(topic);
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

  GeneratorModel.propTypes = {
    previousStep: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
  GeneratorModel.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };
export default GeneratorModel;


const music = [ 'music', 'beat', 'DJ', 'pop', 'sing', 'hip', 'hop','rap','rock','instrument','heavy','metal','song','band','composer','artist','drum','piano','trumpet','trombone','organ','scale','choir','Elvis','Taylor Swift','BTS','Post Malone' ]

const food =  ['food','eat','walnut','apple','banana','orange','pancake','toast','meat','potato','mayo','soup','bagel','noodle','chip','cereal','candy','cookie','egg','ice','cream','honey','mushroom','hamburger','meal','pie','pizza','sandwich','snack','vegetable','fruit','bacon','corn','coconut','jam','jelly','peanut','cake','salsa','nut','cheese','sugar','butter','steak','burrito','french fry' ];

const sports = [ 'sport',  'basketball',  'football',  'soccer',  'baseball',  'score',  'ball',  'bat',  'hoop',  'box',  'wrestling',  'running',  'Olympics',  'skating',  'hockey',  'cricket',  'quarterback',  'stadium',  'court',  'fans',  'softball',  'NBA',  'NFL',  'MLS' ];
const school = ["school", "college", "ruler", "pencil", "homework", "test", "quiz", "science", "english", "math", "calculus", "algebra", "campus", "debt", "graduate", "sophomore", "freshman", "junior", "senior", "university", "professor", "teacher", "instructor", "faculty", "fraternity", "roommate", "loan"];

const covid = ['social distancing', 'coronavirus', 'covid', 'vaccine', 'online']

export const topicdict = {
    'Music 🎵': music,
    'Food 🍕': food,
    'Sports 🏀': sports,
    'School 📝': school,
    'COVID 🤢': covid
};

function sample(array) {
    return array[Math.floor(Math.random()*array.length)]

}

export function getRandomKeyword(topic) {
    var topic = sample(Object.keys(topicdict))
    return sample(topicdict[topic]);
}

export function getKeyword(topic) {
    return sample(topicdict[topic]);
}
