import { Formik, Form, Field } from "formik";
import styles from "../../styles/styles.module.scss";
import { useFormData } from "../../context";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export default function PersonalInfo({ formStep, nextFormStep }) {
  const { data, setFormValues } = useFormData();

  const handleSubmit = (values) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
      <h2>Personal Info</h2>

      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ errors }) => (
          <Form>
            <div className={styles.formRow}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>
            <button type="submit">Next</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
