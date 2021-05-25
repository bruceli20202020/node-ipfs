const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create('http://localhost:5001')
const express    = require('express')
const fs   = require('fs')
const app  = express()
const expFileUpload = require("express-fileupload");
app.use(expFileUpload());
app.listen(3000,()=>{
	console.log('server start');
});
app.post('/save',async(req,res)=>{
	const data = req.body.data;
	const path = req.body.path;
	const filHash = await addIpfs(path,data);
	res.json({code:200,data:filHash,messages:'success'});
})
app.get('/get/:hash',async(req,res)=>{
	let params    = req.params
	let hash      = params.hash;
	let ret       = await ipfs.cat(hash);
	console.log(ret)
})
const addIpfs = async(path,content) => {
    const files = [{
		path: path,
		content: content
	}]
	const ret   = await ipfs.add(files)
	return ret;
}