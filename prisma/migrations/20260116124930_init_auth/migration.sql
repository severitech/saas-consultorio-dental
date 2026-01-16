/*
  Warnings:

  - You are about to drop the column `image` on the `usuarios` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "correo" TEXT,
    "nombre" TEXT,
    "emailVerified" DATETIME,
    "imagen" TEXT,
    "contraseña" TEXT,
    "rolId" TEXT NOT NULL,
    "empresaId" TEXT,
    "rolSistemaId" TEXT,
    CONSTRAINT "usuarios_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "usuarios_rolSistemaId_fkey" FOREIGN KEY ("rolSistemaId") REFERENCES "roles_sistema" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_usuarios" ("contraseña", "correo", "emailVerified", "empresaId", "id", "nombre", "rolId", "rolSistemaId") SELECT "contraseña", "correo", "emailVerified", "empresaId", "id", "nombre", "rolId", "rolSistemaId" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
