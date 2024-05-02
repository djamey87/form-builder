"use client";
import { useFormContext } from "react-hook-form";
import { ConditionType } from "@prisma/client";
import { useState } from "react";
import { Product } from "@/app/api/products";

interface Props {
  id: number;
  products: Product[];
}

export default function RuleForm({ id, products }: Props) {
  const methods = useFormContext();

  const { getValues } = methods;
  const idPrefix = `rules.${id}`;
  const { questions } = getValues();

  const [responseCount, setResponseCount] = useState(1);

  return (
    <div className="border mt-20">
      <div>
        <label htmlFor="products">
          <p>
            Responses <i>(SELECT types only)</i>
          </p>
        </label>
        <select
          defaultValue={["none"]}
          multiple
          {...methods.register(`${idPrefix}.questionResponses`)}
        >
          <option value="none" label="please select" disabled />
          {questions
            .filter(({ type }) => type === "SELECT")
            .map(({ reference, responses, text, type }) => (
              <optgroup key={reference} label={`${reference} - ${text}`}>
                {responses?.length > 0 ? (
                  <>
                    {responses.map(({ label, value }) => (
                      <option
                        key={`question-${reference}-${value}`}
                        label={label}
                        value={JSON.stringify({
                          questionReference: reference,
                          response: value,
                        })}
                      />
                    ))}
                  </>
                ) : (
                  <option value="none" label="please select" disabled />
                )}
              </optgroup>
            ))}
        </select>
      </div>

      {/* TODO: acquire selected options */}
      {responseCount === 1 ? null : (
        <div>
          <label>
            <p>Condition type</p>
            <select
              placeholder="Question type"
              defaultValue="none"
              {...methods.register(`${idPrefix}.conditionType`, {
                required: true,
              })}
            >
              <option value="none" label="please select" disabled />
              {Object.entries(ConditionType).map(([_, value]) => (
                <option key={`type-${value}`} value={value} label={value} />
              ))}
            </select>
          </label>
        </div>
      )}

      <div>
        <label htmlFor="products">
          <p>Products</p>
        </label>
        <select
          defaultValue={["none"]}
          multiple
          {...methods.register(`${idPrefix}.presentedProducts`)}
        >
          <option value="none" label="please select" disabled />
          {products.map(({ item_id, name, saleItems }) => (
            <optgroup key={item_id} label={name}>
              {saleItems?.length > 0 ? (
                <>
                  {saleItems.map(({ id, size }) => (
                    <option
                      key={`product-${item_id}-${id}`}
                      label={size}
                      value={JSON.stringify({ id, label: size })}
                    />
                  ))}
                </>
              ) : (
                <option
                  key={`product-${item_id}-none`}
                  value="none"
                  label="please select"
                  disabled
                />
              )}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
