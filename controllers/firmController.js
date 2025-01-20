

// const Firm = require('../models/Firm');
// const vendor = require('../models/Vendor');
// const multer = require('multer')//for images

// //for images
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({storage: storage});
// const addFirm = async(req, res)=>{
//     try{
//         const {firmname, area, category, region, offer} = req.body

//     const image = req.file? req.file.filename: undefined;
    

//     const vendor = await vendor.findById(req.vendorId);
//     if(!vendor) {
//         res.status(404).json({message: "Vendor not found"})
//     }

//     const firm = new Firm({
//         firmName, area, category, region, offer, image, vendor: vendor._id
//     })
//     await firm.save();

//     return res.status(200).json({message: 'Firm Added successfully'})
//     } catch(error){
//         console.error(error)
//         res.status(500).json("internal server error")
//     }
// }

// module.exports = {addFirm: [upload.single('image'), addFirm]}

const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor'); // Corrected to 'Vendor'
const multer = require('multer'); // For images
const path = require('path');

// For images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;

        const image = req.file ? req.file.filename : undefined;

        // Fetch vendor using the vendorId from the request (ensure vendorId is set)
        const vendorData = await Vendor.findById(req.vendorId); // Change 'vendor' to 'vendorData'
        
        if (!vendorData) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        if(vendorData.firm.length>0){
            return res.status(400).json({message: "vendor can have only one firm"})
        }

        const firm = new Firm({
            firmName, 
            area, 
            category, 
            region, 
            offer, 
            image, 
            vendor: vendorData._id // Correct usage of vendor reference
        });

        const savedFirm = await firm.save();
            //firm id storing

            const firmId = savedFirm._id
        vendorData.firm.push(savedFirm)

        await vendorData.save()

        //condition-vendor must have only one firm

        

        return res.status(200).json({ message: 'Firm Added successfully', firmId });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};  

const deleteFirmById = async(req, res)=>{
    try{
        const firmId = req.params.firmId;

        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if(!deletedFirm) {
            return res.status(404).json({error: "No firm found"})
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server found"});
    }
}


module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById };
