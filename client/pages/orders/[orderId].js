import Router from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: (payment) => Router.push('/orders'),
  });

  useEffect(() => {
    const calcTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    }

    calcTimeLeft();
    const timerId = setInterval(calcTimeLeft, 1000);

    return () => {
      clearInterval(timerId)
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order Expired</div>
  }
 
  return <div> 
    Time left to pay: {timeLeft} seconds
    <StripeCheckout 
      token={({ id }) => doRequest({ token: id })} 
      stripeKey="pk_test_51HT57QKlGze42p1rN8FccoRYD9MNsFzjHtnZM40Fq28pNncu7HpgC2WxatC1CeuJazB8Z4dtgXSmj8QnZQttr5w100euGy31xc"
      amount={order.ticket.price * 100}
      email={currentUser.email}
    />
    </div>
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data}
}

export default OrderShow