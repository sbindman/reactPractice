import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

//creating a square component
class Square extends React.Component {

    render() {
        return (
            //onclick event is passed to the square from 2 parents up
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {

    renderSquare(i) {
        //onclick event is tied to a specific square
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }
    render() {
        const status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    handleClick(squareI) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[squareI]) {
            return;
        }
        squares[squareI] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            squares : squares,
            xIsNext : !this.state.xIsNext
        });
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} xIsNext={this.state.xIsNext} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}



class Circle extends React.Component {

    render() {
        return (
            <span className={"circle " + this.props.fillClass} onClick={() => this.props.onClick()}>
            </span>
        );
    }
}


class StreetButton extends React.Component {

    render() {
        var label = this.props.pedX ? "Ped Xing" : "No Ped Xing";
        return (
            //onclick events must be tied to HTML elements not react components
            <button className="streetButton" onClick={() => this.props.onClick()}  >
                {label}
            </button>
        );
    }
}



class StopLight extends React.Component {

    renderCircle(i, fillClass) {
        return <Circle value={i} fillClass={fillClass} onClick={() => this.props.onClick()}/>;
    }
    render() {
        var fillRed = this.props.pedX ? 'red' : '';
        var fillGreen = this.props.pedX ? '' : 'green';

        return (
            <div>
                <div className="board-row">
                    {/*red*/}
                    {this.renderCircle(0, fillRed)}
                    {/*green*/}
                    {this.renderCircle(1, fillGreen)}
                </div>
            </div>
        );
    }
}

class Intersection extends React.Component {

    constructor() {
        super();
        this.state = {
            pedX: false
        };
    }
    handleClick() {
        this.setState({
            pedX : !this.state.pedX
        });
    }
    render() {
        return (
            <div>
                <StopLight pedX={this.state.pedX} onClick={() => this.handleClick()}/>
                <StreetButton pedX={this.state.pedX} onClick={() => this.handleClick()}/>
            </div>
        );
    }
}




// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('container')
);


ReactDOM.render(
    <Intersection />,
    document.getElementById('stop-light')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
