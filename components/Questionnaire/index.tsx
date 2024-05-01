import { GenerateForm } from "../GenerateForm";
import { ProductSelector } from "../ProductSelector";
import { FormData } from "../GenerateForm";
import { useState } from "react";

export type Props = {
  title: string;
  formData: FormData;
};

// TODO:
// [-] conditional render of the product selector
// [-] responses to be passed to the prod selector
export function Questionnaire({ title, formData }: Props) {
  const [formCompleted, setFormCompleted] = useState(false);

  return (
    <div>
      <h1>{title}</h1>
      {!formCompleted ? (
        <GenerateForm
          formData={formData}
          onComplete={() => setFormCompleted(true)}
        />
      ) : (
        <ProductSelector />
      )}
    </div>
  );
}
