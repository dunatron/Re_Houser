import React, { Component } from 'react';

import LookPage from './look';

// 1.
export default class index extends Component {
  render() {
    return <LookPage />;
    return (
      <div>
        <h1>Re-Houser</h1>
        <p>Mission statement</p>
        <ul>
          <li>What we do</li>
        </ul>
        <p>Renter Steps</p>
        <ul>
          <li>
            1. Use "Look" button/page to look for housing that suits your search
            criteria
          </li>
          <li>2. apply as a group or solo towards a partially joined group </li>
          <ul>
            <li>How thios works</li>
          </ul>
        </ul>
        <p>Seller Steps</p>
        <ul>
          <li>1. Add property</li>
          <li>2. check your app/emails for successful applications/groups</li>
        </ul>
      </div>
    );
  }
}
