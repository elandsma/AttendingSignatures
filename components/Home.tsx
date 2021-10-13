import * as React from 'react';
import { connect } from 'react-redux';
import AttendingSignatures from './AttendingSignatures';

const Home = () => (
    <div>
        <AttendingSignatures />
    </div>
);
export default connect()(Home);
