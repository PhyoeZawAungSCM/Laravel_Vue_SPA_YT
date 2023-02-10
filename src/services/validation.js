import { required, email, max, min, confirmed, image } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: '{_field_} is required'
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

extend('image',{
  ...image,
  message:"must be an image"
})