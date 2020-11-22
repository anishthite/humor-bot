import React from 'react';
import '../App.css';
import {Loading} from 'react-simple-chatbot';
import axios from 'axios'
import https from 'https'


class OpenLink extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const text = 'Link Doesn\'t work yet'
        const link = 'https://www.google.com'
        return (
            <a href={link} target="_blank">
                {text}
            </a>
        );
    }
}


// class ExitLink extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {loading: true, result: <Loading />, trigger: false};
//       this.searchInputTimeout = setTimeout(() => {this.sendfeedback(props).then(
//         myresponse => {
//           console.log(myresponse);
//           this.state.result = 'Do you have another joke?';
//           this.props.triggerNextStep();
//       //this.refresh();
//         });
//     }, 400);
//     }
//     render() {
//       return (this.state.result);
//     }
  
//     sendfeedback(props) {
//       var tosend = {
//         "type" : 'classifier',
//         "joketuple" : this.props.history,
//         'feedback' : props.steps['classifier_eval_options']['message']
//       }
//       const instance = axios.create({
//         httpsAgent: new https.Agent({  
//           rejectUnauthorized: false,
//           strictSSL: false
//         })
//       });
//   	console.log('feedback');
// 	console.log(this.props.feedbackurl);
//       return instance.post(this.props.feedbackurl,tosend)
//       .then(function(response) {
//         console.log(response.data);
//         //this.props.history = [];
//         return response.data;
//       })
//       .catch(err=>console.log(err))
//     }
//     //refresh() {
//     //  window.location.replace(myURL);
//     //}
//   }
// export default ExitLink;
