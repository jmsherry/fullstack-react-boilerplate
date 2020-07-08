import React, {useContext} from "react";
import { PeopleContext } from '../../contexts/people.context'
import List from '../list/list';
import PeopleListItem from '../person-list-item/person-list-item'

const PeopleList = () => {
  const { people } = useContext(PeopleContext);
  return (
    <div className="peopleListDisplay">
      <List data={people} ItemComponent={PeopleListItem} />
    </div>
  );
};

export default PeopleList;
