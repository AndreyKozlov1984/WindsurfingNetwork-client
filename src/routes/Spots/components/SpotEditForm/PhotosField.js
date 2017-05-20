// @flow
import React from 'react';
import { Form, Button, Glyphicon } from 'react-bootstrap';
import { AddPhoto } from './AddPhoto';
import { type Photo } from '../../modules/spotEdit';
import { MonthSelectorField } from './MonthSelectorField';
import { Field } from 'redux-form';

type Props = {|
  fields: any,
  onRotateLeft: (options: {| path: string, filename: string |}) => void,
  onRotateRight: (options: {| path: string, filename: string |}) => void,
|};

export const PhotosField = ({ fields, onRotateLeft, onRotateRight }: Props): React$Element<any> => {
  return (
    <div>
      {fields.map((photoPath: string, index: number) => {
        const record: () => Photo = () => fields.get(index);
        console.info(record);
        return (
          <div
            key={index}
            className='thumbnail'
            style={{
              width: 300,
              height: 300,
              margin: '10px 10px',
              display: 'inline-block',
              position: 'relative',
            }}
          >
            <Field
              name={`${photoPath}.filename`}
              component={({ input }: { input: any }) => (
                <div
                  className='photo'
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 300,
                    height: 300,
                    display: 'inline-block',
                    zIndex: 0,
                    backgroundImage: `url("/api/usercontent/${record().filename}")`,
                  }}
                />
              )}
            />
            <Form style={{ position: 'relative', zIndex: 1 }} inline>
              <Button bsStyle='danger' onClick={() => fields.remove(index)}><Glyphicon glyph='trash' /></Button>
              <Button onClick={() => onRotateLeft({ path: photoPath, filename: record().filename })}>
                <Glyphicon glyph='arrow-left' />
              </Button>
              <Button onClick={() => onRotateRight({ path: photoPath, filename: record().filename })}>
                <Glyphicon glyph='arrow-right' />
              </Button>
              <div className='pull-right'>
                <Field name={`${photoPath}.month`} component={MonthSelectorField} />
              </div>
            </Form>
          </div>
        );
      })}
      {<AddPhoto onAdd={(record: Photo) => fields.push(record)} />}
    </div>
  );
};

