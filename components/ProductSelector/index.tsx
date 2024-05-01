import { FormData } from "../GenerateForm";

export type Props = {
  formSchema: FormData;
};

// TODO:
// [-] form
// [-] selector populated by products
// [-] selector products filtered by the patient responses / rules applied
// [-] submit / redirect to checkout page
export function ProductSelector({ formSchema }: Props) {
  return (
    <form>
      <select>
        <option>Dave</option>
      </select>
    </form>
  );
}
