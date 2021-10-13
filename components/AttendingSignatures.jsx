import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import CaseCard from './CaseCard';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const progressContainerStyle = {
    position: 'absolute',
    top: '40%',
    textAlign: 'center',
};

const useStyles = makeStyles((theme) => ({
    cardsSpacing: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
}));

const SignButton = withStyles((theme) => ({
    root: {
        color: "#ffffff",
        backgroundColor: "#29aae2",
    },
}))(Button);

export default function AttendingSignatures() {
    const [unsignedCases, setUnsignedCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMakingPost, setIsMakingPost] = useState(false);
    const APIURL = 'api/AttendingSignatures';  
    const APIURLPOST = 'api/AttendingSignatures/Post'; 
    const [selectedCards, setSelectedCards] = useState([]);
    const classes = useStyles();
    const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
    const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [userHasConfirmed, setUserHasConfirmed] = useState(false);

    const getCases = async () => {
        setIsLoading(true)
        const res = await fetch(APIURL);
        const data = await res.json()
        setUnsignedCases(data);
        setIsLoading(false);
        console.log(data);
    }

    useEffect(() => {
        getCases()
    }, [])

    const openSuccessSnackbar = () => {
        setIsSuccessSnackbarOpen(true);
    }

    const openErrorSnackbar = () => {
        setIsErrorSnackbarOpen(true);
    }

    const handleSignSelectedCards = () => {
        setIsMakingPost(true)
        setIsLoading(true);
        axios.post(APIURLPOST, selectedCards)
            .then(res => {
                console.log("Payload:");
                console.log(JSON.stringify(selectedCards, null, 2));
                console.log("Response:");
                console.log(res);
                setIsMakingPost(false)
                if (res.status == "200") { openSuccessSnackbar(); }
                else { openErrorSnackbar(); }
                setSelectedCards([])    //reset state for selected cards
            }).catch(res => {
                setIsMakingPost(false);
                openErrorSnackbar();
            }).finally(() => {
                return getCases();
            });
    }
    
    const handleSignAllCards = () => {
        let allCards = [];
        unsignedCases.forEach((eachCase) => { 
            allCards.push(eachCase.id);
        });
        setIsMakingPost(true)
        setIsLoading(true);
        axios.post(APIURLPOST, allCards)
            .then(res => {
                setIsMakingPost(false)
                if (res.status == "200") { openSuccessSnackbar(); }
                else { openErrorSnackbar(); }
                setSelectedCards([]) 
            }).catch(res => {
                setIsMakingPost(false);
                openErrorSnackbar();
            }).finally(() => {
                return getCases();
            });
    }

    const handleCardSelection = (id) =>{
        setSelectedCards(selectedCards => [...selectedCards, id]);
        console.log("Selected Cards: " +selectedCards);
    }

    const handleCardDeselection = (id) => {
        let temp = selectedCards;
        temp = temp.filter(function (item) {
            return item!==id
        })
        setSelectedCards(temp)
    }

    let numSignatures = selectedCards.length;

    const renderCaseCards =()=>{
        if (unsignedCases.length === 0) {
            return <div>No Unsigned Cases</div>;
        }
        return (
            <>
                <h2>Your Unsigned Cases</h2>
                <h6 style={{ textAlign: "center" }}>You have <b>{unsignedCases.length}</b> unsigned cases</h6>
                <br /><br />
                <p>
                    Click on individual cases to select them for signing.
                </p><br/>
                8/29/2021    {/*In production this is an API call for today's date*/}
                <div className={classes.cardsSpacing}>
                    {unsignedCases.map(singleCase => (
                        <CaseCard
                            key={singleCase.id}
                            case={singleCase}
                            handleCardSelection={handleCardSelection}
                            handleCardDeselection={handleCardDeselection}
                            previouslySelected={selectedCards.some(caseID => caseID === singleCase.id)}
                        />
                    ))}
                </div>
                <div>
                {numSignatures !== 0 ?
                        <>
                            <SignButton variant="contained" size="large" onClick={handleSignSelectedCards} > Sign Selected Cases ({numSignatures})</SignButton>
                        </>
                    :
                        <>
                            <SignButton variant="contained" size="large" onClick={handleSignAllCards} > Sign All { unsignedCases.length } Cases</SignButton>
                        </>
                    }
                 </div>
            </>
        );
    }

    const chooseLoader = () => {
        if (isMakingPost) {
            return (
                <div style={progressContainerStyle} >
                    <h5>Submitting Signed Cases...</h5><br/>
                    <LinearProgress color='primary' variant="indeterminate" size="8rem"/>
                </div>
            )
        }
        return (
            <div style={progressContainerStyle}>
                <h5>Fetching Unsigned Cases...</h5><br />
                <CircularProgress color='primary' variant="indeterminate" size="8rem" />
            </div>            
        )
    }

    const handleCloseSuccessSnackbar = () => {
        setIsSuccessSnackbarOpen(false);
    }

    const handleCloseErrorSnackbar = () => {
        setIsErrorSnackbarOpen(false);
    }

    return (
        <div>
            {isLoading ?
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}>
                    {chooseLoader()}
                </div>
                :
                renderCaseCards()                    
            }
            <Snackbar open={isSuccessSnackbarOpen} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
                <SnackbarContent
                    style={{ backgroundColor: '#4caf50'}}
                    message={<span>Cases Signed Successfully</span>}
                />
            </Snackbar>
            <Snackbar open={isErrorSnackbarOpen} autoHideDuration={3000} onClose={handleCloseErrorSnackbar}>
                <SnackbarContent
                    style={{ backgroundColor: '#f44336' }}
                    message={<span>Error, please try again</span>}
                />
            </Snackbar>
            <Dialog open={isConfirmModalOpen}>
                <DialogTitle>Confirm Signature</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to sign these cases?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ConfirmationHandler/>
                </DialogActions>
            </Dialog>
        </div>
    );
}
