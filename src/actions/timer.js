import axios from 'axios'
import { SET_TIMER } from '../constants/timer'
import { ENDPOINTS } from '../utils/URL'

export const getTimerData = userId => {
    const url = ENDPOINTS.TIMER(userId);
    return async dispatch => {
        try {
            const res = await axios.get(url);
            if (res.status === 200) {
                dispatch(setTimer(res.data.pausedAt));
            } else {
                dispatch(setTimer(0));
            }
        } catch(e) {
            dispatch(setTimer(0));
        }
	}
}

export const startTimer = async (userId, seconds)  => {
    const url = ENDPOINTS.TIMER(userId);

    try {
        const res = await axios.put(url, {
            pausedAt: seconds,
            isWorking: true
        });
        return res.status;
    } catch(e) {
        return e.response.status;
    }
}

export const pauseTimer = (userId, seconds) => {
    const url = ENDPOINTS.TIMER(userId);

    return async dispatch => {
        try {
            const res = await axios.put(url, {
                pausedAt: seconds,
                isWorking: false
            });
            dispatch(setTimer(seconds));
            return res.status;
        } catch(e) {
            return e.response.status;
        }
    }
}

export const stopTimer = (userId) => {
    const url = ENDPOINTS.TIMER(userId);

    return async dispatch => {
        try {
            const res = await axios.put(url, {
                pausedAt: 0,
                isWorking: false
            });
            dispatch(setTimer(0));
            return res.status;
        } catch(e) {
            return e.response.status;
        }
    }
}

export const setTimer = data => ({
    type: SET_TIMER,
    payload: data,
})