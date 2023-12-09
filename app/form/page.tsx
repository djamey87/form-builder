import { GenerateForm } from "@/components/GenerateForm";
import { AssessmentFormData } from "../api/forms/route";

// TODO:
//

export default async function FormPage() {
  const formData: AssessmentFormData[] = await fetch(
    "http://localhost:3000/api/forms"
  ).then((res) => res.json());

  const { metadata } = formData[0];

  return (
    <div>
      <h1>{`"${metadata.name}" - ${metadata.version}`}</h1>
      <GenerateForm formData={formData[0]} />
    </div>
  );
}
