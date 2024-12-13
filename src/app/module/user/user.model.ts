import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      required: true,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
  next();
});

// userSchema.post('findOne', function(doc, next){
//   doc.password = '';
//   next()
// })

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id });
};


userSchema.statics.isPasswordMatch = async function (plaintextPassword, hashPassword) {
  return await bcrypt.compare(plaintextPassword, hashPassword) 
}


export const User = model<TUser, UserModel>('User', userSchema);
