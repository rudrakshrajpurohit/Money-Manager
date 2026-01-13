import { useState } from "react";

export default function Frontpage() {

    const [savings, setSavings] = useState(0);
    const [limit, setLimit] = useState(0);
    const [money, setMoney] = useState("");

    const handleOnChange = (e) => {
        setMoney(e.target.value);
    };

    const calculation = () => {


        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()
        let firstofmonth = new Date(year, month + 1, 1)
        let daysLeft = Math.ceil((firstofmonth - today) / (1000 * 60 * 60 * 24))


        let save = 0.20 * money;
        let spendable = money - save;
        let dailyLimit = spendable / daysLeft;

        setLimit(dailyLimit);
        setSavings(save);
    };

    return (
        <>
                <h1 className='flex text-3xl font-bold items-center justify-center'>
                    Money Manager
                </h1>
                <div className="px-8 py-10 flex items-center justify-center gap-4">
                    <h2>
                        ₹
                    </h2>
                    <input
                        type='number'
                        value={money}
                        onChange={handleOnChange}
                        placeholder='Enter Amount'
                        className="border rounded-b-sm place-content-center text-center h-10"
                    />
                    <button onClick={calculation}>Calculate</button>
                </div>
                <div>
                    <p>Your Savings: ₹ {savings}</p>
                </div>
                <div>
                    <p>Daily Spending Limit: ₹ {limit.toFixed(2)}</p>
                </div>
        </>
    )
}