module.exports = {
    Query: {
        getConsignments: async (_, args, { Consignment }) => {
            const consignments = await Consignment.find({}).sort({ createdAt: 'desc' }).populate({
                path: 'transporter',
                model: 'Transporter',
            });
            return consignments;
        },
        getTransporters: async (_, args, { Transporter }) => {
            const transporters = await Transporter.find({});
            return transporters;
        },
    },
    Mutation: {
        createTransporter: async (_, { name, img }, { Transporter }) => {
            const newTransporter = await new Transporter({
                name,
                img,
            }).save();
            return newTransporter;
        },
        createConsignment: async (_, { country, transporterId, deliveryAddress, recipient, cashOnDelivery, note }, { Consignment }) => {
            const consignment = await new Consignment({
                country,
                transporter: transporterId,
                deliveryAddress,
                recipient,
                cashOnDelivery,
                note,
            }).save()
            return consignment;
        }
    }
}