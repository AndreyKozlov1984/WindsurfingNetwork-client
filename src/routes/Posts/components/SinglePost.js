// @flow
import React from 'react';
import { Media } from 'react-bootstrap';
import { formatDateTime } from '~/utils/formatters';
import { type Post, type Comment } from '../modules/posts';

const SinglePost = ({ logo, name, image_filename: imageFilename, comments, date, content }: Post) => (
  <Media>
    <Media.Left>
      <img width={64} height={64} src={`/api/usercontent/${logo}`} />
    </Media.Left>
    <Media.Body>
      <Media.Heading>{name} <i>{formatDateTime(date)}</i></Media.Heading>
      <p>{content}</p>
      {imageFilename ? <img src={`api/usercontent/${imageFilename}`} /> : null}
      <h4> Comments ({(comments || []).length})</h4>
      {(comments || []).map((comment: Comment) => {
        <Media>
          <Media.Left>
            <img width={64} height={64} src={`/api/usercontent/${comment.logo}`} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>{comment.name} <i>{formatDateTime(comment.date)}</i></Media.Heading>
            <p>{comment.content}</p>
          </Media.Body>
        </Media>;
      })}
    </Media.Body>
  </Media>
);
export default SinglePost;

