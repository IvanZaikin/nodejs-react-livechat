import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {CTX} from './Store';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid gray'
    },
    chatWindow: {
        width: '70%',
        height: '300%',
        padding: '20px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    }
}));

export function Dashboard() {
    const classes = useStyles();

    const [textValue, changeTextValue] = React.useState('');

    const [allChats] = React.useContext(CTX);

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat app
                </Typography>
                <Typography variant="h5" component="h5">
                    Topic placeholder
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {['Test'].map(topic => (
                                <ListItem key={topic} button>
                                    <ListItemText primary="topic" />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {[{from: 'user', msg: 'hello'}].map((chat, index) => (
                            <div className={classes.flex} key={index}>
                                <Chip label={chat.from} className={classes.chip} />
                                <Typography variant='p'>{chat.msg}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Send chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                    />
                    <Button variant="contained" color="primary" className={classes.button}>
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    );
}