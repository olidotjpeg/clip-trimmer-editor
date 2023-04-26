function getClipDirectory() {
    const directoryPath = path.join(__dirname, 'clips');
    //passsing directoryPath and callback function
    return fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 
        });
    });
}