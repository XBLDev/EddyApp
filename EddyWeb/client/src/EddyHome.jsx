import React, { Component } from 'react';
import ReactBodymovin from 'react-bodymovin'



// import Task from './Task.jsx';
// import animation_LottieLogo1 from './LottieLogo1.json'
// import animation_LottieLogo2 from './LottieLogo2.json'
// import animation_LineAnimation from './LineAnimation.json'
// import animation_LottieWalkthrough from './LottieWalkthrough.json'
// import animation_MotionCorpse from './MotionCorpse-Jrcanest.json'
// import animation_PinJump from './PinJump.json'
// import animation_TwitterHeart from './TwitterHeart.json'
// import animation_Watermelon from './Watermelon.json'

// import Nike_Logo from './Nike Logo.json'
// import Car_Accident from './Group 1 Image 1 Car Accident.json'
// import Hospital_Bed from './Group 1 Image 2 Hospital Bed.json'
// import Fat_Man_Walking from './Group 1 Image 4 Fat Man Walking.json'
// import Smoke_Scene from './Group 1 Image 4 Smoke scene.json'
// import Train_Scene from './Group 1 Image 4 Train Scene.json'
// import Batteries from './Group 1 Image 6 Batteries .json'

// import CapeMoving from './Group 1 Image 8 Cape Moving.json'
// import SneakingAround from './Group 1 Image 9 Sneaking around .json'
// import Binoculars from './Group 1 Image 12 Binoculars.json'
// import JumpingToEachStep from './Group 2 Image 1 Jumping to each step.json'
// import BalancingAtTheDoor from './Group 2 Image 2 Balancing at the door.json'
// import LightingAndClogs from './Group 2 Image 5 Lighting and Clogs.json'
// import EddyAtDesk from './Group 2 Image 7 Eddy at Desk.json'
// import Confetti from './Group 2 Image 8 Confetti.json'

// import UFO2 from './Group 2 Image 13 UFO 2.json'
// import ShootingStar from './Group 2 Image 14 Shooting Star.json'
// import HeadsPopping from './Group 2 Image 15 Heads Popping.json'


// import Task from './Task.jsx';
// import animation_LottieLogo1 from './LottieLogo1.json'
import animation_LottieLogo1 from '../../server/static/animations/LottieLogo1.json'
import animation_LottieLogo2 from '../../server/static/animations/LottieLogo2.json'
import animation_LineAnimation from '../../server/static/animations/LineAnimation.json'
import animation_LottieWalkthrough from '../../server/static/animations/LottieWalkthrough.json'
import animation_MotionCorpse from '../../server/static/animations/MotionCorpse-Jrcanest.json'
import animation_PinJump from '../../server/static/animations/PinJump.json'
import animation_TwitterHeart from '../../server/static/animations/TwitterHeart.json'
import animation_Watermelon from '../../server/static/animations/Watermelon.json'

// import Nike_Logo from './Nike Logo.json'
// import Car_Accident from './Group 1 Image 1 Car Accident.json'
// import Hospital_Bed from './Group 1 Image 2 Hospital Bed.json'
// import Fat_Man_Walking from './Group 1 Image 4 Fat Man Walking.json'
// import Smoke_Scene from './Group 1 Image 4 Smoke scene.json'
// import Train_Scene from './Group 1 Image 4 Train Scene.json'
// import Batteries from './Group 1 Image 6 Batteries .json'

import Nike_Logo from '../../server/static/animations/Nike Logo.json'
import Car_Accident from '../../server/static/animations/Group 1 Image 1 Car Accident.json'
import Hospital_Bed from '../../server/static/animations/Group 1 Image 2 Hospital Bed.json'
import Fat_Man_Walking from '../../server/static/animations/Group 1 Image 4 Fat Man Walking.json'
import Smoke_Scene from '../../server/static/animations/Group 1 Image 4 Smoke scene.json'
import Train_Scene from '../../server/static/animations/Group 1 Image 4 Train Scene.json'
import Batteries from '../../server/static/animations/Group 1 Image 6 Batteries .json'


const bodymovin = require('bodymovin/build/player/bodymovin_light')


