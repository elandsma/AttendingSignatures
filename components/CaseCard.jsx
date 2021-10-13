import React, { useState } from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

export default function CaseCard(props) {
    const [isSelected, setIsSelected] = useState(props.previouslySelected);    
    let cardBackgroundColor = isSelected ? '#eaf7fc' : 'white';
    let avatarBackgroundColor = !isSelected ? "#F0F0F0" : "#bfe6f6";

    const handleClickCardBody = () => {
        if (isSelected) {
            props.handleCardDeselection(props.case.id)
        }
        else {
            props.handleCardSelection(props.case.id)
        }
        setIsSelected(!isSelected)
    }

    return (
        <Card style={{
            backgroundColor: cardBackgroundColor,
        }} >
            <CardActionArea onClick={() => {
                handleClickCardBody();
            }}>                
                <CardContent >          
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}       
                    >
                        <Grid item style={{ minWidth: "20%" }}>
                            <Avatar style={{ backgroundColor: avatarBackgroundColor, color: "black", height: "60px", width: "60px", fontSize:"16px"}}>
                                {isSelected ?                                    
                                    <CheckCircleIcon style={{ color: "#29aae2", width: "40px", height: "40px"}}/>
                                    :
                                    <> { (Redacted: Avatar Prop) }</>
                                }
                            </Avatar>
                        </Grid>
                        <Grid item zeroMinWidth style={{ textAlign: "left" }}>
                            <small>
                                (Redacted: data from props went in here.)
                            </small>
                        </Grid>
                    </Grid>
                </CardContent>                    
            </CardActionArea>
        </Card>
    );
}
