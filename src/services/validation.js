import { required, email, max, min, confirmed } from 'vee-validate/dist/rules';

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min',{
  ...min,
  message:'password must be minimum 8'
})
extend('max',{
  ...max,
  message: "The name must be maximum 225 character"
});

extend('confirm',{
  ...confirmed,
  message:"Password Confirmation doesn't match"
})