function Welcome(props) {

  let result = props.stateNum == props.targetNum? 
  <div className="animationContainer">
        <ReactBodymovin options=
            {
              { 
              rendererSettings:{preserveAspectRatio:  'xMidYMid meet'}, 
              // container: document.getElementById("acontainer".concat(props.targetNum)), 
              renderer: 'svg', 
              loop: true, 
              autoplay: true, 
              prerender: true, 
              animationData: props.CAN
              }
            }
        /> 
  </div> 
  : 
  <div></div>
  
  return result;


// this.state.pageNum == 2 ? 
//     <div><ReactBodymovin options={{loop: true, autoplay: true, prerender: true, animationData: this.namesOfAnimation[this.state.pageNum]}} /> </div>:
//     <div></div>   

}

function StoryAnimations(props)
{
    var indents = [];
    for (var i = 0; i < props.numberOfAnimations; i++) {
      // indents.push(<span className='indent' key={i}></span>);
      indents.push(<Welcome stateNum={props.pageNum} targetNum={i} CAN={props.CAN}/>);
    }   
    return indents;
    // var indents = [];
    // for (var i = 0; i < this.numberOfAnimations; i++) {
    //   // indents.push(<span className='indent' key={i}></span>);
    //   indents.push(<Welcome stateNum={this.state.pageNum} targetNum={i} CAN={this.namesOfAnimation[this.state.pageNum]}/>);
    // }


}

// App component - represents the whole app
class EddyHome extends Component {


  constructor(props) {
  super(props);

  // testAnimation = bodymovin.loadAnimation({
  //   container: container, // the dom element that will contain the animation
  //   renderer: 'svg',
  //   loop: true,
  //   autoplay: true,
  //   path: './LottieLogo1.json' // the path to the animation json
  // });


  this.state = {
    NumberOfStories: 0,
    listOfStoryURLS: [],
    pageNum: 0,
    clicked: false,
    // currentAnimationName: animation_LottieLogo1,
    // currentAnimationDIV: <ReactBodymovin options={{loop: true, autoplay: true, prerender: true, animationData: animation_LottieLogo1}} />,

  };

  this.namesOfAnimation = {
    //  '0': animation_LottieLogo1,
    //  '1': animation_LottieLogo2,
    //  '2': animation_LineAnimation,

    //  '3': animation_LottieWalkthrough,
    //  '4': animation_MotionCorpse,
    //  '5': animation_PinJump,
    //  '6': animation_TwitterHeart,
    //  '7': animation_Watermelon,

     '0': Train_Scene, //Nike_Logo   
     '1': Hospital_Bed,
     '2': Hospital_Bed,

     '3': Hospital_Bed,
     '4': Smoke_Scene,
     '5': Nike_Logo,
     '6': Batteries,
    //  '7': animation_Watermelon,   


    //  '0': Nike_Logo,    
    //  '1': Car_Accident,//NOT WORKING
    //  '2': Hospital_Bed,

    //  '3': Fat_Man_Walking,//NOT WORKING, ERROR: EffectsManager is not defined
    //  '4': Smoke_Scene,
    //  '5': Train_Scene,
    //  '6': Batteries,


    }

  this.targetNums = {
     '0': 0,
     '1': 1,
     '2': 2,

     '3': 3,
     '4': 4,
     '5': 5,
     '6': 6,
    //  '7': 7,
    }

  this.numberOfAnimations = 7;//8
  this.handleClick = this.handleClick.bind(this);
  this.handleClickBottomButton = this.handleClickBottomButton.bind(this);

  this.returnCurrentAnimation = this.returnCurrentAnimation.bind(this);
}

  componentDidMount () {
// animation = bodymovin.loadAnimation({
//   container: bm,//document.getElementById('render-target'),
//   renderer: 'svg',
//   loop: true,
//   autoplay: true,
//   path: './LottieLogo1.json'
// })


const xhr = new XMLHttpRequest();
    xhr.open('get', '/EddyStories/EddyStories');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
        // console.log('Right Side Menu Got GET /NEWS');
        this.setState({
          NumberOfStories: xhr.response.message
        });
        this.setState({
          listOfStoryURLS: xhr.response.listOfStoryURLS
        });
        // console.log('RightSideMenu, recieved list of news upon Mounting:')
        console.log(this.state.NumberOfStories)
        // console.log(this.state.listOfStoryURLS[0]['storyFileUrls'])
        console.log(this.state.listOfStoryURLS)

    }
    });
    xhr.send();    




  }

