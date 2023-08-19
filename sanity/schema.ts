import type { SchemaTypeDefinition } from '@sanity/types'; // Make sure to import from the correct package
import banner from './schemas/banner';
import product from './schemas/product';

const schemas: SchemaTypeDefinition[] = [banner, product]; // List your actual schema types here

export default schemas;
