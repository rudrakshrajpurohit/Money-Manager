import { Button } from "./components/ui/button";
import { Card, CardTitle } from "./components/ui/card";


export default function Budget(){
    return(
        <>
            {/* Set Budget Card */}
            <Card className="p-3 mb-3">
                <CardTitle className="flex flex-col items-start text-xl">Set Budget Limit</CardTitle>
                <div className="items-start">
                    <div className="items-center flex flex-col-2 gap-5">
                      <p>Monthly Spending limit</p>
                    <input type="number" placeholder="0.00" className="border-2 border-slate-600 rounded-sm text-center"></input>
                    <Button>Set Budget</Button>  
                    </div>
                </div>
            </Card>

            {/* Budget Display Card */}

            <Card className="p-3">
                
            </Card>
        </>
    )
}