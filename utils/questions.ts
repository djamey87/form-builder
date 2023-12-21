import { Question } from "@prisma/client";

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
            actionsBody[value] = action;
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
