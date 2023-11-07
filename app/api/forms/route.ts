export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

enum QuestionType {
  select = "select",
}
interface Response {
  value: string;
  label: string;
  onSelect?: { linkId: string };
}
export interface Actions {
  [key: string]: string; // TODO: type substring here
}

export interface Question {
  id: string;
  reference: string;
  text: string;
  selectedActions: Actions;
  questionType: QuestionType.select;
  responses: Response[];
}
export interface AssessmentFormData {
  metadata: {
    version: string;
    name: string;
  };
  prompts?: {};
  questions: {
    [key: string]: Question;
  };
}

// Dummy data
const formData: AssessmentFormData[] = [
  {
    metadata: {
      version: "1.0.0",
      // name: "wegovy-assessment",
      name: "assessment",
    },
    questions: {
      Q1: {
        id: "Q1",
        reference: "",
        text: "What sex were you assigned at birth?",
        questionType: QuestionType.select,
        selectedActions: {
          default: "showQuestion:Q1.1",
        },
        responses: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      "Q1.1": {
        id: "Q1.1",
        reference: "",
        text: "Are you pregnant, breastfeeding or trying to conceive (now or in the near future)?",
        questionType: QuestionType.select,
        selectedActions: {
          none: "showQuestion:Q2",
          pregnant: "block",
          breastfeeding: "block",
          conceive: "block",
        },
        responses: [
          { value: "pregnant", label: "Yes, I'm currently pregnant" },
          { value: "breastfeeding", label: "Yes, I'm currently breastfeeding" },
          { value: "conceive", label: "Yes, I'm trying to conceive" },
          { value: "none", label: "No, none of the above" },
        ],
      },
      Q2: {
        id: "Q2",
        reference: "",
        text: "Are you aged between 18 - 74?",
        questionType: QuestionType.select,
        selectedActions: {
          yes: "showQuestion:Q3",
          no: "block",
        },
        responses: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    },
  },
];

export async function GET() {
  return NextResponse.json(formData);
}
