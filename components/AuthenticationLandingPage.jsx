import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function AuthenticationLandingPage() {
    const { authtoken } = useParams();
    const { sessionid } = useParams();

    function makeAuthPost() {
        let apiurl = 'api/a/' + sessionid + '/' + authtoken;
        axios.post(apiurl)
            .then(res => {
                if (res.status === "200") {
                    //get redirect URL from response, go there.
                    // let redirectUrl = res.redirecturl 
                    //<Redirect to={'/etc/${redirectUrl}'}/>
                }
            }).catch(error => {
                if (error.response.status == 401) {
                    <Redirect to={'/401'} />
                }
                <Redirect to={'/AttendingSignatures/allErrors'} />
            }).finally(() => {
               //left for debugging
            });
    }

    const progressContainerStyle = {
        position: 'absolute',
        top: '20%',
        textAlign: 'center',
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
            {(!authtoken || !sessionid) ?
                <>
                    <br />
                    <h3>Please navigate to the portal, or click the link provided to you via SMS text</h3>
                </>
                :
                <>
                    <div style={progressContainerStyle} >
                        <h5>Authenticating...</h5><br />
                        <LinearProgress color='primary' variant="indeterminate" size="8rem" />
                    </div>
                    { makeAuthPost()}
                </>
            }
        </div>
     )
}