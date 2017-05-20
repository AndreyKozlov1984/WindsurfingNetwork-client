// @flow
import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import FileInput from 'react-fine-uploader/file-input';
import 'react-fine-uploader/gallery/gallery.css';
import { type Photo } from '../../modules/spotEdit';
/* eslint-disable immutable/no-this */
export class AddPhoto extends React.Component {
  props: {|
    onAdd: (record: Photo) => void,
  |};
  uploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: false,
      },
      request: {
        endpoint: '/api/upload/photo',
      },
      retry: {
        enableAuto: true,
      },
      callbacks: {
        onComplete: (id: number, name: string, json: any) => {
          this.props.onAdd(json.record);
        },
      },
    },
  });
  render () {
    return (
      <div
        className='thumbnail'
        style={{
          width: 300,
          height: 300,
          margin: '10px 10px',
          display: 'inline-block',
        }}
      >
        <FileInput multiple accept='image/*' uploader={this.uploader}>
          <Button bsStyle='primary'>
            <Glyphicon glyph='add' />Add More Photos
          </Button>
        </FileInput>
      </div>
    );
  }
}
/* eslint-enable immutable/no-this */

