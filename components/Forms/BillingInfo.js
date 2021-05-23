import { Formik, Form, Field } from "formik";
import styles from "../../styles/styles.module.scss";
import { useFormData } from "../../context";
import * as yup from "yup";

const schema = yup.object().shape({
  address: yup
    .string()
    .min(2, "Address is too short")
    .required("Address is required"),
});

export default function BillingInfo({ formStep, nextFormStep }) {
  const { data, setFormValues } = useFormData();

  const handleSubmit = (values) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
      <h2>Billing Info</h2>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ errors }) => (
          <Form>
            <div className={styles.formRow}>
              <label htmlFor="address">Address</label>
              <Field type="address" name="address" id="address" />
              {errors.address && (
                <span className={styles.errorText}>{errors.address}</span>
              )}
            </div>
            <button type="submit">Next</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
