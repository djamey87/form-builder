import { Question, Rule } from "@prisma/client";

interface Actions {
  [key: string]: {
    type: string;
    target: string;
  };
}

export const questionFormToRequestBody = (questionData: any[]): Question[] => {
  return questionData.map(({ responses, type, ...rest }) => {
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
            actionsBody[value || "default"] = action;
          }

          return { value, label };
        }
      );

      body = {
        ...body,
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
  // return ruleData.map(({ responses, type, ...rest }) => {
  //   let body = rest;
  //   if (responses) {
  //     const actionsBody: Actions = {};
  //     const responsesBody = responses.map(
  //       ({
  //         value,
  //         label,
  //         action,
  //       }: {
  //         value: string;
  //         label: string;
  //         action: { type: string; target: string };
  //       }) => {
  //         if (action) {
  //           actionsBody[value || "default"] = action;
  //         }

  //         return { value, label };
  //       }
  //     );

  //     body = {
  //       ...body,
  //       questionType: type,
  //       responses: responsesBody,
  //       responseValueActions: actionsBody,
  //     };
  //   }
  //   return body;
  // });
};
