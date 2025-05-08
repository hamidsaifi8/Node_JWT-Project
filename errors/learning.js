async function demo() {
  try {
    console.log("try block started, line: 1");
    console.log("try block started, line: 2");
    console.log("try block started, line: 3");
    const result = await fetch("http://localhost:5000/api/v1/hello");

    if (!result.ok) {
      throw new Error(result.statusText);
    }

    console.log(result);
    // creating an object of Error class, we use new keyword amd pass arguments to constructor function.
    // through new Error("this is my error");

    console.log("try block started, line: 4");
  } catch (error) {
    console.log(error);
  }
}
demo();
