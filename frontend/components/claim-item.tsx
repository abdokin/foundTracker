import { toast } from "sonner";
import { Button } from "./ui/button";
import { DialogContent, Dialog, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from 'react';
export function ClaimItem({
  objetId
}: {
  objetId: number;
}) {
  const [code, setCode] = useState("");
  const handleClaim = () => {
    toast.success("Not implemented")
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'} variant={'outline'}>Claim</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Reclaim Your Item</h1>
            <p className="text-gray-600 dark:text-gray-400">Enter your reclamation code to retrieve your item.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="reclamation-code"
              >
                Reclamation Code
              </label>
              <div className="mt-1">
                <Input
                  onChange={(e) => setCode(e.target.value)}
                  id="reclamation-code"
                  placeholder="Enter your reclamation code"
                  type="text"
                />
              </div>
            </div>
            <Button type='button' onClick={() => handleClaim()}>Retrieve Item</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

  )
}
