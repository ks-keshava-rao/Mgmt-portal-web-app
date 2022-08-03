/*Adding marks to new student*/
import React from 'react'
import Container from '@material-ui/core/Container'
import { TextField, Box, Typography, Paper, Grid, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaPlusCircle, FaTrash, FaCheckSquare, FaAngleRight, FaPlus } from "react-icons/fa";
import { useState, useRef } from 'react';
import axios from 'axios';
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

  const template = {
    subject: "",
    marks: ""
  }
  const packettemplate = {
    RollNumber: " ",
    subjectdata: []
  }
  const [data, updatedata] = useState([template]);
  const [visibility, setVisibility] = useState(false);
  const [verifyroll, setRoll] = useState({ rollNumber: "" });
  const dataPacket = useRef(packettemplate)
  const nameStudent = useRef("")
  const [disable, setDisable] = useState(false)
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
    alert("submitted successfully")
    setDisable(false)
    dataPacket.current = {
      rollNumber: verifyroll.rollNumber,
      studentName: nameStudent.current,
      subjectdata: data
    }
    console.log(dataPacket.current)
    try {
      const response = await axios.post('http://localhost:8080/newmarksrecord', dataPacket.current);

    }
    catch (err) {
      console.error(err)
    }

  }
  const verify = async () => {
    const response = await axios.get(`http://localhost:8080/student/${verifyroll.rollNumber}`);
    console.log(response.data);
    const { studentName } = response.data
    nameStudent.current = studentName;
    if (response.data.found) {
      alert("Roll number verified")
      setDisable(true);
      setVisibility(true)
    }
    else if (response.data.found === false || verifyroll.rollNumber === "") {
      alert("Enter valid roll number")
      updatedata([template]);
      setVisibility(false);
      // updatepacket(packettemplate);
    }
  }
  const handlecheck = (e) => {
    setRoll({ ...verifyroll, [e.target.name]: e.target.value })
    console.log(verifyroll);
  }
  return (
    <Container className={classes.root}>
      <Typography color='primary'
        align='center'
        variant='h3'
        className='mb-4'>
        Enter marks
      </Typography>

      <Grid container
        className='pb-4'
        spacing={4}>
        <Grid item md={3}>
          <TextField
            InputLabelProps={{
              classes: {
                root: classes.label
              }
            }}
            label='Roll number'
            variant='standard'
            id='standard-basic'
            fullWidth
            disabled={disable}
            name='rollNumber'
            onChange={(e) => { handlecheck(e) }}
            value={verifyroll.rollNumber}
            placeholder='Enter Roll number'

          />

        </Grid>
        <Grid item md={3}>
          <IconButton size='medium' onClick={() => verify()} color='primary' >
            <FaCheckSquare />
          </IconButton>
        </Grid>

      </Grid>

      {
        visibility ?
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
                      variant='filled'
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
                      variant='filled'
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
                      onClick={() => deletefield(index)}
                    >
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
                  className='m-5 mt-1'

                  color="primary"
                  onClick={() => addfield()}
                >Add  <FaPlus />
                </Button>
              </Box>
              <Box
                justifyContent="center">
                <Button
                  variant='contained'
                  className='m-1 mt-1'
                  color="primary"
                  onClick={() => handleSubmiit()}
                >submit <FaAngleRight />
                </Button>
              </Box>
            </Grid>
          </Paper>
          :
          <Typography color='secondary' align='center' variant='h5' className='mb-4'>
            Verify Roll Number to continue....
          </Typography>
          
      }
    </Container>

  )
}

export default Marks