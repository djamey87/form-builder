"use client";
import { FormProvider, useForm, useWatch } from "react-hook-form";

export default function Page() {
  // TODO: default values
  const methods = useForm();
  const { handleSubmit, register, setValue, getValues } = methods;

  const onFormSubmit = handleSubmit(async (data) => {
    const { name, version, slug } = data;

    console.log("submit", data);

    fetch("../api/forms", {
      body: JSON.stringify(data),
      method: "post",
    });
  });

  // const watchName = useWatch("name");

  return (
    <div>
      <h1>Create a form</h1>

      <FormProvider {...methods}>
        <form onSubmit={onFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="name"
              {...register("name", {
                required: true,
                maxLength: 50,
              })}
              onChange={(e) => {
                let slug = `${e.target.value.toLowerCase()}-v${getValues(
                  "version"
                )}`;
                setValue("slug", slug);
              }}
            />
          </div>

          {/* TODO: this should be auto-incremented if updated */}
          <div>
            <label htmlFor="version">Version</label>
            <input
              type="text"
              placeholder="version"
              defaultValue="1"
              readOnly
              {...register("version", {
                value: "1",
                required: true,
                maxLength: 10,
              })}
            />
          </div>

          <div>
            <label htmlFor="slug">Slug</label>
            <input
              readOnly
              {...register("slug", {
                required: true,
                maxLength: 60,
                // value: {`${getValues("name")}-${getValues("slug")}`}
              })}
            ></input>
          </div>

          <button type="submit">Create</button>
        </form>
      </FormProvider>
    </div>
  );
}
