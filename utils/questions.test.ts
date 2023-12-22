import { QuestionType } from "@prisma/client";
import { questionFormToRequestBody } from "./questions";
describe("question utils", () => {
  test("questionFormToRequestBody", () => {
    const mockQuestionData = [
      {
        reference: "Q1",
        text: "What sex were you assigned at birth?",
        type: "SELECT",
        responses: [
          {
            value: "female",
            label: "Female",
            action: {
              type: "SHOW_QUESTION",
              target: "Q1.1",
            },
          },
          {
            value: "male",
            label: "Male",
            action: {
              type: "SHOW_QUESTION",
              target: "Q2",
            },
          },
        ],
      },
      {
        reference: "Q2",
        text: "What is your height",
        type: "TEXT",
        responses: [
          {
            action: {
              type: "SHOW_QUESTION",
              target: "Q3",
            },
          },
        ],
      },
    ];

    const expectedRequestBody = [
      {
        reference: "Q1",
        text: "What sex were you assigned at birth?",
        questionType: QuestionType.SELECT,
        responseValueActions: {
          female: {
            type: "SHOW_QUESTION",
            target: "Q1.1",
          },
        },
        responses: [
          {
            value: "female",
            label: "Female",
          },
          {
            value: "male",
            label: "Male",
          },
        ],
      },
      {
        reference: "Q2",
        text: "What is your height",
        questionType: QuestionType.TEXT,
        responseValueActions: {
          default: {
            type: "SHOW_QUESTION",
            target: "Q3",
          },
        },
      },
    ];

    expect(questionFormToRequestBody(mockQuestionData)).toMatchObject(
      expectedRequestBody
    );
  });
});