componentDidUpdate()
{
  // alert("clicked" + this.state.pageNum.toString())
}

returnCurrentAnimation(props)
{
  return <h1>Hello, {props.name}</h1>;
}

  handleClick() {
    // alert("clicked")
    if(this.state.pageNum + 1 == 7)
    {
      this.setState({pageNum: 0});
    }
    else
    {
      this.setState({pageNum: this.state.pageNum + 1});
    }
    // this.setState({currentAnimationName: animation_LottieLogo2});
    // this.setState({currentAnimationDIV: <ReactBodymovin options={{loop: true, autoplay: true, prerender: true, animationData: animation_LottieLogo2}} />});

    // alert("clicked" + this.state.pageNum)
            // this.setState({ example: Object.keys(EXAMPLES)[this.pageNum] });//, this.cycleAnimation()
  }
  handleClickBottomButton()
  {
    //   var randomAnimationNum = Math.floor(Math.random() * (7 - 0 + 1) + 0);
            var randomAnimationNum = Math.floor(Math.random() * (6 - 0 + 1) + 0);

      this.setState({pageNum: randomAnimationNum});

  }

//  imgurl = 'https://previews.123rf.com/images/venimo/venimo1501/venimo150100067/35963137-Vector-online-education-concept-in-flat-style-hand-holding-mobile-phone-with-educational-app-in-the--Stock-Vector.jpg'; 
 
//  bodymovinOptions = {
//     loop: false,
//     autoplay: true,
//     prerender: true,
//     animationData: animation_LottieLogo1
    
//   };
//  divStyle = {
//   // color: 'blue',
//   backgroundImage: 'url(' + this.imgurl + ')',
//   backgroundSize: 'cover',
//   backgroundColor: 'blue',

//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
// };

// ReactBodymovinStyle ={
//   backgroundColor: 'red',
// }

  render() {

    var indents = [];
    for (var i = 0; i < this.numberOfAnimations; i++) {
      // indents.push(<span className='indent' key={i}></span>);
      indents.push(<Welcome key={i} stateNum={this.state.pageNum} targetNum={i} CAN={this.namesOfAnimation[this.state.pageNum]}/>);
    }
    // let currentAnimation =  this.state.pageNum == 0 ? 
    // <div><ReactBodymovin options={{loop: true, autoplay: true, prerender: true, animationData: animation_LottieLogo1}} /> </div>: 
    // <div><ReactBodymovin options={{loop: true, autoplay: true, prerender: true, animationData: animation_LottieLogo2}} /></div>


    

    // let currentStateNum = this.state.pageNum
    // let currentCAN =  this.namesOfAnimation[this.state.pageNum]


    return (
        <div className="outerMostContainer">
            {/*<header style={{textAlign: 'center', height: '5vh', fontSize: '20px', backgroundColor:'rgba(0, 102, 102,0.9)'
                          ,color:'white', fontWeight: 'bold', verticalAlign: 'middle', textAlignVertical: 'middle'}}>
              
              EDDY: YOUR MOBILE UNIVERSITY, COMING SOON
              
            </header> */}

            <div className="headerElements">
              {/* <h1> */}
              EDDY: YOUR MOBILE UNIVERSITY, COMING SOON, CURRENT NUMBER OF STORIES: {this.state.NumberOfStories}
              {/* </h1> */}
            </div>

            <div className="container">
                <div className="innerContainer" onClick={this.handleClick}>
                      
                          {
                            indents
                          }    

                       
                </div>

            </div>

            {/* <div className="buttonGroup" >
                <button className="optionButton" onClick={this.handleClickBottomButton}>option1</button>
                <button className="optionButton" onClick={this.handleClickBottomButton}>option2</button>
                <button className="optionButton" onClick={this.handleClickBottomButton}>option3</button>
             </div> */}

    
             <div className="BottomButtons">
                  <a href="" className="bottomButton">About Us</a>
                  <a href="" className="bottomButton">Contact Us</a>
                  <a href="" className="bottomButton">Team</a>
                  <a href="" className="bottomButton">Facebook</a>
             </div>   
         </div> 
              
        
            
          



        
       
    );
  }
}

export default EddyHome;