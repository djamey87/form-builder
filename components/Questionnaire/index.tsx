import { GenerateForm } from "../GenerateForm";
import { ProductSelector } from "../ProductSelector";
import { FormData } from "../GenerateForm";
import { useState } from "react";

export type Props = {
  title: string;
  formData: FormData;
};

export type PatientResponses = {
  questions: {
    [key: string]: { answer: string };
  };
};

// TODO:
// [x] conditional render of the product selector
// [x] responses to be passed to the prod selector
export function Questionnaire({ title, formData }: Props) {
  const [patientResponses, setPatientResponses] = useState<PatientResponses>();

  console.log(patientResponses);

  return (
    <div>
      <h1>{title}</h1>
      {!patientResponses ? (
        <GenerateForm
          formSchema={formData}
          onComplete={(responses: PatientResponses) =>
            setPatientResponses(responses)
          }
        />
      ) : (
        <ProductSelector
          formSchema={formData}
          patientResponses={patientResponses}
        />
      )}
    </div>
  );
}
