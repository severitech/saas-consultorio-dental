import bcrypt from "bcryptjs";

export async function hashearContraseña(contraseña: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(contraseña, salt);
}

export async function verificarContraseña(
  contraseña: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(contraseña, hash);
}
