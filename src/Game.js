import React from 'react';
import {Button, Container, Icon, Menu, Segment} from 'semantic-ui-react';
import { Question } from './Question';
import { countryAndCapitals } from './capitals';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.state = {
      countryAndCapitals: countryAndCapitals,
      givenAnswer: '',
      showAnswer: false,
      correctCount: 0,
      wrongCount: 0,
      countryAndCapital: {'country': '', 'capital': ''},
      options: []
    };
  }

  checkAnswer(givenAnswer) {
    // console.log('checking answer:', givenAnswer);
    const answer = this.state.countryAndCapital.capital;
    const { correctCount, wrongCount } = this.state;
    let newCorrectCount, newWrongCount;

    if (givenAnswer === answer) {
      newCorrectCount = correctCount + 1;
      newWrongCount = wrongCount;
    } else {
      newWrongCount = wrongCount + 1;
      newCorrectCount = correctCount;
    }

    // answer mode
    this.setState({
      showAnswer: true,
      correctCount: newCorrectCount,
      wrongCount: newWrongCount,
      givenAnswer
    });
  }

  next() {
    const { countryAndCapitals } = this.state;
    const pair = countryAndCapitals[generatePositiveValue(countryAndCapitals.length)];
    const allCapitals = getCapitals(countryAndCapitals).filter((cap) => cap !== pair.capital);
    const wrongAnswers = getNCapitals(allCapitals, 3);
    const options = wrongAnswers.concat(pair.capital);
    const shuffledOptions = shuffle(options);

    // remove selected country from data
    const rest = countryAndCapitals.filter((countryAndCapital) => pair.country !== countryAndCapital.country);
    // new question
    this.setState({
      countryAndCapital: pair,
      options: shuffledOptions,
      showAnswer: false,
      countryAndCapitals: rest
    });
  }

  componentWillMount() {
    this.next();
  }

  render() {
    const { showAnswer, correctCount, wrongCount, givenAnswer } = this.state;

    return (
      <Container fluid
                 textAlign="center"
                 style={{width: 700}} >
        <Menu>
          <Menu.Item
            name="Game"
          />

          <Menu.Item
            name="About"
          />
        </Menu>
        <Question countryAndCapital={this.state.countryAndCapital}
                  options={this.state.options}
                  givenAnswer={givenAnswer}
                  showAnswer={showAnswer}
                  checkAnswer={this.checkAnswer}
        />
        <Segment textAlign="left">
          <Button color='green'
                  content='Correct'
                  icon='check'
                  label={{content: correctCount}}
          />
          <Button color='red'
                  icon='remove'
                  content='Wrong'
                  label={{content: wrongCount}}
          />

          <Button animated
                  color='orange'
                  floated='right'
                  onClick={this.next}
                  disabled={!showAnswer}
          >
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden><Icon name='right arrow'/></Button.Content>
          </Button>
        </Segment>
      </Container>
    )
  }

}

const getCapitals = (data) => {
  // console.log('getting capitals');
  return data.map((pair) => pair.capital);
};

const generatePositiveValue = (upperLimit=1000) => {
  return Math.floor((Math.random() * upperLimit));
};

const getNCapitals = (allCapitals=[], n=3) => {
  const numberOfCapitals = allCapitals.length;
  const nCapitals = [];
  while (nCapitals.length !== n) {
    const aCapital = allCapitals[generatePositiveValue(numberOfCapitals)];
    if (!nCapitals.find((cap) => aCapital === cap)) {
      // console.log('pushing', aCapital);
      nCapitals.push(aCapital);
    } else {
      // console.log('draw same');
    }
  }

  // console.log('returning nCapitals: ' + nCapitals);
  return nCapitals;
};

const shuffle = (arr=[]) => {
  if (arr.length === 0 || arr.length === 1) { return arr;}

  const mutableArr = arr.slice();

  for (let i=0; i<20; i++) {
    const a = generatePositiveValue(arr.length);
    const b = generatePositiveValue(arr.length);
    if (a !== b) {
      const temp = mutableArr[a];
      mutableArr[a] = mutableArr[b];
      mutableArr[b] = temp;
    }
  }
  return mutableArr;
};
