/* Ajuste menu drawer 
*-retirar menu normal
*/
import React, { FormEvent, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    btn: {
      color: '#fff',
    },
  })
);

export default function Header2() {
  const classes = useStyles();
  const [menu, setMenu] = useState(false);
  const openMenu = Boolean(menu)
  const handleClick = () => {
    setMenu(!menu);
  };
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={(e: FormEvent) => setMenu(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            open={menu}
            onClose={() => setMenu(false)}
          anchorEl={menu}
          >
            <Link to="/">
              <MenuItem>Home</MenuItem>
            </Link>
            <Link to="/cadastro">
              <MenuItem>Cadastro</MenuItem>
            </Link>
            <Link to="/lista ">
              <MenuItem>Lista de Cadastros</MenuItem>
            </Link>
          </Menu> */}
          <Typography variant="h6" align='center' className={classes.title}>
            Sistema Online
          </Typography>
          {/* <Button color="inherit">Entrar</Button> */}
          <Link to="/">
            <Button className={classes.btn}>Home</Button>
          </Link>
          <Link to="/cadastro">
            <Button className={classes.btn}>Cadastro</Button>
          </Link>
          <Link to="/lista ">
            <Button className={classes.btn}>Lista de Cadastros</Button>
          </Link>

        </Toolbar>
      </AppBar>
    </Container>
  );
}
