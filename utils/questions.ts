import { Question, Rule } from "@prisma/client";

interface Actions {
  [key: string]: {
    type: string;
    target: string;
  };
}

export const questionFormToRequestBody = (questionData: any[]): Question[] => {
  return questionData.map(({ reference, responses, type, ...rest }) => {
    let body = rest;
    if (responses) {
      const actionsBody: Actions = {};
      const responsesBody = responses.map(
        ({
          value,
          label,
          action,
        }: {
          value: string;
          label: string;
          action: { type: string; target: string };
        }) => {
          if (action) {
            if (action.target)
              action = { ...action, target: action.target.replace(".", "_") };
            actionsBody[value || "default"] = action;
          }

          return { value, label };
        }
      );

      body = {
        ...body,
        reference: reference.replace(".", "_"),
        questionType: type,
        responses: responsesBody,
        responseValueActions: actionsBody,
      };
    }
    return body;
  });
};

export const ruleFormToRequestBody = (ruleData: any[]): Rule[] => {
  console.log("incoming rules structure", ruleData);
  // console.log(
  //   "incoming rules structure TEST",
  //   JSON.parse(ruleData[0].presentedProducts[0]).id
  // );

  const parsedShiz = ruleData.map(
    ({ presentedProducts, questionResponses, ...rest }) => ({
      ...rest,
      presentedProducts: presentedProducts.map((jObj: string) =>
        JSON.parse(jObj)
      ),
      questionResponses: questionResponses.map((jObj: string) =>
        JSON.parse(jObj)
      ),
    })
  );
  console.log("outgoing rules structure", ruleData);

  return parsedShiz;
};
