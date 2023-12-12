import { PrismaClient, QuestionType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.form.create({
    data: {
      metadata: {
        create: { name: "example", slug: "example-v1", version: "1" },
      },
      questions: {
        create: [
          {
            id: "Q1",
            reference: "",
            text: "What sex were you assigned at birth?",
            questionType: QuestionType.SELECT,
            responseValueActions: {
              female: "showQuestion:Q1.1",
              male: "showQuestion:Q2",
            },
            responses: {
              create: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ],
            },
          },
          {
            id: "Q1.1",
            reference: "",
            text: "Are you pregnant, breastfeeding or trying to conceive (now or in the near future)?",
            questionType: QuestionType.SELECT,
            responseValueActions: {
              none: "showQuestion:Q2",
              pregnant: "block",
              breastfeeding: "block",
              conceive: "block",
            },
            responses: {
              create: [
                { value: "pregnant", label: "Yes, I'm currently pregnant" },
                {
                  value: "breastfeeding",
                  label: "Yes, I'm currently breastfeeding",
                },
                { value: "conceive", label: "Yes, I'm trying to conceive" },
                { value: "none", label: "No, none of the above" },
              ],
            },
          },
          {
            id: "Q2",
            reference: "",
            text: "Are you aged between 18 - 74?",
            questionType: QuestionType.SELECT,
            responseValueActions: {
              yes: "showQuestion:Q3",
              no: "block",
            },
            responses: {
              create: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ],
            },
          },
          {
            id: "Q3",
            reference: "",
            text: "What is your height?",
            questionType: QuestionType.TEXT,
            responseValueActions: {
              default: "showQuestion:Q4",
            },
          },
          {
            id: "Q4",
            reference: "",
            text: "What is your current weight? (It's really important you give us an accurate up-to-date measurement)",
            questionType: QuestionType.TEXT,
            responseValueActions: {
              default: "showQuestion:Q5",
            },
          },
          {
            id: "Q5",
            reference: "",
            text: "What is your ethnicity? (This will help our prescribers gain a better idea about your risk in relation to your weight)",
            questionType: QuestionType.SELECT,
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
            responses: {
              create: [
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
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
