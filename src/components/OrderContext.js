import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState([]);
  const [userId, setUserId] = useState(2);
  const [policyAddOn, setPolicy] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(formattedDate);
  // const [cartReqIds,setCartReqIds]=useState([])


  const [udm, setUdm] = useState({
    userName: '',
    age: 0,
    isTobaccoConsumer: false,
    doesUserDrink: false,
    nomineeName: '',
    nomineeAge: 0,
    nomineeRelation: ''
  });
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8010/shoppingcart/1/buyCart');
      return response.data;

      console.log(orderPrice)


    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };


  useEffect(() => {
    const fetchAndSetCart = async () => {
      const data = await fetchCartItems();
      setCart([...data]);
      try {
        const response = await axios.get('http://localhost:8010/shoppingcart/getTotalPrice/1');
        setOrderPrice(response.data);

      } catch (error) {
        console.error('Error fetching cart items:', error);
      }

      //  let cartRequestArray=[]
      //  cart?.map((c)=>(
      //     cartRequestArray.push(c.cartRequestId)
      //  ))
      // //  console.log(cartRequestArray)
      //  setCartReqIds(prevArray => [...prevArray, ...cartRequestArray]);



    };

    fetchAndSetCart();


  }, []);
  //   console.log(cart)
  // console.log(cartReqIds);

  const calculateTotalOrderPrice = () => {
    return cart?.reduce((total, c) => total + c.price, 0) || 0;
  };



  //   console.log(orderPrice)
  const deleteCart = (cartId) => {
    try {
      // Replace 'your_api_endpoint' with the actual URL of your API endpoint
      const response = axios.delete(`http://localhost:8010/shoppingcart/deleteItemFromCart/${cartId}`);

      // Handle the response or perform additional actions
      console.log('Deleted successfully:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error deleting data:', error.message);
    }
    console.log(cartId);
    window.location.reload();
  }




  const addOrder = () => {
    // const totalOrderPrice = calculateTotalOrderPrice();


    let policyArray = []
    let res = 0;
    cart.forEach(element => {
      policyArray.push({
        "policyId": element.policy.policyId,
        "price": element.price
      })


      res += element.price

    });



    setPolicy((prevPolicyAddOn) => {

      const updatedPolicyAddOn = [...prevPolicyAddOn, ...policyArray];

      return updatedPolicyAddOn;
    });


    setOrder((prevOrder) => {

      const updatedOrder = [
        ...prevOrder,
        { userId, purchaseDate, policyAddOn: [...policyArray], udm, orderPrice: res },
      ];
      console.log(updatedOrder[0]);

      const headers = {
        'Content-Type': 'application/json',

      };

      axios.post("http://localhost:8020/order/addOrderWithUserDetails", updatedOrder[0], { headers }).then((response) => {
        console.log(response.status);
      });
    })

    try {

      const response = axios.delete(`http://localhost:8010/shoppingcart/deleteByUserId/1`);
      console.log('Deleted successfully:', response.data);
    } catch (error) {

      console.error('Error deleting data:', error.message);
    }
    window.location.reload();



  };

  const contextValue = {
    cart,
    order,
    userId,
    purchaseDate,
    udm,
    setUdm,
    addOrder,
    deleteCart,
    orderPrice
  };



  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};
