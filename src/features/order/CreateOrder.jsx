// import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
// import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation(); // navigation state can be either idle,loading or submitting
  const isSubmitting = navigation.state === 'loading';

  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* Method used can be PATCh,DELETE but not GET */}
      {/* action contains the path that the form must be submitted to */}
      {/* <Form method="POST"  action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" className="input" name="address" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* WE are using hidden input as the we cannot pass the cart data as a variable to the action as it will come from redux. And we are using stringify as input can only have strings not objects. */}
          <button
            className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300  focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); // takes an object in not iterable form and converts into an iterable object with key value pairs.
  // console.log(formData);
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  // console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please provide a valid phone number before placing an order.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // return newOrder; we want to navigate too /order/:id but we cannot call hooks inside regualr functions ; so we use another funciton called redirect

  return redirect(`/order/${newOrder.id}`); // Create a new response object ; will redirect to /order/:id which will then fetch the created order from the external web api
}

export default CreateOrder;
