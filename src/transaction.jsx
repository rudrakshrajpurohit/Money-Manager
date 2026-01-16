import { DeleteIcon, Edit, Trash, Trash2, Trash2Icon, TrashIcon } from "lucide-react";
import { Card, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select"
import { Calendar22 } from "./components/ui/datepicker";


export default function Transactions({ transHistory, setTransHistory }) {
    const [trans, setTrans] = useState("");
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("income");
    const [dateValue, setDateValue] = useState(undefined);


    const onSelectChange = (value) => {
        setType(value);
    };
    
    const handleOnTrans = (e) => {
        setTrans(e.target.value);
    };

    const handleOnTransClick = () => {
        let amount = Number(trans);

        const newTransaction = {
            id: Date.now(),
            amount: amount,
            title: "Manual Entry",
            category: type == "income" ? "Income" : "Expense",
            date: dateValue,
        };

        setTransHistory((prev) => [newTransaction, ...prev]);
        setTrans("");
    };

    const handleDelete = (id) => {
        setTransHistory((prev) => prev.filter((t) => t.id !== id));
    };

    const sortedTransList = [...transHistory].sort(
        (a, b) => b.date - a.date,
    );

    return (
        <>
            <div className="flex items-center justify-end">
                <Button onClick={() => setOpen(true)} className="fixed bottom-10 w-14 h-14 flex items-center justify-center rounded-full text-white text-3xl bg-indigo-600 leading-14 text-center" style={{ zIndex: 1 }}>
                    +
                </Button>
            </div>

            {sortedTransList.map((t) => (
                <Card
                    key={t.id}
                    className="mb-3 hover:bg-accent/90 transition-colors hover:scale-105 z-10">
                    <div className="flex justify-between px-4 py-1.5">
                        <div className="flex flex-col items-start space-y-0.5   ">
                            <div
                                className={`inline-flex border-2 rounded-full ${t.category === "Income" ? "bg-green-200" : "bg-red-200"
                                    }  px-2 py-1 text-xs`}>
                                {t.category}
                            </div>
                            <p className="font-semibold mt-1">{t.title}</p>
                            <div className="text-sm text-muted-foreground">{t.date ? t.date.toLocaleDateString() : "No date"}</div>
                        </div>
                        <div className="flex gap-5 items-center self-center">
                            <p
                                className={`${t.category === "Income" ? "text-green-500" : "text-red-500"
                                    } font-bold text-2xl`}>
                                {t.category === "Income" ? "+" : "-"}₹{Math.abs(t.amount)}
                            </p>
                            <button
                                className="p-1.5 rounded-md text-red-500 hover:bg-red-100 hover:text-red-600 
                                            transition-colors duration-150 
                                            focus:outline-none"
                                onClick={() => handleDelete(t.id)}>
                                <Trash2 className="text-red-500 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </Card>
            ))}

            {open && (
                <>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center flex" onClick={() => setOpen(false)}>
                        <Card className="p-3 mb-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between">
                                <CardTitle className="flex flex-col items-start text-xl px-4">
                                Add Transactions
                            </CardTitle> 
                            <div className="px-4 border-2 rounded-full text-white bg-black text-center leading-5 cursor-pointer hover:scale-105"onClick={() => setOpen(false)}>
                                <p>x</p>
                            </div>
                            </div>
                           
                            <div className="items-center">
                                <div className="items-start grid grid-cols-2 gap-5 mb-5">
                                    <div className="justify-between">
                                        <p className="font-semibold mb-3 items-start">Transaction Type</p>
                                        <Select onValueChange={(value) => onSelectChange(value)} value={type}>
                                            <SelectTrigger className="w-45">
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectItem value="income">Income</SelectItem>
                                                <SelectItem value="expense">Expense</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="items-start">
                                        <p className="font-semibold mb-3 items-start">Date</p>
                                        <Calendar22 date={dateValue} setDate={setDateValue} />
                                    </div>
                                </div>
                                <div className="flex grid-cols-2 gap-5 justify-between">
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
                    </div>
                </>
            )}
        </>
    );
}
