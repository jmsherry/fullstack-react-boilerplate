import React from "react";
import List from "@material-ui/core/List";

const ListComponent = ({ data, ordered = false, ItemComponent }) => {
  let type = ordered ? "ol" : "ul";
  // console.log(data.length, ItemComponent);
  console.log('data', data)
  return (
    <List component={type}>
      {data.map((item, i) => (
        <ItemComponent item={item} key={i} />
      ))}
    </List>
  );
};

export default ListComponent;
