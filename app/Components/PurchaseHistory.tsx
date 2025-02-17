import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const purchases = [
  { id: 1, date: "2023-05-01", item: "Laptop", amount: 1299.99 },
  { id: 2, date: "2023-04-15", item: "Smartphone", amount: 799.99 },
  { id: 3, date: "2023-03-22", item: "Headphones", amount: 199.99 },
  { id: 4, date: "2023-02-10", item: "Smartwatch", amount: 249.99 },
  { id: 5, date: "2023-01-05", item: "Tablet", amount: 499.99 },
]

export function PurchaseHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent purchases</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.date}</TableCell>
                <TableCell>{purchase.item}</TableCell>
                <TableCell className="text-right">${purchase.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

