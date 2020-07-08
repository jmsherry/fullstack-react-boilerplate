import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { PeopleContext } from "./../../contexts/people.context";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  item: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  display: {
    marginInlineEnd: "50px",
  },
}));

const PersonListItem = ({ item: { _id, firstName, lastName, email } }) => {
  const classes = useStyles();
  const history = useHistory();
  const { deletePerson } = useContext(PeopleContext);

  function updateHandler(id) {
    history.push(`/people/update/${id}`);
  }

  return (
    <li className={classes.item}>
      <div className={classes.display}>
        {`${firstName} ${lastName} (`}
        <a href={`mailto:${email}`}>{email}</a>)
      </div>
      <div className={classes.controls}>
        <Button onClick={() => updateHandler(_id)} aria-label="update todo">
          <EditOutlinedIcon />
        </Button>
        <Button onClick={() => deletePerson(_id)} aria-label="delete todo">
          <DeleteOutlineIcon />
        </Button>
      </div>
    </li>
  );
};

export default PersonListItem;
