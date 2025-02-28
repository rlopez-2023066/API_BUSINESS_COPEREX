import Company from '../company/company.model.js'
import ExcelJS from 'exceljs' 

//Excel JS
const updateExcelFile = async () => {
    try {
        const companys = await Company.find() 

        const workbook = new ExcelJS.Workbook() 
        const worksheet = workbook.addWorksheet('Companys') 

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Address', key: 'address', width: 40 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Year Experience', key: 'yearExperience', width: 20 },
            { header: 'Impact Level', key: 'impactLevel', width: 20 },
            { header: 'Category', key: 'category', width: 20 }
        ] 

        companys.forEach(company => {
            worksheet.addRow({
                name: company.name,
                address: company.address,
                phone: company.phone,
                yearExperience: company.yearExperience,
                impactLevel: company.impactLevel,
                category: company.category
            }) 
        }) 

        await workbook.xlsx.writeFile('companys.xlsx') 
        console.log('Excel file updated successfully') 
    } catch (error) {
        console.error('Error updating Excel file:', error) 
    }
} 

//Create Company
export const addCompany = async (req, res) => {
    const data = req.body 
    try {
        let company = new Company(data) 
        await company.save() 

        await updateExcelFile() 

        return res.status(201).send({
            success: true,
            message: 'Company saved successfully',
            company
        }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'General error when create Company',
            error
        }) 
    }
} 

//Update Company
export const updateCompany = async(req, res) => {
    try{
        const {id} = req.params
        let data = req.body
        let updateCompany = await Company.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!updateCompany){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Company not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Company updated successfully',
            }
        )
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'General error when update Company',
            }
        )
    }
}

//List Company
export const listCompany = async(req, res) => {
    const {limit, skip} = req.query
    
    try{
        const companys = await Company.find()
        .skip(skip)
        .limit(limit)
        /*.sort(
            {
                field: 1
            }
        )*/

        if (companys.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'No Companys found'
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'Company found',
                total: companys.length,
                companys
            }
        )
        
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'General error when list company',
                error
            }
        )
        
    }
}

//List Company (yearExperience)
export const listCompanyYear = async(req, res) => {
    const {limit, skip} = req.query
    try{
        let {yearExperienceParam} = req.params

        


        const companys = await Company
        .find({yearExperience: Number(yearExperienceParam)})
        .skip(skip)
        .limit(limit)
        

        if (companys.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'No Companys found'
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'Company found',
                total: companys.length,
                companys
            }
        )
        
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'General error when list company',
                error
            }
        )
        
    }
}


//List Company (Categoria)
export const listCompanyCata = async(req, res) => {
    const {limit, skip} = req.query
    let {categoryId} = req.params
    
    try{
        const companys = await Company
        .find({category: categoryId })
        .skip(skip)
        .limit(limit)
        

        if (companys.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'No Companys found'
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'Company found',
                total: companys.length,
                companys
            }
        )
        
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'General error when list company',
                error
            }
        )
        
    }
}

//List Company A-Z
export const listCompanyAZ = async(req, res) => {
    const {limit, skip} = req.query
    
    try{
        const companys = await Company
        .find()
        .skip(skip)
        .limit(limit)
        .sort(
            {
                name: 1
            }
        )
        

        if (companys.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'No Companys found'
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'Company found',
                total: companys.length,
                companys
            }
        )
        
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'General error when list company',
                error
            }
        )
        
    }
}

//List Company Z-A
export const listCompanyZA = async(req, res) => {
    const {limit, skip} = req.query
    
    try{
        const companys = await Company
        .find()
        .skip(skip)
        .limit(limit)
        .sort(
            {
                name: -1
            }
        )
        

        if (companys.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'No Companys found'
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'Company found',
                total: companys.length,
                companys
            }
        )
        
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'General error when list company',
                error
            }
        )
        
    }
}



