let fs = require("fs");
let stack = fs.readFileSync("stack.txt",{encoding:"utf8"});
let filesContents = stack.split("__FileSep__");

filesContents.forEach(fileContent => {
    //let filecontent = JSON.parse(fileContent);
    // let filename = filecontent.name;
    // fs.writeFileSync(__dirname+"/"+filename,filecontent.data);
    console.log(JSON.parse(fileContent))
})

function l(x) {console.log(x)}