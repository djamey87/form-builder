"use client";
import { ActionType } from "@/app/api/forms/route";
import { useFormContext } from "react-hook-form";

interface Props {
  questionId: number;
  responseId: number;
  defaultOnly?: boolean;
}

export default function ResponseForm({
  questionId,
  responseId,
  defaultOnly = false,
}: Props) {
  // TODO: default values
  const methods = useFormContext();
  const idPrefix = `questions.${questionId}.responses.${responseId}`;
  const actionType = methods.watch(`${idPrefix}.action.type`, "none");

  return (
    <div className="border mt-20 row">
      {defaultOnly ? null : (
        <>
          <div>
            <label>
              <p>Value</p>
              <input
                type="text"
                placeholder="Value"
                {...methods.register(`${idPrefix}.value`, {
                  required: true,
                })}
              />
            </label>
          </div>

          <div>
            <label>
              <p>Label</p>
              <input
                type="text"
                placeholder="Label"
                {...methods.register(`${idPrefix}.label`, {
                  required: true,
                })}
              />
            </label>
          </div>
        </>
      )}
      <div>
        <p>Action</p>
        <div className="border row">
          <div>
            <label>
              <p>Type</p>
              <select
                placeholder="Action"
                defaultValue="none"
                {...methods.register(`${idPrefix}.action.type`, {
                  required: true,
                })}
              >
                <option value="none" label="please select" disabled />
                {Object.entries(ActionType).map(([_, value]) => (
                  <option
                    key={`type-${value}`}
                    value={value}
                    label={value.toLowerCase()}
                  />
                ))}
              </select>
            </label>
          </div>

          {actionType !== ActionType.SHOW_QUESTION ? null : (
            <div>
              <label>
                <p>Target question</p>
                <input
                  type="text"
                  placeholder="Label"
                  {...methods.register(`${idPrefix}.action.target`, {
                    required: true,
                  })}
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
