"use client";

import { ActionType, Actions } from "@/app/api/forms/route";
import { useState } from "react";
import styles from "./index.module.css";
import { Form, Question, QuestionType, Response } from "@prisma/client";

type QuestionData = Question & { responses: Response[] };

export type FormData = Form & {
  questions: { [key: string]: QuestionData };
};

interface Props {
  formData: FormData;
  onComplete: () => void;
}

function determineAction(
  actions: Actions,
  selectedValue: string
): [ActionType, string] {
  // TODO: determine which value action to select: "default" or other values
  // NOTE: key could be an delimitted string?
  // TODO: form builder should provide default actions
  let foundAction = actions[selectedValue] || actions["default"];
  if (!foundAction) {
    throw new Error("No action found for selected value " + selectedValue);
  }
  // TODO: understand action
  const { type, target } = foundAction;

  return [type, target];
}

// TODO:
// [-] track question history
// [x] only show current question? - might be problematic for returning customers
// [-] track state via url - will help with GA tracking (or by section)
// [x] on selection understand next action (show question / prompt / block / finish)
// [-] utilise form state management, for easier submission parsing?
// [-] trigger product selector
export function GenerateForm({ formData, onComplete }: Props) {
  // TODO: ensure the format of the id's are consistent
  const [currentQuestionId, setCurrentQuestionId] = useState("Q1");
  const { questions } = formData;

  if (!questions) {
    return <p>Please add question information</p>;
  }

  const question = questions[currentQuestionId];

  if (!question) {
    console.log(questions);
    console.warn("no question data found for " + currentQuestionId);
  }

  const handleSelection = (selectedValue: string = "default") => {
    const [action, target] = determineAction(
      question.responseValueActions,
      selectedValue
    );

    console.log(":handleSelection:", action);

    switch (action) {
      case ActionType.SHOW_QUESTION:
        return setCurrentQuestionId(target);
      case ActionType.BLOCK:
        // TODO: should still be able to continue the questionnaire
        return alert("You shall not pass! - user blocked");
      case ActionType.HIGHLIGHT:
        // TODO: highlight shiz & get next question
        // setCurrentQuestionId(target);
        return console.warn("HIGHLIGHT INFO NEEDED");
      case ActionType.COMPLETE:
        console.log("form completed");
        // TODO:
        // - show the product selector
        // - pass the response selection?
        return onComplete();
      default:
        throw new Error("no action handler implemented");
    }
  };

  return (
    <form>
      {Object.values(questions).map(({ reference, text, ...rest }) => {
        return (
          <div
            key={`question-${reference}`}
            className={reference !== currentQuestionId ? styles.hide : ""}
          >
            <label htmlFor={reference}>{`${reference}. ${text}`}</label>

            {rest.questionType === QuestionType.SELECT && (
              <select
                id={reference}
                defaultValue="placeholder"
                onChange={(e) => handleSelection(e.target.value)}
                required
              >
                <option disabled label="Please select" value="placeholder" />
                {Object.values(rest.responses).map(({ label, value }) => {
                  return (
                    <option
                      key={`response-${reference}-${value}`}
                      value={value}
                      label={label}
                    />
                  );
                })}
              </select>
            )}

            {rest.questionType === QuestionType.TEXT && (
              <div>
                <input required type="text" id={reference} minLength={3} />
                <button type="button" onClick={() => handleSelection()}>
                  OK
                </button>
              </div>
            )}
          </div>
        );
      })}
    </form>
  );
}
