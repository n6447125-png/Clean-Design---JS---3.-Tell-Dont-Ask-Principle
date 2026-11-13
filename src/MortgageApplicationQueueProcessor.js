const WrongDataException = require('./exceptions/WrongDataException');

class MortgageApplicationQueueProcessor {
    #customerRepository;

    constructor(customerRepository) {
        this.#customerRepository = customerRepository;
    }

    processRequest(customerId, amountRequested) {
        const customer = this.#findCustomer(customerId);

        customer.applyForMortgage(amountRequested);
    }

    #findCustomer(customerId) {
        const customer = this.#customerRepository.get(customerId);

        if (customer === null)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);

        return customer;
    }
}

MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER = 'Customer not found!';

module.exports = MortgageApplicationQueueProcessor;
