import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Obtener el directorio actual en un entorno ES Module
const __dirname = dirname(fileURLToPath(import.meta.url));

const schemaDir = join(__dirname, "../schema");
const outputFile = join(__dirname, "../schema.prisma");

// Leer todos los archivos .prisma en la carpeta `schema`
const files = readdirSync(schemaDir).filter((file) => file.endsWith(".prisma"));

// Combinar el contenido de los archivos
let combinedSchema = `datasource db {
  provider = "sqlite"
}

generator client {
  provider = "prisma-client-js"
}

`;

files.forEach((file) => {
  const filePath = join(schemaDir, file);
  const content = readFileSync(filePath, "utf-8");
  combinedSchema += `// --- ${file} ---\n` + content + "\n";
});

// Escribir el archivo combinado
writeFileSync(outputFile, combinedSchema);

console.log("Esquema combinado generado en schema.prisma");