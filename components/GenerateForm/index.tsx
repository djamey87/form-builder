"use client";

import {
  Actions,
  // AssessmentFormData,
  // Question,
  // QuestionType,
} from "@/app/api/forms/route";
import { useState } from "react";
import styles from "./index.module.css";
import { Form, Question, QuestionType } from "@prisma/client";

type FormData = Form & {
  questions: { [key: string]: Question };
};

interface Props {
  formData: FormData;
}

enum SelectedActions {
  showQuestion = "showQuestion",
  showPrompt = "showPrompt",
  highlight = "highlight",
  block = "block",
}

function determineAction(
  actions: Actions,
  selectedValue: string
): [SelectedActions, string] {
  // TODO: determine which value action to select: "default" or other values
  // NOTE: key could be an delimitted string?
  let foundAction = actions[selectedValue] || actions["default"];
  if (!foundAction) {
    throw new Error("No action found for selected value " + selectedValue);
  }
  // TODO: understand action
  const [rawAction, target] = foundAction.split(":");
  const action = rawAction as SelectedActions;

  return [action, target];
}

// TODO:
// [-] track question history
// [x] only show current question? - might be problematic for returning customers
// [-] track state via url - will help with GA tracking (or by section)
// [-] on selection understand next action (show question / prompt / block / finish)
export function GenerateForm({ formData }: Props) {
  const [currentQuestionId, setCurrentQuestionId] = useState("Q1");
  // const { questions, gpHighlights } = formData;
  const { questions } = formData;
  // const questionsMap = new Set(questions);
  const question = questions[currentQuestionId];

  if (!question) {
    alert("no question data found for " + currentQuestionId);
  }

  const handleSelection = (selectedValue: string = "default") => {
    const [action, target] = determineAction(
      question.responseValueActions,
      selectedValue
    );

    switch (action) {
      case SelectedActions.showQuestion:
        setCurrentQuestionId(target);
        break;
      case SelectedActions.block:
        alert("You shall not pass! - user blocked");
        // reset form?
        break;
      case SelectedActions.highlight:
        console.warn("");
      // TODO: highlight shiz & get next question
      // setCurrentQuestionId(target);
      default:
        throw new Error("no action handler implemented");
    }
  };

  return (
    <form>
      {Object.values(questions).map(({ id, text, ...rest }) => {
        return (
          <div
            key={`question-${id}`}
            className={id !== currentQuestionId ? styles.hide : ""}
          >
            <label htmlFor={id}>{`${id}. ${text}`}</label>

            {rest.questionType === QuestionType.SELECT && (
              <select
                id={id}
                defaultValue="placeholder"
                onChange={(e) => handleSelection(e.target.value)}
                required
              >
                <option disabled label="Please select" value="placeholder" />
                {Object.values(rest.responses).map(({ label, value }) => {
                  return (
                    <option
                      key={`response-${id}-${value}`}
                      value={value}
                      label={label}
                    />
                  );
                })}
              </select>
            )}

            {rest.questionType === QuestionType.TEXT && (
              <div>
                <input required type="text" id={id} minLength={3} />
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
