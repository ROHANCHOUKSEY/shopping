import { SchemaTypeDefinition } from '@sanity/types'; // Make sure to import from the correct package
import banner from './schemas/banner';
import product from './schemas/product';

// Your schema definitions here

const schemas: SchemaTypeDefinition[] = [banner, product]; // Update this line as per your schema definitions

export default schemas;
