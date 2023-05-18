
/**
 * @jest-environment jsdom
 */

require("whatwg-fetch") //poly fill
require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const rest = require("msw").rest
const setupServer = require("msw/node").setupServer

const initDomFromFiles = require("../utils/initDomFromFiles")

// const apiConfig = require("./apiConfig.json");

// const server = setupServer(
//     rest.get(
//         "https://romans.justyy.workers.dev/api/romans/",
//         function (req, res, ctx) {
//             console.log("== Fake API called")
//             return res(ctx.json(fakeSearchResults))
//         }
//     )
// )

// beforeAll(function () {
//     server.listen()
// })

// afterAll(function () {
//     server.close()
// })


//---------***ACTUAL** START WRITING TESTS HERE--------------


//-----------------PASSING TESTS------------------------------------------


test("Type 1 into Arabic Number & Click Convert to Modern Roman ", async function () {
    initDomFromFiles(
        __dirname + "/romanNumerals.html",
        __dirname + "/romanNumerals.js"
    )

    //arrange
    const arabicNum = domTesting.getByText(document, "Arabic number (1-3999)");
    const toNewRom_Button = domTesting.getByRole(document, "button");

    

    //act
    const user = userEvent.setup()
    await user.type(arabicNum, "1");
    await user.click(toNewRom_Button);     

    // const oldRomanResult = domTesting.getByText(document, "\"Old\" Roman Numeral");
    const modernRomanResult = domTesting.findByText(document, "\"Modern\" Roman Numeral"); 
    const modernRomanResultNum = domTesting.findByText(document, "I"); 


   // expect(modernRomanResult).toHaveTextContent("I");
    console.log((await (modernRomanResult)).textContent);
    console.log((await modernRomanResultNum).textContent)
})






//---------*** "Live" conversion to "old" Roman numerals ------------------------------------------



// "Live" conversion to "old" Roman numerals
test("Type 1 into Arabic Number - Live Old Roman Num Conversion", async function () {
    initDomFromFiles(
        __dirname + "/romanNumerals.html",
        __dirname + "/romanNumerals.js"
    )

    //arrange
    const arabicNum = domTesting.getByLabelText(document, "Arabic number (1-3999)");
    const oldRomanResult = domTesting.getByText(document, "\"Old\" Roman Numeral");

    //act
    const user = userEvent.setup()
    await user.type(arabicNum, "1");
    
    //assert
    expect(oldRomanResult).toHaveTextContent("I");

})

test("Live Conversion - Type 11 into Arabic Number - Old Roman Num Result", async function () {
    initDomFromFiles(
        __dirname + "/romanNumerals.html",
        __dirname + "/romanNumerals.js"
    )

    //arrange
    const arabicNum = domTesting.getByLabelText(document, "Arabic number (1-3999)");
    const oldRomanResult = domTesting.getByText(document, "\"Old\" Roman Numeral");

    //act
    const user = userEvent.setup()
    await user.type(arabicNum, "1");
    
    //assert
    expect(oldRomanResult).toHaveTextContent("I");

    await user.type(arabicNum, "1");
    //assert
    expect(oldRomanResult).toHaveTextContent("XI");



})

test("Live Conversion - Type 123 into Arabic Number - Old Roman Num Result", async function () {
    initDomFromFiles(
        __dirname + "/romanNumerals.html",
        __dirname + "/romanNumerals.js"
    )

    //arrange
    const arabicNum = domTesting.getByLabelText(document, "Arabic number (1-3999)");
    const oldRomanResult = domTesting.getByText(document, "\"Old\" Roman Numeral");

    //act
    const user = userEvent.setup()
    await user.type(arabicNum, "1");
    //assert
    expect(oldRomanResult).toHaveTextContent("I");

    await user.type(arabicNum, "2");
    //assert
    expect(oldRomanResult).toHaveTextContent("XII");

    await user.type(arabicNum, "3");
     //assert
    expect(oldRomanResult).toHaveTextContent("CXXIII");


})

test("Live Conversion - Type 123 into Arabic Number & delete -  Old Roman Num Result", async function () {
    initDomFromFiles(
        __dirname + "/romanNumerals.html",
        __dirname + "/romanNumerals.js"
    )

    //arrange
    const arabicNum = domTesting.getByLabelText(document, "Arabic number (1-3999)");
    const oldRomanResult = domTesting.getByText(document, "\"Old\" Roman Numeral");
    const modernRomanResult = domTesting.getByText(document, "\"Modern\" Roman Numeral");

    //act
    const user = userEvent.setup()
    await user.type(arabicNum, "1");
    expect(oldRomanResult).toHaveTextContent("I");

    await user.type(arabicNum, "2");
    //assert
    expect(oldRomanResult).toHaveTextContent("XII");

    await user.type(arabicNum, "3");
    //assert
    expect(oldRomanResult).toHaveTextContent("CXXIII");

     await userEvent.type(arabicNum, "{backspace}");
     expect(oldRomanResult).toHaveTextContent("XII");

     await userEvent.type(arabicNum, "{backspace}");
     expect(oldRomanResult).toHaveTextContent("I");

     await userEvent.type(arabicNum, "{backspace}");
     expect(oldRomanResult).toHaveTextContent(" ");
})



