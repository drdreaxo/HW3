/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const fs = require("fs")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

//just testing enviroment works
test("initDomFromFiles working as intented ",  function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )
})


//---------***ACTUAL** START WRITING TESTS HERE--------------


//-----------------PASSING TESTS------------------------------------------

//1. SUCCESSFUL registration we clear out fields
test("S - 1. Simulate user successfully submitting form ", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "john.doe@gmail.com");
    await user.type(passwordInput, "Password12!");
    await user.click(registerUser);   
    
    //assert
    // input fields in form have cleared!!
    expect(domTesting.queryByText(emailInput, ""));
    expect(domTesting.queryByText(passwordInput, ""));

    expect(emailInput).not.toHaveValue()
    expect(passwordInput).not.toHaveValue()
})

//2. SUCCESSFUL registration we clear out fields -  success message is not empty
test("S - 2. Simulate user successfully submitting form -  success message is not empty ", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "john.doe@gmail.com");
    await user.type(passwordInput, "Password12!");
    await user.click(registerUser);   
    
    //assert
    // input fields in form have cleared!!
    expect(domTesting.queryByText(emailInput, ""));
    expect(domTesting.queryByText(passwordInput, ""));

    expect(emailInput).not.toHaveValue()
    expect(passwordInput).not.toHaveValue()

    const successDiv = domTesting.getByRole(document, "status");
    expect(successDiv).not.toBeEmptyDOMElement();
    
})

//3. SUCCESSFUL registration we clear out fields - display success message 
test("S- 3. Simulate user successfully submitting form - Display success message ", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "john.doe@gmail.com");
    await user.type(passwordInput, "Password12!");
    await user.click(registerUser);   
    
    //assert
    // input fields in form have cleared!!
    expect(domTesting.queryByText(emailInput, ""));
    expect(domTesting.queryByText(passwordInput, ""));

    expect(emailInput).not.toHaveValue()
    expect(passwordInput).not.toHaveValue()

    const successDiv = domTesting.getByRole(document, "status");
    expect(successDiv).not.toBeEmptyDOMElement();


    const successText = successDiv.innerHTML;
    expect(successText).toContain("You have successfully registered.");
 
})








//-----------------FALINING TESTS------------------------------------------

//4. Failed registration (no password) - filled out form fields are NOT cleared, but password field is
test("F - 4. Failed registration (no password) - filled out form fields are NOT cleared, but password field is", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "john.doe@gmail.com");
    await user.click(registerUser);

    //assert
    expect(passwordInput).not.toHaveValue()
    expect(emailInput).toHaveValue()
})

//5. Failed registration (no password) - filled out form fields are NOT cleared, but password field is
test("F - 5. Failed registration (no password) -  filled out form fields are NOT cleared, but password field is", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "john.doe.the3rd@gmail.com"); //DIFF VALID EMAIL
    await user.click(registerUser);

    //assert
    expect(passwordInput).not.toHaveValue()
    expect(emailInput).toHaveValue()
})

//6. Failed registration (no password) - Error Div is NOT empty
test("F - 6. Failed registration (no password) -  Error Div is NOT empty", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "john.doe@gmail.com"); //DIFF VALID EMAIL
    await user.click(registerUser);

    //assert
    expect(passwordInput).not.toHaveValue()
    expect(emailInput).toHaveValue()

    const passwordErrorDiv = domTesting.getByRole(document, "alert");
    expect(passwordErrorDiv).not.toBeEmptyDOMElement();
    

})


//7. Failed registration (no password) - Error Div is NOT empty - Show Errors
test("F - 7. Failed registration (no password) -  Error Div is NOT empty - Show Errors", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "john.doe@gmail.com"); //DIFF VALID EMAIL
    await user.click(registerUser);

    //assert
    expect(passwordInput).not.toHaveValue()
    expect(emailInput).toHaveValue()

    const passwordErrorDiv = domTesting.getByRole(document, "alert");
    const passwordErrorText = passwordErrorDiv.innerHTML;

    expect(passwordErrorDiv).not.toBeEmptyDOMElement();

    expect(passwordErrorText).toContain("The password you entered is invalid.");
    expect(passwordErrorText).toContain("Password needs to be at least 8 characters");
    expect(passwordErrorText).toContain("Password needs a lower case letter");
    expect(passwordErrorText).toContain("Password needs an upper case letter");
    expect(passwordErrorText).toContain("Password needs a numeric digit (0-9)");
    expect(passwordErrorText).toContain("Password needs a symbol (!@#$%^&amp;*)");
    expect(passwordErrorText).toContain("Password contains an invalid character (only letters, numbers, and the symbols !@#$%^&amp;* are allowed)");

})





//B. Failed registration (no email)



//8. Failed registration (no email) - filled out form fields are NOT cleared, but password field is
test("F - 8. Failed registration (no email)- filled out form fields are NOT cleared, but password field is", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(passwordInput, "Validpass123!");
    await user.click(registerUser);

    //assert
    expect(passwordInput).toHaveValue()
    expect(emailInput).not.toHaveValue()
})

