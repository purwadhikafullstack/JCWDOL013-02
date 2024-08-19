import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './types';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  const validateConfirmPassword = (pass: string, value: string) => {
    let error = '';
    if (pass && value) {
      if (pass !== value) {
        error = 'Password not matched';
      }
    }
    return error;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="form-control" id="password">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <Field
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              className="w-full p-2 border rounded-md"
            />
            {touched.password && errors.password && (
              <p className="mt-2 text-center text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="form-control" id="password1">
            <label htmlFor="password1" className="form-label">
              Confirm Password
            </label>
            <Field
              name="password1"
              type="password"
              onChange={handleChange}
              value={values.password1}
              className="w-full p-2 border rounded-md"
              validate={() =>
                validateConfirmPassword(values.password, values.password1)
              }
            />
            {errors.password1 && (
              <p className="mt-2 text-center text-red-500">
                {errors.password1}
              </p>
            )}
          </div>

          {errors.password1 ? (
            <button
              type="submit"
              disabled
              className="mt-4 w-full py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
            >
              Reset Password
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full py-2 bg-green-400 text-white rounded-md hover:bg-green-500"
            >
              Reset Password
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}
