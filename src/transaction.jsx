import { DeleteIcon, Edit } from "lucide-react";
import { Card, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { useState } from "react";

export default function Transactions({ transHistory, setTransHistory }) {
	const [trans, setTrans] = useState("");
	// const [transHistory, setTransHistory] = useState([]);
	const handleOnTrans = (e) => {
		setTrans(e.target.value);
	};
	const handleOnTransClick = () => {
		let amount = Number(trans);

		const newTransaction = {
			id: Date.now(),
			amount: amount,
			type: amount > 0 ? "income" : "expense",
			title: "Manual Entry",
			category: amount > 0 ? "Income" : "Expense",
			date: new Date().toLocaleString(),
		};

		setTransHistory((prev) => [...prev, newTransaction]);
		setTrans("");
	};

	const handleDelete = (id) => {
		setTransHistory((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<>
			<Card className="p-3 mb-3">
				<CardTitle className="flex flex-col items-start text-xl">
					Add Transactions
				</CardTitle>
				<div className="items-start">
					<div className="items-center flex flex-col-2 gap-5">
						<p></p>
						<input
							type="number"
							placeholder="0.00"
							className="border-2 border-slate-600 rounded-sm text-center"
							value={trans}
							onChange={handleOnTrans}></input>
						<Button onClick={handleOnTransClick}>Add Transaction</Button>
					</div>
				</div>
			</Card>

			{transHistory.map((t) => (
				<Card
					key={t.id}
					className="mb-3 hover:bg-linear-to-br from-purple-200 to-purple-300">
					<div className="flex justify-between px-4 py-1.5">
						<div className="flex flex-col items-start space-y-0.5   ">
							<div
								className={`inline-flex border-2 rounded-full ${
									t.type === "income" ? "bg-green-200" : "bg-red-200"
								}  px-2 py-1 text-xs`}>
								{t.category}
							</div>
							<p className="font-semibold mt-1">{t.title}</p>
							<div className="text-sm text-muted-foreground">{t.date}</div>
						</div>
						<div className="flex gap-5 items-center self-center">
							<p
								className={`${
									t.amount > 0 ? "text-green-500" : "text-red-500"
								} font-bold text-2xl`}>
								{t.amount >= 0 ? "+" : "-"}₹{Math.abs(t.amount)}
							</p>
							<button
								className="p-1.5 rounded-md text-red-500 hover:bg-red-100 hover:text-red-600 
                                            transition-colors duration-150 
                                            focus:outline-none"
								onClick={() => handleDelete(t.id)}>
								<DeleteIcon className="text-red-500 w-5 h-5" />
							</button>
						</div>
					</div>
				</Card>
			))}
		</>
	);
}
