import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import foto from '../assets/fundo.jpg'
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: `url(${foto})`,
    // width: '300',
    // height:'300',
    maxWidth: 500,
    padding: 25,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h3" align='center'>
        Sistema de Cadastro Online
      </Typography>

      <Typography variant="subtitle2" gutterBottom align='center'>
        Faça parte da nossa central
        <br />
        <br />
        <Link to='/cadastro'> <Button variant="contained" color='secondary'>Novo Cadastro</Button></Link> <Link to='/lista'><Button variant="contained" color='secondary'>Lista de Registro</Button></Link>
      </Typography>
    </Container>
  );
}
