import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,} 
  from '../constants/cartConstants'

  export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST})
  
      const {userLogin: {userInfo} = getState()}

      const config = {
        headers: {
          'Content-Type': 'apllication/json',
          Authorization: `Bearer ${userInfo.token}`
        },
      }

      const {data} = await axios.post(`/api/orders/order`, order, config) 

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })

      dispatch(resetCart())
  } catch (error) {
    console.log('CHECK', error.response, error.message, error)
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}