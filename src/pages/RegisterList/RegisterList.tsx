import React, { useEffect, useState } from "react";
import { IPerson, PersonService } from "../../services/api/person/PersonService";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Container } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactExcel from "react-html-table-to-excel";

const useStyles = makeStyles({
  table: {
    minWidth: 650,

  },
  menuTop: {
    background: "#3f51b5",
    height: 50,
    color: "#fff",
    marginBottom: 20,
  },
  btn: {
    background: "#e91e63",
    color: "#fff",
    height: 35,
    margin: 5,
    border: "none",
    padding: "10px 20px",
    borderRadius: 4,
    "&:hover": {
      background: "#a31545",
      color: "#ccc",
    },
  },
  rowMaster: {
    background: "#c4b8b8",
  },
});


export default function RegisterList() {
  const classes = useStyles();
  const [list, setList] = useState<IPerson[]>([]);

  useEffect(() => {
    PersonService.getAll().then((result) => {
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
      setList(result.data);
    });
  }, []);
  console.log(list);

  const handleDelete = (id: number) => {
    if (confirm("Apagar o registro?")) {
      PersonService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setList((list) => {
            return [...list.filter((list) => list.id !== id)];
          });
          alert("Apagado com sucesso");
        }
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.menuTop}>
        <ReactExcel
          className={classes.btn}
          table="excel"
          filename="Excel file"
          sheet="Sheet"
          buttonText="Exportar"
        />
      </div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
          id="excel"
        >
          <TableHead>
            <TableRow className={classes.rowMaster}>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Sobrenome</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">Sexo</TableCell>
              <TableCell align="right">Nascimento</TableCell>
              <TableCell align="right">Experiências</TableCell>
              <TableCell align="right">Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.cpf}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.genre}</TableCell>
                <TableCell align="right">{row.birthday}</TableCell>
                <TableCell align="right">{row.text}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
