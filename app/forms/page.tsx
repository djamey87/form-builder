import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function FormsPage() {
  const forms = await prisma.form.findMany({
    include: { metadata: true },
  });

  console.log("forms", forms);

  return (
    <div>
      {!forms || forms.length === 0 ? (
        <h1>No forms found</h1>
      ) : (
        <ul>
          {forms.map(({ id, metadata }) => {
            return (
              <li key={id}>
                <Link href={`forms/${metadata.slug}`}>{metadata.name}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
