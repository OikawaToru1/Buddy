import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt'
import jwt, {type SignOptions} from 'jsonwebtoken'




const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    username : { type: String,  unique: true, trim: true, lowercase: true, index: true },
    fileHistory: [{ type: Schema.Types.ObjectId, ref: "File" }],
    avatar: { type: String, trim: true }, // fetch from cloudianry
    refreshToken: { type: String, },
  },
  { timestamps: true },
);

userSchema.pre("save", async function(){
   if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    return;
   }
   return;

});

userSchema.methods.isPasswordCorrect = async function(password : string)
{
    return await bcrypt.compare(password, this.password);

}

userSchema.methods.generateAccessToken = function(){
    const expiry = process.env.ACCESS_TOKEN_EXPIRY!;

    return jwt.sign ({id: this._id} ,
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn : expiry} as SignOptions
     )
}
userSchema.methods.generateRefreshToken = function(){

  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET!, 
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,} as SignOptions
);
}

export const User = model("User",userSchema);

const aniket = new User({
    fullName : "Aniket Adhikari",
    email : "aniket@example.com",
    password : "password123",
}); 

console.log(aniket);
