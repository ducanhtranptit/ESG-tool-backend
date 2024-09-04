import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	const newPassword = bcrypt.hashSync(password, salt);
	return newPassword;
};

export const comparePassword = (password, passwordHashed) => {
	return bcrypt.compareSync(password, passwordHashed);
};
