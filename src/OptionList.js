import React from 'react';
import { Button, List } from 'semantic-ui-react';

export const OptionList = ({ options,
                             checkAnswer,
                             answer,
                             givenAnswer,
                             showAnswer }) => {

  const getButtonColor = (option) =>
    (!showAnswer) ? "blue" :
        (option === answer) ? "green" :
          (option === givenAnswer) ? "red" : "blue";

  return (
    <List>
      {options.map((option, i) =>
        <List.Item key={i}>
          <Button color={getButtonColor(option)}
                  style={{width: 300, fontSize: 20}}
                  disabled={showAnswer}
                  onClick={() => checkAnswer(option)} >
            {option}
          </Button>
        </List.Item>
      )}
    </List>
  );
};

