const {createDiff}=require('../../services/diffServices');

test("should generate a correct patch for two different texts", () =>{
    const oldText="old Text";
    const newText="New text";   

    const result=createDiff(oldText,newText);
    console.log(result);
    const expectedOutput = "@@ -1,8 +1,8 @@\n-old T\n+New t\n ext\n";
    expect(result).toBe(expectedOutput);
});
test("should return an empty patch for identical texts", () => {
    const oldText = "This is the same text.";
    const newText = "This is the same text.";
  
    const result = createDiff(oldText, newText);

    expect(result).toBe("");
  });
test("should generate a patch when oldText is empty", () => {
    const oldText = "";
    const newText = "New text content.";
  
    const result = createDiff(oldText, newText);
    const expectedOutput = "@@ -0,0 +1,17 @@\n+New text content.\n";
  
    console.log("Result for empty oldText:", result);
    expect(result).toBe(expectedOutput);
  });
  test("should generate a patch when newText is empty", () => {
    const oldText = "Old text content.";
    const newText = "";
  
    const result = createDiff(oldText, newText);
    const expectedOutput = "@@ -1,17 +0,0 @@\n-Old text content.\n";
  
    console.log("Result for empty newText:", result);
    expect(result).toBe(expectedOutput);
  });
