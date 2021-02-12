import React from 'react';
// import "./Home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Home extends React.Component {
	render() {
	return (
      <div>
       {/*} <h2>HELLO</h2>
        <p>Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue
        nec molestie. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.</p>
 
        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>*/}



        <article id="46057f4b-17ee-46f5-8e89-a98247a098a6" className="page sans"><header><h1 className="page-title">Eddie</h1></header><div className="page-body"><hr id="45d55afa-c0f4-47fd-ab3d-efb02b93192e"/><p id="bbfc7707-0b2d-4e04-9fd7-bea897193234" className="">EDDIE is a chatbot that generates jokes based on a user given keyword. </p><p id="0b704a0a-647f-43a7-95ba-489ff4fe858c" className="">This chatbot was developed with the purpose of increasing the existing amount of available jokes and also help improve the mental health of college students by providing an interactive joke generator.</p><p id="f49b8023-fcd4-472e-bfba-96a414cd0db6" className="">Eddie uses two separate models to make provide the joke: The generator model and the Retrieval model. The generator model uses our own algorithm to generate the joke from the keywords. The retrieval model retrieves the best joke that relates closest to the keyword inputted.</p><p id="1cab3073-1ea9-40a6-85b1-9b618b116efb" className="">Joke candidates and keywords first go through a toxicity filter in order to maximize user experience. </p><p id="a3ec9573-cbcc-40fd-b906-012409d746fd" className="">Afterward, several joke candidates are generated and our joke classifier picks the best to display.</p></div></article>

        <Link to="/bot">
            <button type="button">
                  Click Me!
            </button>
        </Link>
      </div>
    );
    }
}

export default Home;