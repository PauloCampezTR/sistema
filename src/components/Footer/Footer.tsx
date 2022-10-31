import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    flexGrow: 1,
    height: 70,
    background: "#000",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 20,
  },


}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Sistema Online 2022
      </Typography>
    </Container>
  );
}
