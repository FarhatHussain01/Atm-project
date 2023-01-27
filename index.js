#!/usr/bin/env node
import inquirer from "inquirer";
async function input() {
    const userinput = await inquirer //  userinput type is object in which only string is allowed
        .prompt([
        {
            name: "userinput",
            message: "Enter you user id",
            type: "input"
        },
        {
            name: "userpin",
            message: "Enter you pin",
            type: "password"
        }
    ]);
    console.log(userinput.userid);
    console.log(userinput.userpin);
    // create an object which include userpin ,userid and amount which we can generate randomly 
    const userdata = {
        userid: userinput.userid,
        userpin: userinput.userpin,
        amount: Math.floor(Math.random() * 9786 + 1) // math.floor ignores the decimel point
    };
    // console.log(userdata)
    // adding ATM Features here
    const selectopt = await inquirer
        .prompt([
        {
            name: "options",
            message: "select any of Option",
            type: "list",
            choices: ["cashWithdrawl", "cashDeposit", "exit"]
        }
    ]);
    //console.log(selectopt)
    if (selectopt.options == "cashWithdrawl") {
        console.log("your current amount ", userdata.amount);
        const enteredAmount = await inquirer
            .prompt([
            {
                name: "amount",
                message: "how much amount you want to WithDraw",
                type: "number",
                validate: (input, answers) => {
                    if (input > userdata.amount) {
                        return "Insufficient Balance ";
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        console.log(enteredAmount.amount);
        const remainingamount = userdata.amount - enteredAmount.amount;
        console.log("Amount After Withdrawl ", remainingamount);
    }
    else if (selectopt.options == "cashDeposit") {
        console.log("your current amount ", userdata.amount);
        const AddAmount = await inquirer
            .prompt([
            {
                name: "Addamount",
                message: "how much amount you want to Deposit",
                type: "number"
            }
        ]);
        console.log(AddAmount.Addamount);
        console.log(`Amount After deposit ${userdata.amount + AddAmount.Addamount} `);
    }
}
;
await input();
// this functionality ask the user if you want to recalculate 
async function startagain() {
    do {
        await input(); // call the ask questionftn here so that the above are repeats here
        var again = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: "do you want to continue? Pyress y or n: "
        });
    } while (again.restart == 'y' || again.restart == 'yes' || again.restart == 'Y' || again.restart == 'YES');
}
startagain();
