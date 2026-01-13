/*
  Warnings:

  - You are about to drop the `rama` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `usuarioId` on the `consultas` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "rama";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "permisos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "modulo" TEXT NOT NULL,
    "accion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "roles_sistema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "nivel" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "roles_permisos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rolId" TEXT NOT NULL,
    "permisoId" TEXT NOT NULL,
    "concedido" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "roles_permisos_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "roles_sistema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "roles_permisos_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "permisos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "permisos_usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "permisoId" TEXT NOT NULL,
    "concedido" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "permisos_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "permisos_usuario_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "permisos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sesiones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "sesiones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tokens_verificacion" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tratamientos_consultas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tratamientoId" TEXT NOT NULL,
    "consultaId" TEXT NOT NULL,
    "precioUnitario" REAL NOT NULL,
    "dienteId" TEXT,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    CONSTRAINT "tratamientos_consultas_tratamientoId_fkey" FOREIGN KEY ("tratamientoId") REFERENCES "Tratamiento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tratamientos_consultas_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "consultas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Rama" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descripcion" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "ramaId" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    CONSTRAINT "Categoria_ramaId_fkey" FOREIGN KEY ("ramaId") REFERENCES "Rama" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Categoria" ("actualizado_en", "creado_en", "id", "nombre", "ramaId") SELECT "actualizado_en", "creado_en", "id", "nombre", "ramaId" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE TABLE "new_consultas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descripcion" TEXT,
    "fecha" DATETIME NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    CONSTRAINT "consultas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consultas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_consultas" ("actualizado_en", "creado_en", "empresaId", "fecha", "id", "pacienteId") SELECT "actualizado_en", "creado_en", "empresaId", "fecha", "id", "pacienteId" FROM "consultas";
DROP TABLE "consultas";
ALTER TABLE "new_consultas" RENAME TO "consultas";
CREATE TABLE "new_usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "correo" TEXT,
    "nombre" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "contraseña" TEXT,
    "rolId" TEXT NOT NULL,
    "empresaId" TEXT,
    "rolSistemaId" TEXT,
    CONSTRAINT "usuarios_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "usuarios_rolSistemaId_fkey" FOREIGN KEY ("rolSistemaId") REFERENCES "roles_sistema" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_usuarios" ("correo", "empresaId", "id", "nombre", "rolId") SELECT "correo", "empresaId", "id", "nombre", "rolId" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "permisos_nombre_key" ON "permisos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "roles_sistema_nombre_key" ON "roles_sistema"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "roles_permisos_rolId_permisoId_key" ON "roles_permisos"("rolId", "permisoId");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_usuario_usuarioId_permisoId_key" ON "permisos_usuario"("usuarioId", "permisoId");

-- CreateIndex
CREATE UNIQUE INDEX "sesiones_sessionToken_key" ON "sesiones"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_verificacion_token_key" ON "tokens_verificacion"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_verificacion_identifier_token_key" ON "tokens_verificacion"("identifier", "token");
