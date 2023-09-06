import { Box, Button, Grid, IconButton, Modal, TablePagination, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import UpdClient from './UpdClient';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ccc",
        color: "black",

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,

    },
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const buttonStyles = {
    position: "absolute",
    top: "5px",
    right: "10px",
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
const ViewClient = () => {
    const [Open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [search, setSearch] = useState([]);

    const [selected, setSelected] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [clientList, setClientList] = useState([])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        clients();
    }, [])
    const clients = async () => {

        try {
            const response = await fetch(
                `http://localhost:3003/api/v1/client/getAll`,

            );
            const clients = await response.json();
            console.log("clients", clients)
            setClientList(clients?.data);
        } catch (err) {
            console.error(err.message);
        }


    }
    let navigate = new useNavigate();

    console.log("client===", clientList)
    const DeleteClient = async (row) => {
        console.log("first", row.ID)
        try {
            const response = await fetch(
                `http://localhost:3003/api/v1/client/dltclient/${row.ID}`,
                {
                    method: "DELETE",
                    headers: {
                        "x-access-token": "token",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            const parseRes = await response.json();
           
            alert("Deleted Successfully!");
            // window.location.reload();
            clients();
        } catch (error) {
            console.log(error.message);
            alert("not done!");
        }
    }
    const handleSearch = async(e) =>{
        const body = search;
    console.log(body);

    if (e.target.value) {
      try {
        const response = await fetch(
          `http://localhost:3003/api/v1/client/searchbyname/${e.target.value}`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            //   "x-access-token": token,
            },
            params: body,
          }
        );
        console.log("fetch get method called");
        const resData = await response.json();
        console.log(resData);
        setClientList(resData?.data)
      } catch (err) {
        console.error(err.message);
        console.log("data not found");
      }
      setSearch();
    }else{
        clients();
    }
}
    return (
        <Box sx={{ border: "0.5px solid black", width: "90%", margin: "0px 0px 0px 4.7%",height:"auto" }}>
            <Grid container spacing={2} sx={{ padding: "1%" }}>
                <Grid item sm={6} align='left'>
                    <Typography variant="h5" sx={{ fontFamily: "Robot Slab" }}><b >Client Records</b></Typography>
                </Grid>
                <Grid item sm={6} align='left'>
                    <TextField
                    size='small'
                    fullWidth
                    placeholder="Search By Name"
                    // value={search}
                    onChange={handleSearch}
                    > 
                    </TextField>
                   
                </Grid>
              
                <Grid item sm={1}></Grid>
                <Grid item sm={12} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1200 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Sl.No</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="left">Email</StyledTableCell>
                                    <StyledTableCell align="left">Phone</StyledTableCell>
                                    <StyledTableCell align="left">Address</StyledTableCell>
                                    <StyledTableCell align="left">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            {clientList?.length != 0 ? (

                                <TableBody>

                                    {clientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                                            <>

                                                <StyledTableRow >
                                                    <StyledTableCell>
                                                        {index + 1}
                                                    </StyledTableCell>
                                                    <StyledTableCell  >
                                                        {row.Name}
                                                    </StyledTableCell>
                                                    <StyledTableCell  >
                                                        {row.Email}
                                                    </StyledTableCell>

                                                    <StyledTableCell >
                                                        {row.Phone}
                                                    </StyledTableCell>

                                                    <StyledTableCell >
                                                        {row.Address}
                                                    </StyledTableCell>

                                                    <StyledTableCell>
                                                        <Tooltip title="Edit Client">
                                                            <IconButton>
                                                                <ModeEditOutlineIcon
                                                                    fontSize="small"
                                                                    className="visibilityIcon"
                                                                    onClick={() => {
                                                                        setSelected(row);
                                                                        setOpen(true)
                                                                    }}
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete Client">
                                                            <IconButton>
                                                                <DeleteIcon
                                                                    fontSize="small"
                                                                    className="visibilityIcon"
                                                                    onClick={() => DeleteClient(row)}
                                                                />
                                                            </IconButton>
                                                        </Tooltip>

                                                    </StyledTableCell>



                                                </StyledTableRow>

                                            </>


                                        ))}
                                </TableBody>
                            ) : (
                                "No Patient Found"
                            )}
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10, 25, 100]}
                        component="div"
                        count={clientList?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Modal
                        open={Open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Grid item sm={12}>
                                <Close onClick={handleClose} style={buttonStyles} />
                            </Grid>
                            <UpdClient data={selected} />
                            <Grid item>

                            </Grid>
                        </Box>

                    </Modal>
                </Grid>


                <Grid item sm={1}></Grid>

            </Grid>
        </Box>
    )
}

export default ViewClient