let account = {

	tryFetch: async function(url,options) {
		try {
		  let response = await fetch(url, options);
		  response = await response.json();

		  return JSON.stringify(response);

		} catch (error) {
		  console.log('Error:', error);

		  return false
		}
	},

	register: async function(firstName, lastName, email, age, gender, password) {
	 	
	 	let user = {
	 		"first-name": firstName,
	 		"last-name": lastName,
	 		"email": email,
	 		"age": age,
	 		"gender": gender,
	 		"password": password
	 	}

		return await this.tryFetch('http://localhost:3000/posts', {
		    method: 'POST',
		    headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			},
		    body: JSON.stringify(user)
		});
		
	},

	remove: async function(accountID){

		accountID = Number.parseInt(accountID);

		if ((typeof accountID) !== "number")  return false;

		return await this.tryFetch('http://localhost:3000/posts/'+accountID, {
		    method: 'DELETE'
		});
	},

	requestAll: async function()  {

		return await this.tryFetch('http://localhost:3000/posts/', {
		    method: 'GET'
		});
	} 

} 
