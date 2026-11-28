const { Parser } = require("@json2csv/plainjs");


const expenses = [
    {
        title: "Current Bill",
        category: "Bills",
        amount: 100
    },
    {
        title: "Clothes",
        category: "Shopping",
        amount: 2000
    }
];
const fields = [
    {
        label: "Expense Title",
        value: "title"
    },
    {
        label: "Category",
        value: "category"
    },
    {
        label: "Amount (INR)",
        value: "amount"
    }
];


const parser = new Parser({
    fields: fields
});

const csv = parser.parse(expenses);

console.log(csv);