import { FormData } from "../components/GenerateForm";
import { PatientResponses } from "../components/Questionnaire";

type Props = {
  formSchema: FormData;
  patientResponses: PatientResponses;
};

type ProductOption = {
  id: string;
  label: string;
};

export const presentProductsByRules = ({
  formSchema,
  patientResponses,
}: Props): ProductOption[] => {
  let listedProducts = [] as ProductOption[];

  // TODO:
  // - loop through all rules
  // -
  formSchema.rules.forEach(({ presentedProducts, questionResponses }) => {
    const matchedResponses = questionResponses?.filter(
      ({ questionReference, response }) =>
        patientResponses.questions[questionReference].answer === response
    );
    if (matchedResponses.length === questionResponses.length) {
      listedProducts = [...listedProducts, ...presentedProducts];
    }
  });

  return listedProducts;
};
