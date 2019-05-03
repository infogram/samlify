import * as fs from 'fs';
import * as path from 'path';

import * as xmllint from 'node-xmllint';

export interface SchemaValidator {
  validate: (xml: string) => Promise<string>;
}

type GetValidatorModuleSpec = () => Promise<SchemaValidator>;

const getValidatorModule: GetValidatorModuleSpec = async () => {
  const schemaPath = (schema: string) => path.resolve(__dirname, `../schemas/${schema}`);

  const xsd = 'saml-schema-protocol-2.0.xsd';

  let schemaProto = fs.readFileSync(schemaPath(xsd), 'utf-8');
  let schemaAssert = fs.readFileSync(schemaPath('saml-schema-assertion-2.0.xsd'), 'utf-8');
  const schemaXmldsig = fs.readFileSync(schemaPath('xmldsig-core-schema.xsd'), 'utf-8');
  let schemaXenc = fs.readFileSync(schemaPath('xenc-schema.xsd'), 'utf-8');

  // file fix for virtual filesystem of emscripten
  schemaProto = schemaProto.replace('saml-schema-assertion-2.0.xsd', 'file_0.xsd');
  schemaProto = schemaProto.replace('xmldsig-core-schema.xsd', 'file_1.xsd');
  schemaAssert = schemaAssert.replace('xmldsig-core-schema.xsd', 'file_1.xsd');
  schemaAssert = schemaAssert.replace('xenc-schema.xsd', 'file_2.xsd');
  schemaXenc = schemaXenc.replace('xmldsig-core-schema.xsd', 'file_1.xsd');

  return {
    validate: (xml: string) => {

      return new Promise((resolve, reject) => {

        const validationResult = xmllint.validateXML({
          xml: xml,
          schema: [schemaAssert, schemaXmldsig, schemaXenc, schemaProto]
        });

        if (!validationResult.errors) {
          return resolve('SUCCESS_VALIDATE_XML');
        }

        console.error(`this is not a valid saml response with errors: ${validationResult.errors}`);
        return reject('ERR_EXCEPTION_VALIDATE_XML');

      });
    }
  };

};

export {
  getValidatorModule
};
