import { useRef, useEffect, TextareaHTMLAttributes } from 'react'

import { useField, SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

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
  name: string
  label?: string
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props

export function VTextArea({ name, label, ...rest }: TextareaProps) {
  const classes = useStyles();
  const textareaRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])



  return (
    <div>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <textarea
        ref={textareaRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />
      <br />

      {error && <span className={classes.erro}>{error}</span>}
    </div>
  )
}

