let warnings = {

	showByInputName: function (form, fieldName){
		let errorMessages = {
			customError : "Something wrong whith entered data",
			patternMismatch : "Incorrect data",
			rangeOverflow : "Entered data too long",
			rangeUnderflow : "Entered data too short",
			valueMissing : "The field is required",
			tooLong : "Entered data too long",
			typeMismatch : "Incorrect data",
		}
		
		let input = form.querySelectorAll('input[id = "'+fieldName+'"]')[0];	
		let label = form.querySelectorAll('input[id = "'+fieldName+'"] ~ .input-edit-warning')[0];

		for (let key in errorMessages)	{
			if (input.validity[key]||false) {

				if (key == "customError") label.innerHTML = "*"+input.validationMessage;

				return true;
			}		
		}

		let inputLen = input.value.length;

		if (((inputLen > 0) && (inputLen < (parseInt(input.getAttribute("minlength")) || 0)))) {
			label.innerHTML = "*" + errorMessages.rangeUnderflow;	
		}
		else
		{
			label.innerHTML = "*" + errorMessages.valueMissing;
		}
	},


	enableForItems: function (items, state){
		Array.from(items || []).forEach (function(item){
			state ? item.setAttribute("show-warning","true") : item.removeAttribute("show-warning");
			if (!state) item.innerHTML ="";
		});
	},

	enableForForm : function (form, state){
		this.enableForItems(form.querySelectorAll(".input-edit-warning,.input-edit-field"), state);
	}
	
}