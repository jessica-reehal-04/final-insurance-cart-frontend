import React, { useState } from 'react';
import { useOrder } from './OrderContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField } from "@material-ui/core";
import { blue } from '@mui/material/colors';
import Chip from '@mui/material/Chip';

function ContextApp(props) {
    const {
        cart,
        order,
        userId,
        purchaseDate,
        udm,
        setUdm,
        addOrder,
        deleteCart,
        orderPrice
    } = useOrder();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));





    return (
        <div>

            <Item>
                <toolbar>
                    <h1>YOUR CART</h1>
                    <div>
                        {cart?.length === 0 ? (
                            <h2>Your cart is empty!</h2>
                        ) : (
                            <h2>Total Price: {orderPrice} <Button onClick={addOrder} variant="contained" color="primary">
                                Buy Now
                            </Button></h2>
                        )}
                    </div>



                </toolbar>
                {cart?.map((c) => (
                    <div className='card' key={c.policy.policyId}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '50vh',
                            }}
                        >
                            <Card sx={{
                                width: 600,
                                backgroundColor: '#D9E3F5', // Light background color
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
                                borderRadius: '8px',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },

                            }} variant="outlined">
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        <b><h2>{c.policy.policyName}</h2></b>
                                    </Typography>
                                    <Typography component="div">
                                        <b>{c.policyCompany}</b>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {c.policy.policyType.policyTypeValue} Insurance
                                    </Typography>
                                    <Typography color="text.secondary">
                                        <b>$ {c.price}</b>
                                    </Typography>
                                    <Typography variant="body2">
                                        {c.policy.benefit.benefitValue.replace(/"/g, ' ')}
                                    </Typography>
                                    <br />
                                    <Button onClick={() => deleteCart(c.cartRequestId)} variant="outlined" color="error">
                                        REMOVE
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>

                    </div>
                ))}
            </Item>

            <Item>


            </Item>


        </div>
    );
}

export default ContextApp;
