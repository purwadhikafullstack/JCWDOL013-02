import { FormikProps, Form, Field } from 'formik';
import { FormValues } from '@/types';
import { TransitionLink } from '@/components/utils/transitionLink';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold rounded-2xl text-center mb-10 text-slate-700">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="form-control" id="email">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 m-1"
            >
              Email:
            </label>
            <Field
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-center text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>
          <div className="text-center pb-4 border-b-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 px-5 border border-transparent text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
          <TransitionLink href="/" className="">
            <p className="mt-5 text-center text-sm text-blue-600 hover:text-blue-700">
              Already have an account?
            </p>
          </TransitionLink>
        </div>
      </form>
    </div>
  );
}
