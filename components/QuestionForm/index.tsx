"use client";
import { useFormContext } from "react-hook-form";
// import { prisma } from "@/lib/prisma";
import { QuestionType } from "@prisma/client";

interface Props {
  id: number;
}

export default function QuestionForm({ id }: Props) {
  // TODO: default values
  const methods = useFormContext();

  const { formState, watch } = methods;
  const { isValid } = formState;
  const idPrefix = `question.${id}`;

  const questionType = watch(`${idPrefix}.type`, "none");

  console.log("value", questionType);

  return (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <label>
          ID
          <input
            type="text"
            placeholder="ID"
            {...methods.register(`${idPrefix}.id`, {
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
            {/* <option value="select" label="Select" />
            <option value="text" label="Text" /> */}
          </select>
        </label>
      </div>

      {/* TODO: if "select" then show response form */}
      {questionType !== QuestionType.SELECT ? null : (
        <div className="margin-top-20 border">
          <h4>Responses</h4>
        </div>
      )}
    </div>
  );
}
