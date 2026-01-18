/*
  Warnings:

  - You are about to drop the `cuentas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pacientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "cuentas_proveedor_idCuentaProveedor_key";

-- DropIndex
DROP INDEX "pacientes_usuarioId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cuentas";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "pacientes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Paciente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "fechaNacimiento" DATETIME,
    "direccion" TEXT,
    "historialMedico" TEXT,
    "telefono" TEXT,
    CONSTRAINT "Paciente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cuenta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "proveedor" TEXT NOT NULL,
    "idCuentaProveedor" TEXT NOT NULL,
    "tokenRefresco" TEXT,
    "tokenAcceso" TEXT,
    "expiraEn" INTEGER,
    "tipoToken" TEXT,
    "alcance" TEXT,
    "idToken" TEXT,
    "estadoSesion" TEXT,
    CONSTRAINT "Cuenta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Categoria_ramaId_fkey" FOREIGN KEY ("ramaId") REFERENCES "Rama" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Categoria" ("actualizado_en", "creado_en", "id", "nombre", "ramaId") SELECT "actualizado_en", "creado_en", "id", "nombre", "ramaId" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE TABLE "new_Cita" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fecha" DATETIME NOT NULL,
    "descripcion" TEXT,
    "datos" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "pacienteId" TEXT NOT NULL,
    "sucursalId" TEXT NOT NULL,
    "consultaId" TEXT,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    CONSTRAINT "Cita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cita_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cita_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "Consulta" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cita" ("actualizado_en", "consultaId", "creado_en", "datos", "descripcion", "estado", "fecha", "id", "pacienteId", "sucursalId") SELECT "actualizado_en", "consultaId", "creado_en", "datos", "descripcion", "estado", "fecha", "id", "pacienteId", "sucursalId" FROM "Cita";
DROP TABLE "Cita";
ALTER TABLE "new_Cita" RENAME TO "Cita";
CREATE TABLE "new_Consulta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descripcion" TEXT,
    "fecha" DATETIME NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Consulta" ("actualizado_en", "creado_en", "descripcion", "empresaId", "fecha", "id", "pacienteId") SELECT "actualizado_en", "creado_en", "descripcion", "empresaId", "fecha", "id", "pacienteId" FROM "Consulta";
DROP TABLE "Consulta";
ALTER TABLE "new_Consulta" RENAME TO "Consulta";
CREATE TABLE "new_Cupon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "descuento" REAL NOT NULL,
    "fechaExpiracion" DATETIME NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Cupon" ("actualizado_en", "codigo", "creado_en", "descuento", "fechaExpiracion", "id") SELECT "actualizado_en", "codigo", "creado_en", "descuento", "fechaExpiracion", "id" FROM "Cupon";
DROP TABLE "Cupon";
ALTER TABLE "new_Cupon" RENAME TO "Cupon";
CREATE UNIQUE INDEX "Cupon_codigo_key" ON "Cupon"("codigo");
CREATE TABLE "new_MetodoPago" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_MetodoPago" ("id", "nombre") SELECT "id", "nombre" FROM "MetodoPago";
DROP TABLE "MetodoPago";
ALTER TABLE "new_MetodoPago" RENAME TO "MetodoPago";
CREATE UNIQUE INDEX "MetodoPago_nombre_key" ON "MetodoPago"("nombre");
CREATE TABLE "new_Pago" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "suscripcionId" TEXT NOT NULL,
    "monto" REAL NOT NULL,
    "moneda" TEXT NOT NULL,
    "metodo_pago_id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Pago_suscripcionId_fkey" FOREIGN KEY ("suscripcionId") REFERENCES "Suscripcion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pago_metodo_pago_id_fkey" FOREIGN KEY ("metodo_pago_id") REFERENCES "MetodoPago" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pago_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pago" ("actualizado_en", "creado_en", "id", "metodo_pago_id", "moneda", "monto", "suscripcionId", "usuarioId") SELECT "actualizado_en", "creado_en", "id", "metodo_pago_id", "moneda", "monto", "suscripcionId", "usuarioId" FROM "Pago";
DROP TABLE "Pago";
ALTER TABLE "new_Pago" RENAME TO "Pago";
CREATE TABLE "new_Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "precioMensual" REAL NOT NULL,
    "descripcion" TEXT,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Plan" ("actualizado_en", "creado_en", "descripcion", "id", "nombre", "precioMensual") SELECT "actualizado_en", "creado_en", "descripcion", "id", "nombre", "precioMensual" FROM "Plan";
DROP TABLE "Plan";
ALTER TABLE "new_Plan" RENAME TO "Plan";
CREATE TABLE "new_Rama" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descripcion" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Rama" ("actualizado_en", "creado_en", "descripcion", "id") SELECT "actualizado_en", "creado_en", "descripcion", "id" FROM "Rama";
DROP TABLE "Rama";
ALTER TABLE "new_Rama" RENAME TO "Rama";
CREATE TABLE "new_Sucursal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "empresaId" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Sucursal_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sucursal" ("actualizado_en", "creado_en", "direccion", "empresaId", "id", "nombre", "telefono") SELECT "actualizado_en", "creado_en", "direccion", "empresaId", "id", "nombre", "telefono" FROM "Sucursal";
DROP TABLE "Sucursal";
ALTER TABLE "new_Sucursal" RENAME TO "Sucursal";
CREATE TABLE "new_Tratamiento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" REAL NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" DATETIME NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Tratamiento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tratamiento_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tratamiento" ("actualizado_en", "categoriaId", "creado_en", "descripcion", "empresaId", "id", "nombre", "precio") SELECT "actualizado_en", "categoriaId", "creado_en", "descripcion", "empresaId", "id", "nombre", "precio" FROM "Tratamiento";
DROP TABLE "Tratamiento";
ALTER TABLE "new_Tratamiento" RENAME TO "Tratamiento";
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "correo" TEXT,
    "nombre" TEXT,
    "emailVerified" DATETIME,
    "imagen" TEXT,
    "contraseña" TEXT,
    "rolId" TEXT NOT NULL,
    "empresaId" TEXT,
    "rolSistemaId" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Usuario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Usuario_rolSistemaId_fkey" FOREIGN KEY ("rolSistemaId") REFERENCES "RolSistema" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("contraseña", "correo", "emailVerified", "empresaId", "id", "imagen", "nombre", "rolId", "rolSistemaId") SELECT "contraseña", "correo", "emailVerified", "empresaId", "id", "imagen", "nombre", "rolId", "rolSistemaId" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_usuarioId_key" ON "Paciente"("usuarioId");
