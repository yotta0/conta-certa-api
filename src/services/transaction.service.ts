import { PrismaClient } from "@prisma/client";
import { addMonths, format } from "date-fns";
export class TransactionService {
  private static prisma = new PrismaClient();

  public static async getTransactions(userId: string) {
    try {
      return await this.prisma.transaction.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error getting transactions");
    }
  }

  public static async getTransactionByMonth(monthRef: string) {
    try {
      return await this.prisma.transaction.findMany({
        where: {
          monthRef,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error getting transactions");
    }
  }

  public static async getTransactionById(id: string, userId: string) {
    try {
      return await this.prisma.transaction.findUnique({
        where: { id, userId },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error getting transaction");
    }
  }

  public static async createTransaction(
    userId: string,
    parcels: number,
    amount: number,
    type: string,
    startDate: Date
  ) {
    try {
      for (let i = 1; i <= parcels; i++) {
        const monthRef = format(addMonths(startDate, i), "yyyy-MM");
        await this.prisma.transaction.create({
          data: {
            amount: amount / parcels,
            monthRef: monthRef,
            type,
            userId: "3aa2f89d-a648-445c-a066-4a562b39e3b6",
          },
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error creating transaction");
    }
  }
}