
import React, { useRef, useState } from "react";
import { IPerson, PersonService } from "../../services/api/person/PersonService";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Container, Typography, TextField } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';
import {
  VTextSelect,
  VTextArea,
  Input,
} from "../../components/forms";
import { Form } from "@unform/web";
import { FormContext, FormHandles } from "@unform/core";
import { useNavigate } from "react-router-dom";
import { mask, unMask } from "remask";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: "10px 10px",
        width: "35ch",
      },
    },
    container: {
      background: "#f5f3f3",
      margin: "40px auto",
      maxWidth: 500,
      borderRadius: 10,
      padding: "30px",
    },
    textField: {
      borderRadius: 2,
    },
    area: {
      // height: 48,
      maxWidth: "28ch",
      border: "none",
      borderRadius: 2,
      padding: 12,
      margin: 10,
    },
    btn: {
      padding: 20,
    },
  })
);



const validationSchema: Yup.SchemaOf<IPerson> = Yup.object().shape({
  name: Yup.string().min(4, "minimo de caractes").required("* Campo nome requerido"),
  lastname: Yup.string().required("* Campo sobrenome requerido"),
  email: Yup.string().email().required("* Campo e-mail requerido"),
  genre: Yup.string().required("* Campo sexo requerido"),
  text: Yup.string().required("* Campo experiencia requerido"),
  phone: Yup.string().required("* Campo telefone requerido"),
  cpf: Yup.string().min(11).required("* Campo cpf requerido"),
  date: Yup.date().required('Campo data requerido')
});



interface FormData {
  username: string;
  bio: string;
  week: string;
  date: string;
  name: string;
  email: string;
  month: string;
  telephone: string;

}
const selectOptions = [
  { value: "masculino", label: "masculino" },
  { value: "feminino", label: "feminino" },
];
const verificator = false
export default function Register() {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true)
  const [list, setList] = useState<IPerson[]>([]);
  const Navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  let btnVerication = true
  const handleSave = (storedData: IPerson) => {
    console.log('aqyy', validationSchema.isValid)
    validationSchema
      .validate(storedData, { abortEarly: false })
      .then((validatePerson) => {
        PersonService.create(validatePerson).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            btnVerication = false
            alert("salvo com sucesso");
            Navigate("/lista");
          }
        });
      })
      .catch((errors: Yup.ValidationError) => {
        const errorValidation: { [key: string]: string } = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;
          errorValidation[error.path] = error.message;

          formRef.current?.setErrors(errorValidation);
        });
      });
  };


  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: '',
      email: '',
      genre: '',
      text: '',
      phone: 0,
      cpf: '',
      birthday: new Date(),
      id: 0
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: (values: IPerson) => {
      handleSave(values)
    }
  })

  // const handleOnChange 

  return (
    <Container maxWidth="md">
      {/* <Form className={classes.root} ref={formRef} onSubmit={handleSave} > */}
      <Form className={classes.root} ref={formRef} onSubmit={handleSave} >
        <div className={classes.container}>
          <Typography>Nome</Typography>
          <TextField
            name="name"
            placeholder="Digite seu nome"
            className={classes.textField}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.name) && formik.touched.name}
            helperText={formik.errors.name}
          />
          <Typography>Sobrenome</Typography>
          <TextField
            name="lastname"
            placeholder="Digite seu sobrenome"
            className={classes.textField}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.lastname) && formik.touched.lastname}
            helperText={formik.errors.lastname}
          />
          <Typography>E-mail</Typography>
          <TextField
            name="email"
            placeholder="Digite seu e-mail"
            className={classes.textField}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.email) && formik.touched.email}
            helperText={formik.errors.email}
          />
          <Typography>Telefone</Typography>
          <TextField
            name="phone"
            placeholder="(00) 0000-0000"
            className={classes.textField}
            onChange={(e) => {
              const { value } = e.target;
              e.target.value = mask(e.target.value, [
                "99 9999-9999",
                "99 99999-9999",
              ]);
              formik.handleChange
            }}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.phone) && formik.touched.phone}
            helperText={formik.errors.phone}
          />
          <Typography>CPF</Typography>

          <TextField
            name="cpf"
            placeholder="000.000.000-00"
            className={classes.textField}
            onChange={(e) => {
              const { value } = e.target;
              e.target.value = mask(e.target.value, ["999.9999.999-99"]);
              formik.handleChange
            }}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.cpf) && formik.touched.cpf}
            helperText={formik.errors.cpf}
          />
          <Typography>Sexo</Typography>
          <VTextSelect name="genre" label="">
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </VTextSelect>
          <Typography>Experencia</Typography>
          <VTextArea name="text" className={classes.area} />
          <Typography>Data</Typography>
          <TextField
            className={classes.textField}
            name="birthday"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.birthday != undefined) && formik.touched.birthday != undefined}
            helperText={formik.touched.birthday != undefined && formik.errors.birthday != undefined}
          />

          <div className={classes.btn}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={false || !formik.isValid}
            >
              Enviar
            </Button>
          </div>
        </div>
      </Form>
    </Container>

  );
}
