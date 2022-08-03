/*Editing student marks component (dynamic form)*/
import React from 'react'
import Container from '@material-ui/core/Container'
import { TextField, Box, Typography, Paper, Grid, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaPlusCircle, FaTrash, FaPen, FaCheckSquare, FaAngleRight, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90",
    height: "90",
    backgroundColor: theme.palette.grey[55],
    paddingTop: theme.spacing(5),
  },
  inputFields: {
    marginBottom: theme.spacing(1)
  },
  label: {
    backgroundColor: "white"
  }
}));

const Marks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const template = {
    subject: "",
    marks: ""
  }
  const packettemplate = {
    RollNumber: " ",
    subjectdata: []
  }
  const [data, updatedata] = useState([]);
  const restdata = useRef(
    {
      studentName: "",
      rollNumber: ""
    })
  const dataPacket = useRef(packettemplate)
  const nameStudent = useRef("")
  const classes = useStyles();
  const addfield = () => {
    updatedata([...data, template])
  }
  const handleInput = (e, index) => {
    const updatedData = data.map((element, location) => (
      index === location
        ? Object.assign(element, { [e.target.name]: e.target.value })
        : element
    ))
    console.table(updatedData);
    updatedata(updatedData);
  }
  const deletefield = (index) => {
    const filteredData = [...data]
    filteredData.splice(index, 1);
    updatedata(filteredData);
  }
  const handleSubmiit = async () => {
    console.log("submitted");
    dataPacket.current = {
      subjectdata: data
    }
    console.log(dataPacket.current)
    try {
     const response = await axios.post(`http://localhost:8080/marksupdate/${id}`,dataPacket.current)
     if(response.data.updated){
      alert("Successfully updated")
     }
     else{
      alert("Couldn't update")
     }
    }
    catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    (async () => {try {
      console.log(id);
      const result = await axios.get(`http://localhost:8080/studentmarks/${id}`);
      console.log(result.data.fetched_data.subjectdata)
      console.log(result.data.fetched_data.rollNumber)
      console.log(result.data.fetched_data.studentName)
      restdata.current.rollNumber = result.data.fetched_data.rollNumber;
      restdata.current.studentName = result.data.fetched_data.studentName;

      result.data.fetched_data.subjectdata.map((serverdata, index) => {
        updatedata(prevstate => [...prevstate, serverdata])
      })
    }
    catch (err) {
      console.log(err)
    }}) ()
    /*Unmounting*/
    return (
      () => {
      updatedata([])
    })
  }, []);
  return (
    <Container className={classes.root}>
      <Typography color="primary"
        align='center'
        variant='h3'
        style={
          {
            textTransform: "uppercase",
            fontWeight: '400',
            position: "relative"
          }
        }
        className='mb-4 pt-3'>
        {restdata.current.studentName} : {restdata.current.rollNumber} <FaPen />
      </Typography>
      <Grid container className='pb-4'
        spacing={4}>
        <Grid item md={3}>
          <IconButton size='medium'
            onClick={() => navigate('/viewmarks')}
            color='secondary' >
            <FaArrowLeft />
          </IconButton>
        </Grid>
      </Grid>
      <Paper component={Box} p={4} >
        {
          data.map((subdata, index) =>
          (
            <Grid container
              justifyContent="center"
              key={index}
              spacing={6}
              className={classes.inputFields}
            >
              <Grid item md={4}>
                <TextField
                  label="Subject"
                  placeholder='Enter subject name'
                  variant='standard'
                  id='filled-basic'
                  name='subject'
                  fullWidth
                  onChange={(e) => handleInput(e, index)}
                  value={subdata.subject}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Marks"
                  placeholder='Enter marks'
                  variant='standard'
                  id='filled-basic'
                  name='marks'
                  fullWidth
                  onChange={(e) => handleInput(e, index)}
                  value={subdata.marks}
                />
              </Grid>
              <Grid item className='pb-1' md={3}>
                <IconButton
                  color="secondary"
                  onClick={() => deletefield(index)}>
                  <FaTrash />
                </IconButton >
              </Grid>
            </Grid>
          ))
        }
        <Grid container>
          <Box
            md={3}
            justifyContent="center">
            <Button
              variant='contained'
              className='m-5 mt-1 bg-warning'
              color="secondary"
              onClick={() => addfield()}
            >Add  <FaPlus />
            </Button>
          </Box>
          <Box
            justifyContent="center">
            <Button
              variant='contained'
              className='m-1 mt-1 bg-success'
              color="primary"
              onClick={() => handleSubmiit()}
            >Update <FaAngleRight />
            </Button>
          </Box>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Marks