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
            reference: "Q1",
            text: "What sex were you assigned at birth?",
            questionType: QuestionType.SELECT,
            responseValueActions: {
              female: {
                type: "SHOW_QUESTION",
                target: "Q1.1",
              },
              male: {
                type: "SHOW_QUESTION",
                target: "Q2",
              },
            },
            responses: {
              create: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ],
            },
          },
          {
            reference: "Q1.1",
            text: "Are you pregnant, breastfeeding or trying to conceive (now or in the near future)?",
            questionType: QuestionType.SELECT,
            responseValueActions: {
              none: {
                type: "SHOW_QUESTION",
                target: "Q2",
              },
              pregnant: {
                type: "BLOCK",
              },
              breastfeeding: {
                type: "BLOCK",
              },
              conceive: {
                type: "BLOCK",
              },
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
            reference: "Q2",
            text: "Are you aged between 18 - 74?",
            questionType: QuestionType.SELECT,
            responseValueActions: {
              yes: {
                type: "SHOW_QUESTION",
                target: "Q3",
              },
              no: {
                type: "BLOCK",
              },
            },
            responses: {
              create: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ],
            },
          },
          {
            reference: "Q3",
            text: "What is your height?",
            questionType: QuestionType.TEXT,
            responseValueActions: {
              default: {
                type: "SHOW_QUESTION",
                target: "Q4",
              },
            },
          },
          {
            reference: "Q4",
            text: "What is your current weight? (It's really important you give us an accurate up-to-date measurement)",
            questionType: QuestionType.TEXT,
            responseValueActions: {
              default: {
                type: "SHOW_QUESTION",
                target: "Q5",
              },
            },
          },
          {
            reference: "Q5",
            text: "What is your ethnicity? (This will help our prescribers gain a better idea about your risk in relation to your weight)",
            questionType: QuestionType.SELECT,
            responseValueActions: {
              bangladeshi: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              blackAfrican: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              blackCaribbean: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              chinese: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              indian: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              middleEastern: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              mixed: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              pakistani: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              other: {
                type: "HIGHLIGHT",
                target: "H1",
              },
              yes: {
                type: "SHOW_QUESTION",
                target: "Q3",
              },
              no: {
                type: "BLOCK",
              },
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
