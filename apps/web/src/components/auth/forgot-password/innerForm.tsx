import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './types';
import { TransitionLink } from '@/components/utils/transitionLink';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="form-control" id="email">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errors.email}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-green-300"
          >
            Send Reset Link
          </button>
          <TransitionLink className="" href="/">
            <p className="text-blue-500 text-center mt-4 hover:text-blue-600">
              Back to Sign In
            </p>
          </TransitionLink>
        </div>
      </Form>
    </div>
  );
}
