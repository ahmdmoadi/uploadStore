let express = require("express");
let app = express();
let upload = require("express-fileupload");
let fs = require("fs");
let compression = require("compression");
const JSZip = require("jszip");
let serveIndex = require("serve-index");
let sh = require("shelljs");
let cors = require("cors");

// console.log(fs.existsSync("./uploads/"))
// console.log(fs.existsSync("./uploadkk/"))

app.use(cors({origin:"*"}));

app.use(compression());

app.use(upload());

// (async () => {
//     let zip = new JSZip();
//     zip.file("Hello.txt","Hello world");
//     let content = await zip.generateAsync({type:"nodebuffer"});
//     fs.writeFileSync("example.zip", content);
// })();

// app.get("/",(req,res) => {
//     res.send("oh "+req.protocol);
// });

// app.use("/public",express.static("public"));

app.use(
    "/public",
    express.static("public/uploads"),
    serveIndex("public/uploads",{icons:!0})
    );

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/upload",(req,res) => {
    if(req.files) {
        //console.log(req.files);
        let file = req.files.file;
        let filename = file.name;
        let filedata = file.data;
        console.log(filedata);
        // let formattedfiledata = replaceAll(filedata,"\"","\\\"");
        // formattedfiledata = replaceAll(formattedfiledata,"\`","\\\`");
        //console.log(file);
        // fs.writeFileSync("/upload")
        // file.mv("./uploads/",filename,(e) => {
        //     if(err){
        //         throw new TypeError("file prblm!");
        //     } else {
        //         console.log("lookin' good")
        //     }
        // });
        fs.writeFileSync(__dirname+"\\public\\uploads\\"+filename,filedata);
        //fs.appendFileSync("./stack.txt",formatFileData(filename,filedata))
        res.send("<p>wrote file: "+filename+` successfully</p><script>setTimeout(() => {
            location.replace("http://localhost/")
        },2000)</script>`);
        console.log("wrote file: "+filename+" successfully");
        //console.log(formatFileData(filename,filedata))
    }
});

app.get("/delete/:filename",(req,res) => {
    if(fs.existsSync(__dirname+"/public/uploads/"+req.params.filename)) {
        res.send("exists. Deleting file "+req.params.filename+"...");
        fs.unlinkSync(__dirname+"/public/uploads/"+req.params.filename);
    } else if(!fs.existsSync(__dirname+"/public/uploads/"+req.params.filename)) {
        res.send("The file requested  to delete dosen't exist!");
    } else {
        res.send("Error!");
    }
})


app.listen(80);

/**
 * 
 * @param {String} data 
 * @param {String} name 
 */
function formatFileData(name,data) {
    return "{\"name\":\""+name+"\",\"data\":\""+data+"\"}__FileSep__";
}
/**
 * 
 * @param {String} src 
 * @param {String} w 
 * @returns {String}
 */
function replaceAll(src,w,t){
    return src.split(w).join(t);
}