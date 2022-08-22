import { UserGender } from "./../entity/User";
import * as yup from "yup";
import { UserEntity } from "../entity";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
type Container = {
	user: UserEntity;
};
export const UserSchema: yup.SchemaOf<Container> = yup.object().shape({
	user: yup
		.object()
		.shape({
			name: yup.string().required("Name"),
			gender: yup
				.mixed<UserGender>()
				.oneOf(Object.values(UserGender))
				.required("Gender"),
			image: yup.string(),
			phone: yup.string().matches(phoneRegExp).required("Phone"),
			email: yup.string().email("Email").required(),
			password: yup.string().min(6).required("Password"),
		})
		.optional(),
});
