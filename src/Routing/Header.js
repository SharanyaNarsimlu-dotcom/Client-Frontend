import React, { useState } from 'react'
import './Header.css' 
import { Box, Button, FormHelperText, Grid, ListItemButton, ListItemIcon, TextField, Typography, colors} from "@mui/material";
import { Link, NavLink } from 'react-router-dom';
import AddUser from '../Components/AddUser';
import ViewClient from '../Components/ViewClient';

import { useNavigate } from "react-router-dom";


const Header = () => {
  const [btnValMI, setBtnValMI] = useState([1,0]);

  let navigate = new useNavigate();

  const handlenavigate = () =>{
    navigate('./adduser')
  }
  return (
    <div>
       <Grid container spacing={2}>
    <Grid item sm={1/2}></Grid>
        <Grid item sm={22/2} className='header'>
            <Typography sx={{fontSize:"2em"}}>Client</Typography>
            <Button sx={{color:'white'}}>
            {btnValMI[0] == 1 ? (
              <Box className="opAct,btnCss">
                <Typography className="bb">View</Typography>
              </Box>
            ) : (
              <Box
                className="btnCss"
                onClick={() => {
                  setBtnValMI([1,0]);
                }}
              >
               View
              </Box>
            )}
            </Button>
            <Button sx={{color:'white'}}>
            {btnValMI[1] == 1 ? (
              <Box className="opAct,btnCss">
                <Typography className="bb">AddUSer</Typography>
              </Box>
            ) : (
              <Box
                className="btnCss"
                onClick={() => {
                  setBtnValMI([0,1]);
                }}
              >
               AddUSer
              </Box>
            )}
            </Button>
          
          
                  </Grid>
        <Grid item sm={1/2}></Grid>
       <Box>
       {btnValMI?.[0] == 1 && (
              <Typography>
                <ViewClient />
              </Typography>
            )}
        {btnValMI?.[1] == 1 && (
              <Typography>
                <AddUser />
              </Typography>
            )}
       </Box>

       </Grid>
    </div>
  )
}

export default Header