let form = {

	initialise: function (){

		this.object = document.getElementsByClassName("panel-container")[0];

		this.object.addEventListener('reset', function(event){
			warnings.enableForForm (form.object, false);
		});

		this.inputs = Array.from((this.object).elements);
		this.submitButton = this.object.getElementsByClassName("accept-button")[0];
		this.setSubmitEnabled (false);

		(this.submitButton).addEventListener( "click" , async function(event){
			form.submit();
		});

		let editFields = Array.from(this.object.getElementsByClassName("input-edit-field") || []);

		editFields.forEach (function(field){

			field.addEventListener("input", function (event) {

				/*
				//В соответствии с пунктом 5 (Requirements) должно быть так,
				//однако тогда не будет возможен пункт 1 (Requirements) 
				form.setSubmitEnabled (form.isValide());
				*/

				// Выполнил по пункту 1	
				form.setSubmitEnabled (!form.isEmpty());
			
			}, false);

			field.addEventListener("input", function (event) {
				warnings.showByInputName(form.object, event.target.getAttribute("id"));
			}, false);

		});	
	},

	setSubmitEnabled: function (state) {
		state ? this.submitButton.removeAttribute("disabled") : this.submitButton.setAttribute("disabled","");
	},

	getData: function(){

		let fieldTypes = {
			"first-name": "editField",
			"last-name": "editField",
			"email": "editField",
			"age": "editField",
			"gender": "radio",
			"password": "editField",
			"confirm-password": "editField"
		};

	   	let data = [];

		this.inputs.forEach (function (input) {
			if (input.nodeName === "INPUT") {
				let inputName = input.getAttribute("name");
				let inputType = fieldTypes[inputName];

				if (inputType == "radio"){

					if (!data[inputName]) data[inputName] = "";

					if (input.checked){
						data[inputName] = input.value;
					} 
				}
				if (inputType == "editField") data[inputName] = input.value; 
			}
		});

		return data;
	},

	isEmpty: function(){

		let data = this.getData();

		for (let key in data)	
			if (data[key].length == 0) return true;
				
		return false;
	},

	isValide: function(){

		if (this.isEmpty()) return false;
		let data = this.getData();

		let passwordInput = this.object.querySelectorAll('input[id = "password"]')[0];	
		let confirmPassword = this.object.querySelectorAll('input[id = "confirm-password"]')[0];


		if (data["password"] !== data["confirm-password"]){
			passwordInput.setCustomValidity('Passwords do not match');
			confirmPassword.setCustomValidity('Passwords do not match');
			return false;
		}
		else
		{
			passwordInput.validity.customError = false;
			confirmPassword.validity.customError = false;			
		}
		

		let editFields = Array.from((this.object.getElementsByClassName("input-edit-field") || []));

		condition = true;
		editFields.forEach (function(field){
			if ((!field.validity.valid)&&condition) {
				if (condition) condition = false;
			}
		});

		return condition
	},

	submit: async function(){
		
		if (this.isValide()) {
			let data = this.getData();
			let userDataResponce = await account.register (data["first-name"], data["last-name"], data["email"], data["age"], data["gender"], data["password"]);
			let userListResponce = await account.requestAll ();
				
			if (!alert(`Current user data: \n
			` + userDataResponce + ` \n All users list:  \n
			` + userListResponce + ` \n Sign up again?
			`)) this.object.reset();
		}
		else warnings.enableForForm (this.object, true);

	}
}

form.initialise();