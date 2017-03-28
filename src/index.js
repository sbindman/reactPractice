import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

var listAffirmations = [
    "you are great",
    "you are valued",
    "you are important",
    "your work matters",
    "you are enough",
    "You are so great",
    " You got this ",
    "You are awesome",
    " You CAN do it",
    "You are fantastic",
    " You are worthy",
    "You are wonderful",
    "You are your greatest asset",
    "You are a superstar",
    "You have so much to be proud of",
    "Think about how much you have grown",
    "Don't be too hard on yourself",
    "Failure is part of success" ,
    "Don't sell yourself short",
    "Don't stop, get it get it"
];





var AffirmElement = React.createClass ({
    getInitialState: function() {
        // Start off by selecting the first board
        return {
            selectedIndex: -1
        }
    },
    affirmClick: function(evt) {
        // Here's the meat of the problem. Notice how we can use this.props here (and anywhere else in the component).
        // When this is called, React updates the state and updates the UI to reflect the new render output.
        this.setState({
            selectedIndex: this.state.selectedIndex < (listAffirmations.length - 1) ? this.state.selectedIndex + 1 : 0
        });
    },
    //get text for button
    getAffirmButtonText : function(index) {
        if (index >= 0) {
            return "Another Affirmation!";
        }
        else {
            return "Affirm Me";
        }
    },

    render: function() {

        var boards = [];
        for (var i = 0; i < listAffirmations.length ; i++) {
            // We can compare to state here so we're no longer always selecting the first board.
            var isSelected = i === this.state.selectedIndex;
            boards.push(
                <Board index={i} selected={isSelected} key={i} />
            );
        }


        return (
            <div>
                {/*<div className="boards">{boards}</div>*/}
                <TextDisplay startIndex={this.state.selectedIndex} />

                <button onClick={this.affirmClick} >
                    {this.getAffirmButtonText(this.state.selectedIndex)}
                </button>

                <div>
                    <div className="boards">{boards}</div>
                </div>
            </div>

        );
    }
});


var TextDisplay = React.createClass({

    render: function() {

        return (
            <div className="textDisplay" >
                {listAffirmations[this.props.startIndex]}
            </div>
        );
    }
});

var Board = React.createClass({
    render: function() {
        var className = "board";
        if (this.props.selected) {
            className += " selected";
        }
        return (
            <div className={className}></div>
        );
    }
});

ReactDOM.render(
    <AffirmElement />,
    document.getElementById('textBox')
);

