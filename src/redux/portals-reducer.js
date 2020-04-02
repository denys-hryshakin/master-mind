const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_PORTALS = 'SET-PORTALS';

let initialState = {
    portals: []
};

const portalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                portals: state.portals.map(p => {
                    if (p.id === action.portalId) {
                        return { ...p, followed: true }
                    }
                    return p;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                portals: state.portals.map(p => {
                    if (p.id === action.portalId) {
                        return { ...p, followed: false }
                    }
                    return p;
                })
            }
        case SET_PORTALS:
            return { ...state, portals: action.portals }
        default:
            return state;
    }
}

export const follow = (portalId) => ({ type: FOLLOW, portalId });
export const unfollow = (portalId) => ({ type: UNFOLLOW, portalId });
export const setPortals = (portals) => ({ type: SET_PORTALS, portals });
export default portalsReducer;