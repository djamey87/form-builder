import { getProductsByCategory } from "@/app/api/products";
import { CreateForm } from "@/components/CreateForm";

// TODO:
// [] product selection - interact with endpoint
// [] add instructional text - Markdown?
// [X] question sections
// [] configurable auth functionality?
// [] radio types
// [] multi-select
// [] other text field functionality
// [] acknowledgements
// [] styling to match wegovy-assement repo?
// [] handle different environments

export default async function Page() {
  // TODO: need to allow this to be more generic
  const { products } = await getProductsByCategory("3489");

  return <CreateForm products={products} />;
}
