import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://kapilkumar:BQ6Kd9gVzVIRykd1@auth.qzygjfz.mongodb.net/auth`
    )
    console.log('connected')
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
