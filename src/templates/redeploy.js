import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { debounce } from 'lodash';

export default function singlePost() {
  const redeploy = debounce(() => {
    axios
      .post('https://api.netlify.com/build_hooks/5f86b2f3a05d0d7bb9058107')
      .then(() => {
        alert(
          'Redploy triggered - your changes should be live in a few minutes'
        );
      });
  }, 500);

  return (
    <Layout>
      <SEO title="Redeploy" />
      <Row>
        <Col>
          <h1>Deploy site with latest changes?</h1>
          <p>
            Your site deploys twice a day at midday and 6pm. If you have content
            that needs to be updated before one of these times, use the button
            below to trigger a redeploy.
          </p>
          <Alert variant="info">
            Do not use this for every day use, it should only be used for
            time-sensitive changes
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col className="mx-auto">
          <Button
            variant="danger"
            onClick={({ target }) => {
              target.disabled = true;
              redeploy();
            }}
          >
            Redeploy site
          </Button>
        </Col>
      </Row>
    </Layout>
  );
}
