import fs from 'fs';
import path from 'path';

const schemaPath = path.join(__dirname, 'schema.prisma');
const modelsDir = path.join(__dirname, 'models');

let schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

// Lire tous les fichiers dans `prisma/models`
const modelFiles = fs.readdirSync(modelsDir).filter(file => file.endsWith('.prisma'));

for (const file of modelFiles) {
    const modelContent = fs.readFileSync(path.join(modelsDir, file), 'utf8');
    schema += '\n' + modelContent;
}

// Écrire le fichier fusionné
fs.writeFileSync(schemaPath, schema);

console.log('✅ Schéma Prisma généré avec succès.');
