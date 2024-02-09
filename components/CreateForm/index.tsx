"use client";

import { Products } from "@/app/api/products";
import { FormData, GenerateForm } from "@/components/GenerateForm";
import QuestionForm from "@/components/QuestionForm";
import { questionFormToRequestBody } from "@/utils/questions";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

interface Props {
  products: Products;
}

export function CreateForm({ products }: Props) {
  const methods = useForm();
  const { handleSubmit, register, setValue, getValues, formState } = methods;
  const [previewData, setPreviewData] = useState({});
  const { isValid } = formState;

  const [questionCount, setQuestionCount] = useState(0);

  const onPreview = () => {
    const { questions, ...rest } = getValues();

    const questionBody = Object.fromEntries(
      questionFormToRequestBody(questions).map((form) => [form.reference, form])
    );

    const updatedData = { ...rest, questions: questionBody };

    setPreviewData(updatedData);
  };

  const onFormSubmit = handleSubmit(async (data) => {
    const { questions, ...rest } = data;

    console.log("submit", data);

    const questionBody = questionFormToRequestBody(questions);

    console.log("parsed shiz", questionBody);

    // TODO: parse question structure
    fetch("../api/forms", {
      body: JSON.stringify({ ...rest, questions: questionBody }),
      method: "post",
    });
  });

  return (
    <FormProvider {...methods}>
      <div className="row">
        <div>
          <h1>Create a form</h1>

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

            {/* TODO: requires URL encoding */}
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

            <h3>Products</h3>
            <p style={{ fontStyle: "italic" }}>
              Select the products relevant to this questionnaire
            </p>

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

            <div className="mt-20">
              <button
                type="button"
                onClick={() => setQuestionCount(questionCount + 1)}
                disabled={!isValid}
              >
                Add Question
              </button>
            </div>

            <div className="row mt-20">
              <button disabled={!isValid} type="submit">
                Create
              </button>

              <button
                className="ml-20"
                disabled={!isValid}
                onClick={onPreview}
                type="button"
              >
                Preview
              </button>
            </div>
          </form>
        </div>

        <div className="border ml-20">
          <h2>Preview</h2>

          <GenerateForm formData={previewData as FormData} />
        </div>
      </div>
    </FormProvider>
  );
}
