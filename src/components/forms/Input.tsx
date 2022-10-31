import { useRef, useEffect, InputHTMLAttributes } from "react";

import { useField, SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    erro: {
      color: 'red',
      paddingBottom: 20,

    },
    inputForm: {
      margin: 20,
      border: 'none',
      borderBottom: '1px solid ',
      maxWidth: '45ch',

    },


  })
);
interface Props {
  name: string;
  type?:
  | "text"
  | "number"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "hidden"
  | "month"
  | "password"
  | "time"
  | "range"
  | "search"
  | "tel"
  | "url"
  | "week";
  label?: string;
  value?: string;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

export function Input({ name, type, label, value, ...rest }: InputProps) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);


  const defaultInputValue = value || defaultValue;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>

      <input
        type={type || "text"}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultInputValue}
        {...rest}
      />
      <br />
      {error && <span className={classes.erro}>{error}</span>}

    </div>
  );
}
