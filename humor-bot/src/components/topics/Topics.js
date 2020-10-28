import React from 'react';
import '../App.css';
import {Loading} from 'react-simple-chatbot';

const message = 'I\'ll write a joke based on: '

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

// class Topic extends React.Component{
//     constructor(props) {
//       super(props);
//       this.state = {loading: true, result: <Loading />, trigger: false};
//       var topic = props.previousStep.message
//       if ( topic == 'Random'){
//         this.state.result = message + getRandomKeyword(topic)
//       }
//       else {
//         this.state.result = message + getKeyword(topic)
//       }
//       this.props.triggerNextStep();
//     }
//     render() {
//         return(this.state.result);
//     }
// }


