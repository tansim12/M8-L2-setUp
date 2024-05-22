import Joi from 'joi';

// Address validation schema
const AddressSchemaJoi = Joi.object({
  currentAddress: Joi.string().required().messages({
    'string.empty': 'Current address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  zip: Joi.number().required().messages({
    'number.base': 'ZIP code is required',
  }),
  district: Joi.string().required().messages({
    'string.empty': 'District is required',
  }),
});

// Guardian validation schema
const GuardianSchemaJoi = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': "Father's name is required",
  }),
  motherName: Joi.string().required().messages({
    'string.empty': "Mother's name is required",
  }),
  fatherMobNo: Joi.string().required().messages({
    'string.empty': "Father's mobile number is required",
  }),
  motherMobNo: Joi.string().required().messages({
    'string.empty': "Mother's mobile number is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': "Father's occupation is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': "Mother's occupation is required",
  }),
});

// Name validation schema
const NameSchemaJoi = Joi.object({
  firstName: Joi.string().pattern(/^[A-Za-z]+$/).required().messages({
    'string.empty': 'First name is required',
    'string.pattern.base': 'First name must contain only letters',
  }),
  middleName: Joi.string().allow(''),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),
});

// Student validation schema
const StudentSchemaJoi = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required',
  }),
  name: NameSchemaJoi.required().messages({
    'any.required': 'Name is required',
  }),
  age: Joi.number().required().messages({
    'number.base': 'Age is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  gender: Joi.string().valid('female', 'male', 'other').required().messages({
    'any.only': '{#value} is not supported',
    'string.empty': 'Gender is required',
  }),
  address: AddressSchemaJoi.required().messages({
    'any.required': 'Address is required',
  }),
  profileImg: Joi.string().required().messages({
    'string.empty': 'Profile image is required',
  }),
  guardian: GuardianSchemaJoi.required().messages({
    'any.required': 'Guardian information is required',
  }),
  blood: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required().messages({
    'any.only': '{#value} is not a valid blood type',
    'string.empty': 'Blood type is required',
  }),
  dateOfBirth: Joi.string().isoDate().required().messages({
    'string.isoDate': 'Date of birth must be a valid date',
    'string.empty': 'Date of birth is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required',
  }),
  isActive: Joi.string().valid('active', 'inactive').default('active').messages({
    'any.only': '{#value} is not supported',
  }),
});

export default StudentSchemaJoi;
