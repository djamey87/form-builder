"use client";

import { Actions, AssessmentFormData, Question } from "@/app/api/forms/route";
import { useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";

interface Props {
  formData: AssessmentFormData;
}

enum SelectedActions {
  showQuestion = "showQuestion",
  showPrompt = "showPrompt",
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
// [-] only show current question? - might be problematic for returning customers
// [-] on selection understand next action (show question / prompt / block / finish)
export function GenerateForm({ formData }: Props) {
  const [currentQuestionId, setCurrentQuestionId] = useState("Q1");
  const { questions } = formData;
  const question = questions[currentQuestionId];

  const handleSelection = (selectedValue: string = "default") => {
    const [action, target] = determineAction(
      question.selectedActions,
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
      default:
        throw new Error("no action handler implemented");
    }
    // console.log("whats dis?", action, target);
  };

  return (
    <form>
      {Object.values(questions).map(({ id, responses, text }) => {
        return (
          <div
            key={`question-${id}`}
            className={id !== currentQuestionId ? styles.hide : ""}
          >
            <label htmlFor={id}>{`${id}. ${text}`}</label>
            <select
              id={id}
              defaultValue="placeholder"
              onChange={(e) => handleSelection(e.target.value)}
            >
              <option disabled label="Please select" value="placeholder" />
              {Object.values(responses).map(({ label, value }) => {
                return (
                  <option
                    key={`response-${id}-${value}`}
                    value={value}
                    label={label}
                  />
                );
              })}
            </select>
          </div>
        );
      })}
    </form>
  );
}
