import { seedTransactions } from "@/action/seed";

export async function GET() {
  const result = await seedTransactions();
  console.log(result);
  return Response.jason(result);
}
