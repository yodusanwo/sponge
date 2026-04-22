-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL,
    "siteName" TEXT,
    "siteDescription" TEXT,
    "amazonUrl" TEXT,
    "contactEmail" TEXT,
    "heroTitle" TEXT,
    "heroLead" TEXT,
    "heroImageUrl" TEXT,
    "ogImageUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);
