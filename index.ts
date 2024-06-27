import inquirer from "inquirer";

// Bank Account interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

// Bank account class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  //Debit Money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Withdrawal of $${amount} successful. Remaining balance is $${this.balance}`
      );
    } else {
      console.log("Insufficient balance.");
    }
  }

  // Credit Money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; //$1 fee charged if more than 100 dollar is depossited.
    }
    this.balance += amount;
    console.log(
      `Deposit of $${amount} successful. Remaining balance $${this.balance}`
    );
  }

  //Check balance
  checkBalance(): void {
    console.log(`Current balance $${this.balance}`);
  }
}

// customer class
class customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

// Create bank account.
const accounts: BankAccount[] = [
  new BankAccount(7861, 500),
  new BankAccount(7862, 1000),
  new BankAccount(7863, 2000),
];

// Create customer class
const customers: customer[] = [
  new customer("Manahil", "Nadeem", "female", 35, 2849334, accounts[0]),
  new customer("Fayaz", "Khan", "male", 32, 78392022, accounts[1]),
  new customer("Haseeb", "Malik", "male", 22, 67302202, accounts[2]),
];

//function to interact with bank account

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "accountNumber",
      type: "number",
      message: "Enter your account number:",
    });

    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      console.log(`welcome ${customer.firstName} ${customer.lastName}!\n`);
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: "Select an operation",
          choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to deposit:",
          });
          customer.account.deposit(depositAmount.amount);
          break;
        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to withdraw:",
          });
          customer.account.withdraw(withdrawAmount.amount);
          break;
        case "Check Balance":
          customer.account.checkBalance();
          break;
        case "Exit":
          console.log("Exiting bank programme...");
          console.log(
            "\n Thank you for using our bank services. Have a great day!"
          );
          return;
      }
    } else {
      console.log("Invalid account number. Please try again.");
    }
  } while (true);
}

service();
