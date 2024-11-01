export const SignupView = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		const username = event.target[0].value;
		const password = event.target[1].value;
		const email = event.target[2].value;
		const birthday = event.target[3].value;

		const data = {
			username: username,
			password: password,
			email: email,
			birthday: birthday,
		};
		fetch('https://my-flix-2-a94518576195.herokuapp.com/users', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.ok) {
				alert('Signup successful');
				window.location.reload();
			} else {
				alert('Signup failed');
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username: <input type="text" required />
			</label>
			<label>
				Password: <input type="password" required />
			</label>
			<label>
				Email: <input type="email" required />
			</label>
			<label>
				Birthday: <input type="date" required />
			</label>
			<button type="submit">Submit</button>
		</form>
	);
};
