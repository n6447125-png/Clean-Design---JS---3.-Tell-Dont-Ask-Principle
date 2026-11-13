const NotEligibleForMortgageException = require('../exceptions/NotEligibleForMortgageException');

module.exports = class Customer {
    static MAX_MORTGAGE_TO_BALANCE_RATIO = 2;
    static MESSAGE_NOT_ELIGIBLE = 'Customer is not eligible for mortgage!';

    #balance;
    #badCreditHistoryCount;

    constructor(id, firstName, lastName, balance, badCreditHistoryCount) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.#balance = balance;
        this.#badCreditHistoryCount = badCreditHistoryCount;
    }

    get balance() {
        return this.#balance;
    }

    applyForMortgage(amountRequested) {
        if (!this.#canBorrow(amountRequested))
            throw new NotEligibleForMortgageException(Customer.MESSAGE_NOT_ELIGIBLE);

        this.#balance += amountRequested;
    }

    #canBorrow(amountRequested) {
        return this.#hasCleanCreditHistory()
            && this.#hasPositiveBalance()
            && this.#canCover(amountRequested);
    }

    #hasCleanCreditHistory() {
        return this.#badCreditHistoryCount === 0;
    }

    #hasPositiveBalance() {
        return this.#balance > 0;
    }

    #canCover(amountRequested) {
        return this.#balance * Customer.MAX_MORTGAGE_TO_BALANCE_RATIO >= amountRequested;
    }
}
