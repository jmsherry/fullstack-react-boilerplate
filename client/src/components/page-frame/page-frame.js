import React from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function PageFrame(props) {
  const classes = useStyles();
  let location = useLocation();

  return (
    <TransitionGroup>
      {/*
            This is no different than other usage of
            <CSSTransition>, just make sure to pass
            `location` to `Switch` so it can match
            the old location as it animates out.
          */}
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Container maxWidth="lg">
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              {props.children}
            </Grid>
          </Grid>
        </Container>
      </CSSTransition>
    </TransitionGroup>
  );
}
