// @flow
import React from 'react';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import FileInput from 'react-fine-uploader/file-input';
import ProgressBar from 'react-fine-uploader/progress-bar';
import 'react-fine-uploader/gallery/gallery.css';
import { FormGroup, ControlLabel } from 'react-bootstrap';

type Props = {|
  input: any,
  label: string,
  meta: any,
|};
/* eslint-disable immutable/no-this */
export class LogoField extends React.Component {
  props: Props;
  uploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: true,
      },
      request: {
        endpoint: '/api/upload',
      },
      retry: {
        enableAuto: true,
      },
      callbacks: {
        onComplete: (id: number, name: string, json: any) => {
          this.props.input.onChange(json.id);
        },
      },
    },
  });
  render () {
    const { meta, label, input } = this.props;
    return (
      <FormGroup controlId='formBasicText' validationState={meta.touched ? meta.error ? 'error' : 'success' : null}>
        <ControlLabel>{label}</ControlLabel>
        <br />
        <img width='64' height='64' src={`/api/usercontent/${input.value}`} />
        &nbsp;
        <FileInput accept='image/*' uploader={this.uploader}>
          <span className='btn btn-default'>Choose Different Logo</span>
        </FileInput>
        <ProgressBar uploader={this.uploader} />
      </FormGroup>
    );
  }
}

