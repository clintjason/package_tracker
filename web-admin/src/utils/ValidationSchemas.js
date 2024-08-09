import * as Yup from 'yup';

const conditions = [
  "Resting/Sedentary",
  "Post-Exercise",
  "During Exercise",
  "Asleep",
  "Awake",
  "Stress/Anxiety",
  "Relaxed",
  "Fasted",
  "Post-Meal",
  "Dehydrated",
  "Hydrated",
];


export const deliveryValidationSchema = Yup.object().shape({
  pickup_time: Yup.string()
    .required('Pickup time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Pickup time must be in the format HH:mm')
    .nullable(),
  start_time: Yup.string()
    .required('Start time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Start time must be in the format HH:mm')
    .nullable(),
  end_time: Yup.string()
    .required('End time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'End time must be in the format HH:mm')
    .test(
      'isAfterStartTime',
      'End time must be after start time',
      (value, context) => {
        const startTime = context.parent.start_time;
        if (!startTime || !value) return true;
        const startDate = new Date(`1970-01-01 ${startTime}`);
        const endDate = new Date(`1970-01-01 ${value}`);
        return endDate.getTime() > startDate.getTime();
      }
    )
    .nullable(),
  package_id: Yup.string()
    .required('Package ID is required')
});

export const packageIdValidationSchema = Yup.object().shape({
  package_id: Yup.string()
    .required('Package ID is required')
})

export const locationValidationSchema = Yup.object().shape({
  from_location: Yup.string()
    .required('From location is required')
    .matches(
      /^(-?\d{1,3}\.\d{1,6})\s(-?\d{1,3}\.\d{1,6})$/,
      'From location must be in the format "lat long" (e.g., "37.7749 -122.4194")'
    )
    .test(
      'valid_coordinates',
      'From location must have valid latitude and longitude values',
      (value) => {
        const [lat, lng] = value.split(' ');
        return (
          parseFloat(lat) >= -90 &&
          parseFloat(lat) <= 90 &&
          parseFloat(lng) >= -180 &&
          parseFloat(lng) <= 180
        );
      }
    ),
  to_location: Yup.string()
    .required('To location is required')
    .matches(
      /^(-?\d{1,3}\.\d{1,6})\s(-?\d{1,3}\.\d{1,6})$/,
      'To location must be in the format "lat long" (e.g., "37.7749 -122.4194")'
    )
    .test(
      'valid_coordinates',
      'To location must have valid latitude and longitude values',
      (value) => {
        const [lat, lng] = value.split(' ');
        return (
          parseFloat(lat) >= -90 &&
          parseFloat(lat) <= 90 &&
          parseFloat(lng) >= -180 &&
          parseFloat(lng) <= 180
        );
      }
    ),
});

export const packageValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters long')
    .max(100, 'Description must be no more than 100 characters long')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Description must only contain letters, numbers, and spaces'),
  weight: Yup.number()
    .required('Weight is required')
    .positive('Weight must be a positive number')
    .min(0.1, 'Weight must be at least 0.1 kg')
    .max(50, 'Weight must not exceed 50 kg'),
  width: Yup.number()
    .required('Width is required')
    .positive('Width must be a positive number')
    .min(1, 'Width must be at least 1 cm')
    .max(200, 'Width must not exceed 200 cm'),
  height: Yup.number()
    .required('Height is required')
    .positive('Height must be a positive number')
    .min(1, 'Height must be at least 1 cm')
    .max(200, 'Height must not exceed 200 cm'),
  depth: Yup.number()
    .required('Depth is required')
    .positive('Depth must be a positive number')
    .min(1, 'Depth must be at least 1 cm')
    .max(200, 'Depth must not exceed 200 cm'),
  from_name: Yup.string()
    .required('Sender name is required')
    .min(3, 'Sender name must be at least 3 characters long')
    .max(50, 'Sender name must be no more than 50 characters long')
    .matches(/^[a-zA-Z\s]+$/, 'Sender name must only contain letters and spaces'),
  from_address: Yup.string()
    .required('Sender address is required')
    .min(10, 'Sender address must be at least 10 characters long')
    .max(200, 'Sender address must be no more than 200 characters long')
    .matches(/^[a-zA-Z0-9\s#,.-]+$/, 'Sender address must only contain letters, numbers, and the characters #, ., -, and ,'),
  to_name: Yup.string()
    .required('Recipient name is required')
    .min(3, 'Recipient name must be at least 3 characters long')
    .max(50, 'Recipient name must be no more than 50 characters long')
    .matches(/^[a-zA-Z\s]+$/, 'Recipient name must only contain letters and spaces'),
  to_address: Yup.string()
    .required('Recipient address is required')
    .min(10, 'Recipient address must be at least 10 characters long')
    .max(200, 'Recipient address must be no more than 200 characters long')
    .matches(/^[a-zA-Z0-9\s#,.-]+$/, 'Recipient address must only contain letters, numbers, and the characters #, ., -, and ,'),
  from_location: Yup.string()
    .required('From location is required')
    .matches(
      /^(-?\d{1,3}\.\d{1,6})\s(-?\d{1,3}\.\d{1,6})$/,
      'From location must be in the format "lat long" (e.g., "37.7749 -122.4194")'
    )
    .test(
      'valid_coordinates',
      'From location must have valid latitude and longitude values',
      (value) => {
        const [lat, lng] = value.split(' ');
        return (
          parseFloat(lat) >= -90 &&
          parseFloat(lat) <= 90 &&
          parseFloat(lng) >= -180 &&
          parseFloat(lng) <= 180
        );
      }
    ),
  to_location: Yup.string()
    .required('To location is required')
    .matches(
      /^(-?\d{1,3}\.\d{1,6})\s(-?\d{1,3}\.\d{1,6})$/,
      'To location must be in the format "lat long" (e.g., "37.7749 -122.4194")'
    )
    .test(
      'valid_coordinates',
      'From location must have valid latitude and longitude values',
      (value) => {
        const [lat, lng] = value.split(' ');
        return (
          parseFloat(lat) >= -90 &&
          parseFloat(lat) <= 90 &&
          parseFloat(lng) >= -180 &&
          parseFloat(lng) <= 180
        );
      }
    ),
});

export const passwordValidationSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password cannot be longer than 128 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character');

export const usernameValidationSchema = Yup.string()
  .required('Username is required')
  .matches(/^[a-zA-Z0-9_.]*$/, 'Username can only contain letters, numbers, underscores, and dots')
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username cannot be longer than 20 characters')
  .trim('Username cannot include leading or trailing spaces');

export const emailValidationSchema = Yup.string().email('Invalid email').required('Email is required');

export const roleValidationSchema = Yup.string()
  .required('Role is required')
  .oneOf(['admin', 'patient', 'doctor'], 'Invalid role');

export const temperatureTypeValidationSchema = Yup.string()
.required('Temperature Type is required')
.oneOf(['Oral', 'Axillary', 'Rectal', 'Tympanic', 'Temporal'], 'Invalid Temperature Type');
  
export const symptomsValidationSchema = Yup.array()
.of(Yup.string().oneOf(["Fever", "Shortness of breath", "Rapid heartbeat", "Dizziness", "Sweating", "Fatigue", "No symptoms"]))
.min(1, 'At least one symptom must be selected')
.max(6, 'You can only select up to 6 symptoms')
.required('Symptoms are required');

export const conditionValidationSchema = Yup.array()
.of(Yup.string().oneOf(conditions))
.min(1, 'At least one condition must be selected')
.max(10, 'You can only select up to 10 conditions')
.required('Conditions are required');

export const feedbackValidationSchema = Yup.string()
.required('Feedback is required')
.min(10, 'Feedback must be at least 10 characters long')
.max(500, 'Feedback must be no more than 500 characters long')
.matches(/[a-zA-Z0-9\s]+/, 'Feedback can only contain letters, numbers, and spaces')
.trim('Username cannot include leading or trailing spaces');

export const termsAndConditionsValidationSchema = Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('Required');


export const ageValidationSchema = Yup.number()
.integer('Age must be an integer')
.min(1, 'You must be at least 1 years old')
.max(150, 'Age cannot exceed 150 years')
.required('Age is required');

export const genderValidationSchema = Yup.string()
.oneOf(['Male', 'Female'], 'Invalid gender')
.required('Gender is required');

export const fullnameValidationSchema = Yup.string()
.matches(/^[a-zA-Z\s]+$/, 'Full name must only contain letters and spaces')
.min(3, 'Full name must be at least 3 characters long')
.max(50, 'Full name cannot exceed 50 characters')
.required('Full name is required');

export const specializationValidationSchema = Yup.string()
.matches(/^[a-zA-Z\s]+$/, 'Specialization must only contain letters and spaces')
.min(3, 'Specialization must be at least 3 characters long')
.max(50, 'Specialization cannot exceed 50 characters')
.required('Specialization is required');

export const phoneNumberValidationSchema = Yup.string()
.matches(/^\+?\d{1,3}[- ]?\(?\d{1,3}\)?[- ]?\d{3,4}[- ]?\d{4}$/, 'Invalid phone number format')
.required('Phone number is required');

export const addressValidationSchema = Yup.string()
  .matches(/^[a-zA-Z0-9\s]+$/, 'Address must only contain letters, numbers, and spaces')
  .min(3, 'Address must be at least 3 characters long')
  .max(100, 'Address cannot exceed 100 characters')
  .required('Address is required');

  export const streetValidationSchema = Yup.string()
  .matches(/^[a-zA-Z0-9\s]+$/, 'Street address must only contain letters, numbers, and spaces')
  .min(3, 'Street address must be at least 3 characters long')
  .max(100, 'Street address cannot exceed 100 characters')
  .required('Street address is required');

export const cityValidationSchema = Yup.string()
  .matches(/^[a-zA-Z\s]+$/, 'City must only contain letters and spaces')
  .min(3, 'City must be at least 3 characters long')
  .max(50, 'City cannot exceed 50 characters')
  .required('City is required');

export const stateValidationSchema =Yup.string()
  .matches(/^[a-zA-Z\s]+$/, 'State must only contain letters and spaces')
  .min(2, 'State must be at least 2 characters long')
  .max(50, 'State cannot exceed 50 characters')
  .required('State is required');

export const zipCodeValidationSchema = Yup.string()
  .matches(/^\d{5}(?:[-\s]?\d{4})?$/, 'Invalid zip code format')
  .required('Zip code is required');
    
export const countryValidationSchema = Yup.string()
  .matches(/^[a-zA-Z\s]+$/, 'Country must only contain letters and spaces')
  .min(3, 'Country must be at least 3 characters long')
  .max(50, 'Country cannot exceed 50 characters')
  .required('Country is required');