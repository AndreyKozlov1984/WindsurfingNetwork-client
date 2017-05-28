// @flow
import React from 'react';
import _ from 'lodash-es';
import { type SimpleSchool } from '../../modules/spots';
import { AddSchool } from './AddSchool';
import { ListGroup, ListGroupItem, Media, Button, Glyphicon } from 'react-bootstrap';
export type Option = {| id: number, name: string, disabled: boolean |};

const getSelectedSchools = (selectedSchools: number[], allSchools: SimpleSchool[]): SimpleSchool[] => {
  return _.map(selectedSchools, function (id: number) {
    const school = _.find(allSchools, { id: id });
    if (!school) {
      throw new Error('School not present in the list');
    }
    return school;
  });
};

const getSchoolsAsOptions = (selectedSchools: number[], allSchools: SimpleSchool[]) => {
  return _.map(allSchools, (school: SimpleSchool) => ({
    id: school.id,
    name: school.name,
    disabled: _.includes(selectedSchools, school.id),
  }));
};
type Props = {|
  fields: any,
  schoolsList: SimpleSchool[],
|};

export const SchoolsField = ({ fields, schoolsList }: Props): React$Element<any> => {
  const list = getSelectedSchools(fields.getAll(), schoolsList);
  const options = getSchoolsAsOptions(fields.getAll(), schoolsList);
  return (
    <div>
      <ListGroup>
        {list.map((school: SimpleSchool, index: number) => (
          <ListGroupItem key={index}>
            <Media>
              <Media.Left>
                <img width={64} height={64} src={`/api/usercontent/${school.logo}`} />
              </Media.Left>
              <Media.Body>
                {school.name}
              </Media.Body>
              <Media.Right>
                <Button onClick={() => fields.remove(index)}><Glyphicon glyph='trash' /></Button>
              </Media.Right>
            </Media>
          </ListGroupItem>
        ))}
      </ListGroup>
      <AddSchool options={options} onAdd={(id: number) => fields.push(id)} />
    </div>
  );
};

