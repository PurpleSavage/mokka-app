/**
 * Transforma un Enum en un arreglo de objetos { id: string, name: string }
 * @param enumObject El enum a transformar
 * @returns Lista de objetos para selects o listas
 */
export const enumToOptions = <T extends Record<string, string>>(enumObject: T) => {
  return Object.entries(enumObject).map(([key, value]) => ({
    id: value, // El valor real (ej: 'non-binary')
    name: key  // El nombre de la propiedad (ej: 'NON_BINARY')
  }));
};