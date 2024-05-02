import { presentProductsByRules } from "@/utils/productSelector";
import { FormData } from "../GenerateForm";
import { PatientResponses } from "../Questionnaire";

export type Props = {
  formSchema: FormData;
  patientResponses: PatientResponses;
};

// TODO:
// [-] form
// [-] selector populated by products
// [-] selector products filtered by the patient responses / rules applied
// [-] submit / redirect to checkout page
export function ProductSelector({ formSchema, patientResponses }: Props) {
  console.log("ProductSelector", formSchema, patientResponses);
  console.log(
    "ProductSelector TEST",
    formSchema.rules[0].presentedProducts,
    patientResponses
  );

  const listedProducts = presentProductsByRules({
    formSchema,
    patientResponses,
  });

  // TODO: go through the rules and present the products matching against the responses

  return (
    <>
      <h2>Product Selector</h2>
      <form>
        <select>
          {listedProducts.map(({ id, label }) => (
            <option key={`productSelector-${id}`} value={id}>
              {label}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
