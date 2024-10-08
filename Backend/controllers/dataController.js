const asyncHandler = require("../middleware/trycatch");
const dataModel = require("../models/dataModel");
const userModel = require("../models/userModel");


// create a new data

exports.CreateData = asyncHandler(async (req, res) => {

    const { FirstName, LastName, Email, DOB, Gender, Role, Mobile } = req.body;

    const emailExists = await dataModel.findOne({ Email: Email });

    if (emailExists) {
        return res.status(400).json({
            success: true,
            message: "Email is already exists",
        })
    }

    const createdata = await dataModel.create({
        FirstName,
        LastName,
        Email,
        DOB,
        Gender,
        Role,
        Mobile
    })
    res.status(200).json({
        success: true,
        message: "created successfully",
        createdata
    })
});


// All data

exports.AllData = asyncHandler(async (req, res) => {

    const AllData = await dataModel.find({})
    res.status(200).json({
        success: true,
        AllData
    })

});



// that user id find data

exports.findSingleData = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const userID = await dataModel.findByIdAndUpdate(id)
    res.status(200).json({
        success: true,
        userID
    })

});

// updated funtion

exports.UpdateData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { FirstName, LastName, Email, DOB, Gender, Role, Mobile } = req.body;

    // Check if the data with the given ID exists
    const data = await dataModel.findById(id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Data not found",
        });
    }

    // Check if the new email is already in use by another user

    if (Email && Email !== data.Email) {
        const emailExists = await dataModel.findOne({ Email: Email });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use",
            });
        }
    }

    const updatedData = await dataModel.findByIdAndUpdate(
        id,
        {
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            DOB: DOB,
            Gender: Gender,
            Role: Role,
            Mobile: Mobile,
        },
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: "Data updated successfully",
        updatedData,
    });
});


// delete funtion

exports.Deletedata = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const userID = await dataModel.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "Data deleted successfully",
    })

});


// favourite

exports.userFavourite = asyncHandler(async (req, res) => {

    const { userid, id } = req.body;

    const user = await userModel.findOne({ _id: userid })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    const likedNFT = user.favourites || [];

    if (likedNFT.includes(id)) {
        user.favourites = likedNFT.filter(dataId => dataId.toString() !== id.toString());
        await user.save();
        await user.populate('favourites')
        res.status(201).json({
            message: "successfully removed"
        });
    } else {
        user.favourites.push(id)
        await user.save();
        await user.populate('favourites')
        res.status(201).json({
            message: "successfully added"
        });
    }

});


exports.GetFavourite = asyncHandler(async (req, res) => {
    const { userid } = req.params;

    // Use _id to find user
    const user = await userModel.findOne({ userid })

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const FavouriteDataId = user.favourites;

    if (!FavouriteDataId || FavouriteDataId.length === 0) {
        return res.status(200).json({ success: true, data: [] });
    }

    // Find the favourite data
    const favouriteData = await dataModel.find({ _id: { $in: FavouriteDataId } }).populate('user').exec();

    if (!favouriteData || favouriteData.length === 0) {
        return res.status(404).json({ error: "Favourite not found" });
    }

    res.status(200).json({
        success: true,
        favouriteData
    });
});
