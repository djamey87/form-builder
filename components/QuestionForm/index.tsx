"use client";
import { useFormContext } from "react-hook-form";
// import { prisma } from "@/lib/prisma";
import { QuestionType } from "@prisma/client";
import { useState } from "react";
import ResponseForm from "../ResponseForm";

interface Props {
  id: number;
}

export default function QuestionForm({ id }: Props) {
  // TODO: default values
  const methods = useFormContext();

  const { watch } = methods;
  const idPrefix = `questions.${id}`;

  const questionType = watch(`${idPrefix}.type`, "none");

  const [responseCount, setResponseCount] = useState(1);

  return (
    <div className="border margin-top-20">
      <div>
        <label>
          Reference
          <input
            type="text"
            placeholder="Q1.1"
            {...methods.register(`${idPrefix}.reference`, {
              required: true,
            })}
          />
        </label>
      </div>

      <div>
        <label>
          Question text
          <input
            type="text"
            placeholder="Question text"
            {...methods.register(`${idPrefix}.text`, {
              required: true,
            })}
          />
        </label>
      </div>

      <div>
        <label>
          Question type
          <select
            placeholder="Question type"
            defaultValue="none"
            {...methods.register(`${idPrefix}.type`, {
              required: true,
            })}
          >
            <option value="none" label="please select" disabled />
            {Object.entries(QuestionType).map(([_, value]) => (
              <option
                key={`type-${value}`}
                value={value}
                label={value.toLowerCase()}
              />
            ))}
          </select>
        </label>
      </div>

      {/* TODO: if "select" then show response form */}
      {questionType !== QuestionType.SELECT ? (
        <ResponseForm questionId={id} responseId={0} defaultOnly />
      ) : (
        <div className="margin-top-20 border">
          <p>Responses:</p>
          {responseCount === 0 ? (
            <p>No questions added</p>
          ) : (
            Array(responseCount)
              .fill(0)
              .map((_, index) => (
                <ResponseForm
                  key={`response-form-${index}`}
                  questionId={id}
                  responseId={index}
                />
              ))
          )}
          <button
            type="button"
            onClick={() => setResponseCount(responseCount + 1)}
          >
            Add a response
          </button>
        </div>
      )}
    </div>
  );
}
