import React, { useState } from 'react'
import './Todo.css'
import db from './firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import { List, ListItem, ListItemText, Modal, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function Todo(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = (e) => {
        //update todo with new input text
        db.collection('todos').doc(props.text.id).set({
            todo: input
        }, { merge: true })
        setOpen(false);
        e.preventDefault();
    }

    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>Let's change your work.</h1>
                    <form>
                        <input placeholder={props.text.todo} value={input} onChange={e => setInput(e.target.value)} />
                        <Button disabled={!input} type="submit" variant="contained" color="secondary" onClick={updateTodo}>Update existing todo...</Button>
                    </form>
                </div>
            </Modal>
            <List className="listItemCard">
                <ListItem>
                    <ListItemText primary={props.text.todo} />
                </ListItem>
                <Button variant="outlined" color="primary" onClick={e => setOpen(true)}>Edit me?</Button>
                <DeleteIcon onClick={event => db.collection('todos').doc(props.text.id).delete()} />

            </List>
        </>
    )
}

export default Todo
