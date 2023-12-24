import React from "react";
import Button from "../../ui/Button";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher(); // In order to write data with fetcher we use a form component provided by fetcher ( cannot use fetcher.load() to write data)

  return (
    // Submitting a Form from react router creates a new navigation whereas submitting the form of useFetcher does not create a new navigation
    // fetcher Form will submit the form and will revalidate the page without navigating to a new route
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
