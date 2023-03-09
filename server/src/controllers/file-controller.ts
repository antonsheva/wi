

class FileController{
    async uploadSingleFile(req:any, res:any,next:any){
        const fileData = req.file;
        console.log('---- fileData ----')
        console.log(fileData);
        if (fileData)res.status(200).json('file was upload');
        else res.status(200).json('error upload file');
    }
}

module.exports = new FileController();