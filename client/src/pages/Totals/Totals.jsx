import "./Totals.css";

const Totals = ({ income, expense }) => {
  return (
    <div className="income-expense-totals">
      <div className="income-total box">
        <p className="c">INCOME</p>
        {income == 0 ? <>{"No Income "}</> : <>{"₹ " + income}</>}
      </div>
      <div className="expense-total box">
        <p className="c">EXPENSE</p>
        {expense == 0 ? <>{"No Expenses "}</> : <>{"₹ " + expense}</>}
      </div>
    </div>
  );
};

export default Totals;
