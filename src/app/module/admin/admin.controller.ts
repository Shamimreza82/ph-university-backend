import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import sendResponses from "../../utils/sendRespons"
import { AdminServices } from "./admin.service"

const getAllAdmin = catchAsync( async (req, res) => {

    const result = await AdminServices.getAllAdminDB(req.query)

    sendResponses(res, {
        statusCode: StatusCodes.OK, 
        success: true , 
        message: "get all data from Admin successfully", 
        data: result
    })
})

const getSingleAdmin = catchAsync( async (req, res) => {
    const {adminId} = req.params
    const result = await AdminServices.getSingleAdminDB(adminId)

    sendResponses(res, {
        statusCode: StatusCodes.OK, 
        success: true , 
        message: "Admin retrieve successfully", 
        data: result
    })
})

const updateAdmin = catchAsync( async (req, res) => {
    const {adminId} = req.params
    const payload = req.body
    const result = await AdminServices.updateAdminDB(adminId, payload)

    sendResponses(res, {
        statusCode: StatusCodes.OK, 
        success: true , 
        message: "update Admin successfully", 
        data: result
    })
})

const deleteAdmin = catchAsync( async (req, res) => {
    const {adminId} = req.params
    const result = await AdminServices.deleteAdminDB(adminId)

    sendResponses(res, {
        statusCode: StatusCodes.OK, 
        success: true, 
        message: "Delete faculty successfully", 
        data: result
    })
})



export const AdminController = {
    getAllAdmin, 
    getSingleAdmin, 
    updateAdmin, 
    deleteAdmin
}