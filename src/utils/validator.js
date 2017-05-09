import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';
export default async function validate (filename, linenumber, value) {
  if (!__DEV__) {
    return;
  }
  console.info(`validating: ${filename}:${linenumber}`);
  const response = await fetch('/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        file: filename,
        line: linenumber,
        jsonValue: value,
      },
      null,
      4,
    ),
  });
  const result = await response.json();
  if (result !== true) {
    console.error('API Failure!');
    console.error(result);
    const MOUNT_NODE = document.getElementById('root');
    ReactDOM.render(
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: 'red',
          color: 'white',
          padding: 20,
          overflowY: 'auto',
        }}
      >
        <h1> Flow validation failed at <i>{filename}:{linenumber}</i></h1>
        <pre>
          {result}
        </pre>
      </div>,
      MOUNT_NODE,
    );
  }
}

