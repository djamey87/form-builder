"use client";
import QuestionForm from "@/components/QuestionForm";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

export default function Page() {
  // TODO: default values
  const methods = useForm();
  const { handleSubmit, register, setValue, getValues, formState } = methods;
  const { isValid } = formState;

  const [questionCount, setQuestionCount] = useState(0);

  const onFormSubmit = handleSubmit(async (data) => {
    const { name, version, slug } = data;

    // fetch("../api/forms", {
    //   body: JSON.stringify(data),
    //   method: "post",
    // });

    console.log("submit", data);
  });

  return (
    <div>
      <h1>Create a form</h1>

      <FormProvider {...methods}>
        <form onSubmit={onFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="name"
              {...register("name", {
                required: true,
                maxLength: 50,
              })}
              onChange={(e) => {
                let slug = `${e.target.value.toLowerCase()}-v${getValues(
                  "version"
                )}`;
                setValue("slug", slug);
              }}
            />
          </div>

          {/* TODO: this should be auto-incremented if updated */}
          <div>
            <label htmlFor="version">Version</label>
            <input
              type="text"
              placeholder="version"
              defaultValue="1"
              readOnly
              {...register("version", {
                value: "1",
                required: true,
                maxLength: 10,
              })}
            />
          </div>

          <div>
            <label htmlFor="slug">Slug</label>
            <input
              readOnly
              {...register("slug", {
                required: true,
                maxLength: 60,
              })}
            ></input>
          </div>

          <h3>Questions</h3>
          {questionCount === 0 ? (
            <p>No questions added</p>
          ) : (
            Array(questionCount)
              .fill(0)
              .map((_, index) => (
                <QuestionForm key={`question-form-${index}`} id={index} />
              ))
          )}

          <div>
            <button
              type="button"
              onClick={() => setQuestionCount(questionCount + 1)}
              disabled={!isValid}
            >
              Add Question
            </button>
          </div>

          <div>
            <button disabled={!isValid} type="submit">
              Create
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
