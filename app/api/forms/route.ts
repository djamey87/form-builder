export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export enum QuestionType { // DONE
  select = "select",
  textArea = "textArea",
  text = "text",
}
interface Response {
  value: string;
  label: string;
}
export interface Actions {
  [key: string]: string; // TODO: type substring here
}

interface GPHighlight {
  id: string;
  text: string;
  action: string;
}
interface SelectQuestion {
  id: string;
  reference: string;
  text: string;
  responseValueActions: Actions;
  questionType: QuestionType.select;
  responses: Response[];
}

interface TextQuestion {
  id: string;
  reference: string;
  text: string;
  questionType: QuestionType.textArea | QuestionType.text;
  responseValueActions: Actions;
}

export type Question = SelectQuestion | TextQuestion;
export interface AssessmentFormData {
  metadata: {
    version: string;
    name: string;
  };
  gpHighlights?: {
    [key: string]: GPHighlight;
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
    gpHighlights: {
      H1: {
        id: "H1",
        text: "Consider lower BMI threashold for BAME patients - NICE recommend obese cut off as 27 for South asian/chinese eithnic groups, with limited data on other ethic groups.",
        action: "showQuestion:Q6",
      },
    },
    questions: {
      Q1: {
        id: "Q1",
        reference: "",
        text: "What sex were you assigned at birth?",
        questionType: QuestionType.select,
        responseValueActions: {
          female: "showQuestion:Q1.1",
          male: "showQuestion:Q2",
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
        responseValueActions: {
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
        responseValueActions: {
          yes: "showQuestion:Q3",
          no: "block",
        },
        responses: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      Q3: {
        id: "Q3",
        reference: "",
        text: "What is your height?",
        questionType: QuestionType.text,
        responseValueActions: {
          default: "showQuestion:Q4",
        },
      },
      Q4: {
        id: "Q4",
        reference: "",
        text: "What is your current weight? (It's really important you give us an accurate up-to-date measurement)",
        questionType: QuestionType.text,
        responseValueActions: {
          default: "showQuestion:Q5",
        },
      },
      Q5: {
        id: "Q5",
        reference: "",
        text: "What is your ethnicity? (This will help our prescribers gain a better idea about your risk in relation to your weight)",
        questionType: QuestionType.select,
        responseValueActions: {
          bangladeshi: "highlight:H1",
          blackAfrican: "highlight:H1",
          blackCaribbean: "highlight:H1",
          chinese: "highlight:H1",
          indian: "highlight:H1",
          middleEastern: "highlight:H1",
          mixed: "highlight:H1",
          pakistani: "highlight:H1",
          other: "highlight:H1",
          yes: "showQuestion:Q3",
          no: "block",
        },
        responses: [
          { value: "bangladeshi", label: "Bangladeshi" },
          { value: "blackAfrican", label: "Black African" },
          { value: "blackCaribbean", label: "Black Caribbean" },
          { value: "chinese", label: "Chinese" },
          { value: "indian", label: "Indian" },
          { value: "middleEastern", label: "Middle Eastern" },
          { value: "mixed", label: "Mixed" },
          { value: "pakistani", label: "Pakistani" },
          { value: "other", label: "Other (free text)" },

          { value: "white", label: "White" },
          { value: "none", label: "I do not wish to answer" },
        ],
      },
    },
  },
];

export async function GET() {
  const forms = await prisma.form.findMany({
    include: { metadata: true },
  });

  return NextResponse.json(forms);
}
