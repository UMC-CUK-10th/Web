import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

interface useFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: useFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<
    keyof T,
    string
  >);

  const handleChange = (name: keyof T, text: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const getInputProps = (name: keyof T) => {
    return {
      value: values[name],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(name, e.target.value),
      onBlur: () => handleBlur(name),
    };
  };

  useEffect(() => {
    setErrors(validate(values));
  }, [values, validate]);

  return { values, errors, touched, getInputProps };
}

export default useForm;