import { Card } from './components/ui/card';
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import Transactions from './transaction';
import Budget from './budget';
import { useState } from 'react';

export default function Dashboard({ transHistory, setTransHistory }) {
    console.log("Dashboard ledger:", transHistory)
    const income = transHistory
        .filter(t => t.category == "Income")
        .reduce((sum, t) => sum + t.amount, 0)

    const expense = transHistory
        .filter(t => t.category == "Expense")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const balance = income - expense
    return (
        <>
            <div style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
            }}>

            </div>
            <div style={{ position: "relative", zIndex: 1 }}>


                {/* Heading */}
                <div className=''>
                    <div className='flex flex-col items-start mb-8'>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Spendly</h1>
                        <p>Track expenses, set budgets, and analyze your spending</p>
                    </div>
                    <div>
                        
                    </div>
                </div>

                {/* Information Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-10'>

                    <Card className="p-6 bg-linear-to-br from-green-50 to-green-100 border-primary/20 hover:scale-105 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                                <p className="text-3xl font-bold text-foreground">{income}</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-primary opacity-20" />
                        </div>
                    </Card>

                    <Card className="p-6 bg-linear-to-br from-red-100 to-red-200 hover:scale-105 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Expense</p>
                                <p className="text-3xl font-bold text-foreground">{expense}</p>
                            </div>
                            <TrendingDown className="w-12 h-12 text-primary opacity-20" />
                        </div>
                    </Card>

                    <Card className="p-6 bg-linear-to-br from-slate-200 to-slate-300 hover:scale-105 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                                <p className="text-3xl font-bold text-foreground">{balance}</p>
                            </div>
                            <DollarSign className="w-12 h-12 text-primary opacity-20" />
                        </div>
                    </Card>

                    {/* <Card className="p-6 from-primary/5 to-primary/10 border-primary/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                                <p className="text-3xl font-bold text-foreground">280</p>
                            </div>
                            <DollarSign className="w-12 h-12 text-primary opacity-20" />
                        </div>
                    </Card> */}
                </div>

                {/* Tabs */}
                <div>
                    <Tabs defaultValue="transaction" className="mt-8">
                        <TabsList className="w-full grid grid-cols-3 bg-slate-200">
                            <TabsTrigger value="transaction">Transactions</TabsTrigger>
                            <TabsTrigger value="budget">Budget</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        </TabsList>
                        <TabsContent value="transaction"><Transactions
                            transHistory={transHistory}
                            setTransHistory={setTransHistory}
                        />
                        </TabsContent>
                        <TabsContent value="budget">(In Development)</TabsContent>
                        <TabsContent value="analytics">(In Development)</TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}