//9.Failed registration (no email) - Error Div is NOT empty
test("F - 9. Failed registration (no email)- Error Div is NOT empty", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(passwordInput, "Validpass123!");
    await user.click(registerUser);

    //assert
    expect(passwordInput).toHaveValue()
    expect(emailInput).not.toHaveValue()


    const emailErrorDiv = domTesting.getByRole(document, "alert");
    expect(emailErrorDiv).not.toBeEmptyDOMElement();
})


//10.Failed registration (no email) - Error Div is NOT empty - Display Errors
test("F - 10. Failed registration (no email)- Error Div is NOT empty - Display Errors", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(passwordInput, "Validpass123!");
    await user.click(registerUser);

    //assert
    expect(passwordInput).toHaveValue()
    expect(emailInput).not.toHaveValue()


    const emailErrorDiv = domTesting.getByRole(document, "alert");
    expect(emailErrorDiv).not.toBeEmptyDOMElement();


    const emailErrorText = emailErrorDiv.innerHTML;
    expect(emailErrorText).toContain("The email address you entered is invalid");
})



//3. Failed registration (invalid password)


//11. Failed registration (invalid password) - all numbers
test("F - 11. Failed registration (invalidno password) - all numbers", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "somevalidemail@gmail.com"); //VALID EMAIL
    await user.type(passwordInput, "12345678"); 

    await user.click(registerUser);

    //assert
    expect(passwordInput).toHaveValue()
    expect(emailInput).toHaveValue()

    const passwordErrorDiv = domTesting.getByRole(document, "alert");
    const passwordErrorText = passwordErrorDiv.innerHTML;

    expect(passwordErrorDiv).not.toBeEmptyDOMElement();

    expect(passwordErrorText).toContain("The password you entered is invalid.");
    // expect(passwordErrorText).toContain("Password needs to be at least 8 characters");
    expect(passwordErrorText).toContain("Password needs a lower case letter");
    expect(passwordErrorText).toContain("Password needs an upper case letter");
    // expect(passwordErrorText).toContain("Password needs a numeric digit (0-9)");
    expect(passwordErrorText).toContain("Password needs a symbol (!@#$%^&amp;*)");
    // expect(passwordErrorText).toContain("Password contains an invalid character (only letters, numbers, and the symbols !@#$%^&amp;* are allowed)");

})


//12. Failed registration (invalid password) - all lowercase- Show Errors
test("F - 12. Failed registration (invalid password) - all lowercase", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()
    await user.type(emailInput, "somevalidemail@gmail.com"); //VALID EMAIL
    await user.type(passwordInput, "lowercase"); 

    await user.click(registerUser);

    //assert
    expect(passwordInput).toHaveValue()
    expect(emailInput).toHaveValue()

    const passwordErrorDiv = domTesting.getByRole(document, "alert");
    const passwordErrorText = passwordErrorDiv.innerHTML;

    expect(passwordErrorDiv).not.toBeEmptyDOMElement();

    expect(passwordErrorText).toContain("The password you entered is invalid.");
    // expect(passwordErrorText).toContain("Password needs to be at least 8 characters");
    // expect(passwordErrorText).toContain("Password needs a lower case letter");
    expect(passwordErrorText).toContain("Password needs an upper case letter");
    expect(passwordErrorText).toContain("Password needs a numeric digit (0-9)");
    expect(passwordErrorText).toContain("Password needs a symbol (!@#$%^&amp;*)");
    // expect(passwordErrorText).toContain("Password contains an invalid character (only letters, numbers, and the symbols !@#$%^&amp;* are allowed)");

})




//3. Failed registration (invalid email)




//13. Failed registration (invalid email) - error div is not empty
test("F - 13. Failed registration (invalid email)- error div is not empty", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()

    await user.type(emailInput, "invalid");

    await user.type(passwordInput, "Validpass123!");
    await user.click(registerUser);

    //assert
    expect(passwordInput).toHaveValue()
    expect(emailInput).toHaveValue()


    const emailErrorDiv = domTesting.getByRole(document, "alert");
    expect(emailErrorDiv).not.toBeEmptyDOMElement();
})

//14. Failed registration (invalid email) - error div is not empty
test("F - 14. Failed registration (invalid email)- error div is not empty - display error", async function () {
    initDomFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js"
    )

    //arrange
    const emailInput = domTesting.getByLabelText(document, "Email");
    const passwordInput = domTesting.getByLabelText(document, "Password");
    const registerUser = domTesting.getByRole(document, "button");

    //act
    const user = userEvent.setup()

    await user.type(emailInput, "invalid@.com");

    await user.type(passwordInput, "Validpass123!");
    await user.click(registerUser);

    //assert
    expect(passwordInput).toHaveValue()
    expect(emailInput).toHaveValue()


    const emailErrorDiv = domTesting.getByRole(document, "alert");
    expect(emailErrorDiv).not.toBeEmptyDOMElement();

    const emailErrorText = emailErrorDiv.innerHTML;
    expect(emailErrorText).toContain("The email address you entered is invalid");
})