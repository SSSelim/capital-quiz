import React from 'react';
import { OptionList } from './OptionList';
import { Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const Question = ({ options,
                           countryAndCapital,
                           givenAnswer,
                           checkAnswer,
                           showAnswer }) => {

    return (
      <Segment textAlign="center">
        <Message info
                 style={{fontSize: 25}} >
          Where is the capital of {countryAndCapital.country}?
        </Message>
        <OptionList options={options}
                    checkAnswer={checkAnswer}
                    answer={countryAndCapital.capital}
                    givenAnswer={givenAnswer}
                    showAnswer={showAnswer}/>
      </Segment>
    )
};

Question.propTypes = {
  options: PropTypes.array.isRequired,
  givenAnswer: PropTypes.string.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  countryAndCapital: (props, propName) =>
    (typeof props[propName] !== 'object') ?
      new Error('CountryAndCapital should be an object') :
      (!props[propName].capital) ?
        new Error('CountryAndCapital should have capital property') :
        (!props[propName].country) ?
          new Error('CountryAndCapital should have country property') :
          null
};

Question.defaultProps = {
  options: ['option 1', 'option 2', 'option 3', 'option 4'],
  countryAndCapital: { 'country': 'default country', 'capital': 'default capital'},
  givenAnswer: '',
  checkAnswer: fn => fn,
  showAnswer: false
};
