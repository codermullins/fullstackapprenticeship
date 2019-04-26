import React, { Component } from 'react';
import { Elements, StripeProvider } from "react-stripe-elements";
import Payments from "./Payments";

export default class Billing extends Component {
    render() {
        return(
            <StripeProvider apiKey="pk_test_OruS9IaXK2RojxNTqqeaaMKc">
                <div className="example">
                    <h1>Pay Your FSA Tuition</h1>
                    <Elements>
                        <Payments />
                    </Elements>
                </div>
            </StripeProvider>
        )
    }
}