import React from "react";

const NoResults = ({
  customText = "There are no",
  dataName = "items",
  tag: Tag = "p",
}) => (
  <Tag>
    {`${customText} ${dataName}`}
  </Tag>
);

export default NoResults;
