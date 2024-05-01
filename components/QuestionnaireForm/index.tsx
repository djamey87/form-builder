"use client";

import { Product } from "@/app/api/products";
import { FormData } from "@/components/GenerateForm";
import QuestionForm from "@/components/QuestionForm";
import {
  questionFormToRequestBody,
  ruleFormToRequestBody,
} from "@/utils/questions";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RuleForm from "../RuleForm";
import { Questionnaire } from "../Questionnaire";

interface Props {
  products: Product[];
}

export function QuestionnaireForm({ products }: Props) {
  const methods = useForm();
  const { handleSubmit, register, setValue, getValues, formState } = methods;
  const [showRulesPage, setShowRulesPage] = useState(false);

  const [previewData, setPreviewData] = useState({});
  const { isValid } = formState;

  const [questionCount, setQuestionCount] = useState(0);
  const [ruleCount, setRuleCount] = useState(0);

  const onPreview = () => {
    const { questions, rules, ...rest } = getValues();

    const questionBody = Object.fromEntries(
      questionFormToRequestBody(questions).map((form) => [form.reference, form])
    );

    ruleFormToRequestBody(rules);

    const updatedData = { ...rest, questions: questionBody };

    setPreviewData(updatedData);
  };

  const onSaveQuestions = handleSubmit(async (data) => {
    // const { questions, ...rest } = data;

    // const questionBody = questionFormToRequestBody(questions);
    onPreview();
    setShowRulesPage(true);
    console.log(showRulesPage);
  });

  const onFormSubmit = handleSubmit(async (data) => {
    // const { questions, ...rest } = data;
    // console.log("submit", data);
    // const questionBody = questionFormToRequestBody(questions);
    // console.log("parsed shiz", questionBody);
    // // TODO: parse question structure
    // fetch("../api/forms", {
    //   body: JSON.stringify({ ...rest, questions: questionBody }),
    //   method: "post",
    // });
  });

  return (
    <FormProvider {...methods}>
      <div className="row">
        <div>
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

            {!showRulesPage ? (
              <>
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
              </>
            ) : (
              <>
                <h3>Product Selection Rules</h3>
                {Array(ruleCount)
                  .fill(0)
                  .map((_, index) => (
                    <RuleForm
                      key={`rule-form-${index}`}
                      id={index}
                      products={products}
                    />
                  ))}
                <div className="mt-20">
                  <button
                    type="button"
                    onClick={() => setRuleCount(ruleCount + 1)}
                    disabled={!isValid}
                  >
                    Add Rule
                  </button>
                </div>
              </>
            )}

            <div className="row mt-20">
              {!showRulesPage ? (
                <button
                  disabled={!isValid}
                  type="button"
                  onClick={() => onSaveQuestions()}
                >
                  Next
                </button>
              ) : (
                <button disabled={!isValid} type="submit">
                  Create
                </button>
              )}

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
          <Questionnaire title="Preview" formData={previewData as FormData} />
        </div>
      </div>
    </FormProvider>
  );
}
