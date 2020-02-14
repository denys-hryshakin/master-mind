const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
    dialogs: [
        { id: 1, name: 'Andrey', time: 'Last seen at 13:50' },
        { id: 2, name: 'Genadiy', time: 'Last seen at 09:25' },
        { id: 3, name: 'Denis', time: 'Last seen at 08:12' },
        { id: 4, name: 'Dima', time: 'Last seen at 12:55' },
        { id: 5, name: 'Vadim', time: 'Last seen at 15:30' },
        { id: 6, name: 'Loren', time: 'Last seen at 16:00' }
    ],
    messages: [
        { id: 1, message: 'Hello!' },
        { id: 2, message: 'Hi' },
        { id: 3, message: 'How are you?' },
        { id: 4, message: 'Yeeeeep' },
        { id: 5, message: 'This is awesome!' },
        { id: 6, message: 'Are you kidding me?' }
    ],
    newMessageBody: ""
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, { id: 6, message: body }]
            };
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };

        default:
            return state;
    }
}

export const sendMessageAC = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyAC = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;