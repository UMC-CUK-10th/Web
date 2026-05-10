import { useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touch, setTouch] = useState<Partial<Record<keyof T, boolean>>>({});
  const error = validate(values) as Partial<Record<keyof T, string>>;

  const handleChange = (name: keyof T, text: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: text,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouch((prevTouch) => ({
      ...prevTouch,
      [name]: true,
    }));
  };

  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  return { values, error, touch, getInputProps };
}

export default useForm;
