import { sendMessage, updateNewMessageBody } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}


const DialogsContainer = connect(mapStateToProps, {sendMessage, updateNewMessageBody} )(Dialogs);

export default DialogsContainer;