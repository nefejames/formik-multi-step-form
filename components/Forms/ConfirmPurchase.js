import styles from "../../styles/styles.module.scss";
import { Formik, Form, Field } from "formik";
import { useFormData } from "../../context";
import * as yup from "yup";

const schema = yup.object().shape({
  checkbox: yup.bool().required().isTrue(),
});

export default function ConfirmPurchase({ formStep, nextFormStep }) {
  const { data, setFormValues } = useFormData();

  const handleSubmit = (values) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <div className={formStep === 2 ? styles.showForm : styles.hideForm}>
      <h2>Confirm Purchase</h2>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ errors }) => (
          <Form>
            <div className={styles.formRow}>
              <label htmlFor="checkbox">
                <Field type="checkbox" name="checkbox" />
                Ready to go?
              </label>
              {errors.checkbox && (
                <span className={styles.errorText}>{errors.checkbox}</span>
              )}
            </div>
            <button>Complete purchase</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
