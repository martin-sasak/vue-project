import { gql } from 'apollo-boost';

export const GET_TRANSPORTERS = gql`
    query {
        getTransporters {
            id
            name
            img
        }
    }
`;

export const GET_CONSIGNMENTS = gql`
    query {
        getConsignments {
            id
            country
            transporter {
                name
                img
            }
            deliveryAddress
            recipient
            cashOnDelivery
            note
            createdAt
        }
    }
`;

export const CREATE_CONSIGNMENT = gql`
    mutation(
        $country: String!
        $transporterId: ID!
        $deliveryAddress: String!
        $recipient: String!
        $cashOnDelivery: Boolean
        $note: String!
    ) {
        createConsignment(
            country: $country
            transporterId: $transporterId
            deliveryAddress: $deliveryAddress
            recipient: $recipient
            cashOnDelivery: $cashOnDelivery
            note: $note
        ) {
            id
            createdAt
        }
    }
`;
