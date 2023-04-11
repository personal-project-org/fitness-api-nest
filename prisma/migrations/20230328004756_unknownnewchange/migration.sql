-- AddForeignKey
ALTER TABLE "CaloricBalanceFactor" ADD CONSTRAINT "CaloricBalanceFactor_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
