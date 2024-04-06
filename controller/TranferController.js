import Transfer from "../models/Transfer/Tranfer.js"
import User from "../models/User/User.js"
import { mailSender } from "../utils/SendMail2.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { removeUndefined } from "../utils/util.js";

export const createTransfer = async (req, res) => {
    try {

        const { branch, Employee, Department, TransferDate, Description } = req.body;

        const userDetail = await User.findOne({ fullName: Employee });

        await mailSender(userDetail.email, `Regarding Transfer`, `<div>
         <div>Branch By: ${branch}</div>
         <div>Department: ${Department}</div>
         <div>Employee: ${Employee}</div>
         <div>TransferDate: ${TransferDate}</div>
         <div>Description: ${Description}</div>
         </div>`);


        const tranferDetail = await Transfer.create({ Employee, branch: branch, Department: Department, TransferDate: TransferDate, Description: Description });


        return res.status(200).json({
            status: true,
            message: 'Notification created successfully',
            data: tranferDetail,
        });



    } catch (error) {
        console.log("error ", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error "
        })
    }
}


export const getTransfer = async (req, res) => {
    try {

        // Find notifications where the user ID is in the user array
        const transfer = await Transfer.find({}).populate("Employee");


        return res.status(200).json({
            status: 200,
            message: "tranfer fetched successfully",
            data: transfer
        });



    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error "
        })
    }
}

export const deleteTransfer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Transfer.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, data, "Deleted Successfully"));
});

export const updateTransfer = asyncHandler(async (req, res) => {
    const { branch, Employee, Department, TransferDate, Description } = req.body;

    const { id } = req.params;

    const userDetail = await User.findOne({ fullName: Employee });

    let updateObj = removeUndefined({
        branch, Employee, Department, TransferDate, Description
    });

    await mailSender(userDetail.email, `Regarding Transfer`, `<div>
         <div>Branch By: ${branch}</div>
         <div>Department: ${Department}</div>
         <div>Employee: ${Employee}</div>
         <div>TransferDate: ${TransferDate}</div>
         <div>Description: ${Description}</div>
         </div>`);


    const updateTransfer = await Transfer.findByIdAndUpdate(
        id,
        {
            $set: updateObj,
        },
        {
            new: true,
        }
    );
    return res
        .status(200)
        .json(new ApiResponse(200, updateTransfer, "Updated  Successfully"));
});

