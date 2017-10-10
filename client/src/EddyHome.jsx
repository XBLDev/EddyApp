import React, { Component } from 'react';
import ReactBodymovin from 'react-bodymovin'

// import Task from './Task.jsx';
import animation_LottieLogo1 from './LottieLogo1.json'
import animation_LottieLogo2 from './LottieLogo2.json'
import animation_LineAnimation from './LineAnimation.json'
import animation_LottieWalkthrough from './LottieWalkthrough.json'
import animation_MotionCorpse from './MotionCorpse-Jrcanest.json'
import animation_PinJump from './PinJump.json'
import animation_TwitterHeart from './TwitterHeart.json'
import animation_Watermelon from './Watermelon.json'

import Nike_Logo from './Nike Logo.json'
import Car_Accident from './Group 1 Image 1 Car Accident.json'
import Hospital_Bed from './Group 1 Image 2 Hospital Bed.json'
import Fat_Man_Walking from './Group 1 Image 4 Fat Man Walking.json'
import Smoke_Scene from './Group 1 Image 4 Smoke scene.json'
import Train_Scene from './Group 1 Image 4 Train Scene.json'
import Batteries from './Group 1 Image 6 Batteries .json'



const bodymovin = require('bodymovin/build/player/bodymovin_light')


function Welcome(props) {

  let result = props.stateNum == props.targetNum? 
  <div><ReactBodymovin options={{loop: true, autoplay: true, prerender: true, animationData: props.CAN}} /> </div> : 
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

     '0': Nike_Logo,    
     '1': Hospital_Bed,
     '2': Hospital_Bed,

     '3': Hospital_Bed,
     '4': Smoke_Scene,
     '5': Train_Scene,
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
              <h1>
              EDDY: YOUR MOBILE UNIVERSITY, COMING SOON
              </h1>
            </div>

            <div className="container">
                <div id="bm" className="innterContainer" onClick={this.handleClick}>
                      
                          {/*{<StoryAnimations numberOfAnimations={this.numberOfAnimations} pageNum={this.state.pageNum} CAN={this.namesOfAnimation[this.state.pageNum]}/>}*/}
                          {indents}
                          {/*<Welcome stateNum={this.state.pageNum} targetNum={0} CAN={this.namesOfAnimation[this.state.pageNum]}/>
                          <Welcome stateNum={this.state.pageNum} targetNum={1} CAN={this.namesOfAnimation[this.state.pageNum]}/>
                          <Welcome stateNum={this.state.pageNum} targetNum={2} CAN={this.namesOfAnimation[this.state.pageNum]}/>
                          <Welcome stateNum={this.state.pageNum} targetNum={3} CAN={this.namesOfAnimation[this.state.pageNum]}/>
                          <Welcome stateNum={this.state.pageNum} targetNum={4} CAN={this.namesOfAnimation[this.state.pageNum]}/>
                          <Welcome stateNum={this.state.pageNum} targetNum={5} CAN={this.namesOfAnimation[this.state.pageNum]}/>
                          <Welcome stateNum={this.state.pageNum} targetNum={6} CAN={this.namesOfAnimation[this.state.pageNum]}/>
                          <Welcome stateNum={this.state.pageNum} targetNum={7} CAN={this.namesOfAnimation[this.state.pageNum]}/>*/}

                       
                </div>

            </div>

            <div className="buttonGroup" >
                <button className="optionButton" onClick={this.handleClickBottomButton}>option1</button>
                <button className="optionButton" onClick={this.handleClickBottomButton}>option2</button>
                <button className="optionButton" onClick={this.handleClickBottomButton}>option3</button>
             </div>

    
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