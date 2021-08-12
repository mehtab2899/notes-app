import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(
			`MongoDB Connected:${connect.connection.host}`.cyan.bold.underline
		);
	} catch (error) {
		console.log(`Error:${error}`.red.bold.underline);
		process.exit();
	}
};

export default connectDB;
