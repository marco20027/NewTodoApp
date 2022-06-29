import './App.css';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, Input } from '@mui/material';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/node/Typography';

function App(props) {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [todoEdit, setTodoEdit] = useState(null)
  //modale
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(e)
    const newTodo = {
      id: new Date().getTime(),
      text: input,
      completed: false,
    }
    setTodos([...todos].concat(newTodo))
    setInput('')
    console.log(newTodo)
  }

  const deleteTodo = (id) => {
    const updateTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updateTodos)
    console.log(updateTodos)
  }

  const completeCheck = (id) => {

    const updateTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updateTodos)
    console.log(updateTodos)
  }

  const callServer = () => {
    fetch('http://localhost:3000/').then(response => response.json())
      .then(data => console.log(data))
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="App">
      <h1>Todo-App</h1>
      <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Todo" variant="outlined" onChange={(e) => setInput(e.target.value)} value={input} /><br></br><br></br>
        <Button className='buttonTodo' type='submit' variant="contained" vspace='3'>Aggiungi Todo</Button>
      </form><br></br><br></br>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Todo N</TableCell>
            <TableCell align="center">Todo ID</TableCell>
            <TableCell align="center">Todo Nome</TableCell>
            <TableCell align="center">Todo Completamento</TableCell>
            <TableCell align='center'>Cancella Todo</TableCell>
            <TableCell align='center'>Modifica Todo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map(todo => (
            <TableRow
              key={todo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell align="center">{todo.id}</TableCell>
              <TableCell align="center">
                {todo.text}
              </TableCell>

              <TableCell align="center">
                <Checkbox onChange={() => completeCheck(todo.id)}
                  checked={todo.completed} /></TableCell>

              <TableCell align='center'><Button
                className='deleteTodo'
                type='submit'
                variant='contained'
                color="error"
                onClick={() => deleteTodo(todo.id)}>
                Cancella</Button>
              </TableCell>

              <TableCell align='center'>
                <Button
                  variant='outlined'
                  onClick={handleOpen}>
                  Modifica Todo</Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                        Modifica Todo
                      </Typography>
                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <TextField id="standard-basic" label="Standard" variant="standard" />

                        <Button variant='outlined' color='success' onClick={setTodoEdit}>Modifica</Button>

                      </Typography><br></br>
                      <Button variant='outlined' color='error' onClick={handleClose}>Chiudi</Button>
                    </Box>
                  </Fade>
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
