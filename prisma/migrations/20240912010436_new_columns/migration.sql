-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street_address" TEXT,
ADD COLUMN     "zip_code" TEXT;
