import React from 'react';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

export default function DemoLandingPage() {

    const SignButton = withStyles((theme) => ({
        root: {
            color: "#ffffff",
            backgroundColor: "#29aae2",
        },
    }))(Button);

    const handleResetCasesButton = () => {
        const RESETURL = "api/reset"
        axios.get(RESETURL)
            .then(res => {
                console.log(res);
                if (res.status == "200") { alert(res.data);}
            }).catch(res => {
                alert("Reset failed, please try again");
            }).finally(() => {
                
            });
    }

    return (
        <div>
            <br/>
            <p><a href="/AttendingSignatures" target="_blank">
                <SignButton variant="contained" size="large"> View Demo</SignButton>
            </a><br/>(opens in new window)</p>
            <br />
            <SignButton variant="contained" size="large" onClick={handleResetCasesButton} > Reset Cases</SignButton>            
        </div>
    )
}