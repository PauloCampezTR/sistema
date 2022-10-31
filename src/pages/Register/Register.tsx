
import React, { useRef, useState } from "react";
import { IPerson, PersonService } from "../../services/api/person/PersonService";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";
import * as yup from "yup";
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
      maxWidth: 250,
      borderRadius: 10,
      padding: "30px",
    },
    textField: {
      height: 20,

      marginBottom: 10,
      marginTop: 10,
      padding: theme.spacing(1),
      width: "70%",
      border: "none",
      background: "#ffffff",
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

const schema: yup.SchemaOf<IPerson> = yup.object().shape({
  name: yup.string().min(4, "minimo de caractes").required("* Campo nome requerido"),
  lastname: yup.string().required("* Campo sobrenome requerido"),
  email: yup.string().email().required("* Campo e-mail requerido"),
  genre: yup.string().required("* Campo sexo requerido"),
  text: yup.string().required("* Campo experiencia requerido"),
  phone: yup.string().required("* Campo telefone requerido"),
  cpf: yup.string().required("* Campo cpf requerido"),
  date: yup.date().required('Campo data requerido'),
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
  const [list, setList] = useState<IPerson[]>([]);
  const Navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  let btnVerication = true
  const handleSave = (storedData: IPerson) => {
    console.log('aqyy', schema.isValid)

    schema
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
      .catch((errors: yup.ValidationError) => {
        const errorValidation: { [key: string]: string } = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;
          errorValidation[error.path] = error.message;

          formRef.current?.setErrors(errorValidation);
        });
      });
  };
  return (
    <Container maxWidth="md">
      <Form className={classes.root} ref={formRef} onSubmit={handleSave}>
        <div className={classes.container}>
          <Typography>Nome</Typography>
          <Input
            name="name"
            placeholder="Digite seu nome"
            className={classes.textField}
          />
          <Typography>Sobrenome</Typography>
          <Input
            name="lastname"
            placeholder="Digite seu sobrenome"
            className={classes.textField}
          />
          <Typography>E-mail</Typography>
          <Input
            name="email"
            placeholder="Digite seu e-mail"
            className={classes.textField}
          />
          <Typography>Telefone</Typography>
          <Input
            name="phone"
            placeholder="(00) 0000-0000"
            className={classes.textField}
            onChange={(e) => {
              const { value } = e.target;
              e.target.value = mask(e.target.value, [
                "99 9999-9999",
                "99 99999-9999",
              ]);
            }}
          />
          <Typography>CPF</Typography>

          <Input
            name="cpf"
            placeholder="000.000.000-00"
            className={classes.textField}
            onChange={(e) => {
              const { value } = e.target;
              e.target.value = mask(e.target.value, ["999.9999.999-99"]);
            }}
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
          <Input
            className={classes.textField}
            min="2021-01-01"
            max="2021-12-31"
            name="date"
            type="date"
          />

          <div className={classes.btn}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            //disabled={}
            >
              Enviar
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}
