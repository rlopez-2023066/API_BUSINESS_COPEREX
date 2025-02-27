import Category from '../category/category.model.js'


//Create Category
export const addCategory = async(req, res) => {
    try{
        const data = req.body 

        const category = new Category(data)

        await category.save()

        return res.send(
            {
                success: true,
                message: `Category = ${category.name} Saved Successfully`,
            }
        )
        
    }catch (error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: `Error Occured While Saving Category`,
                error
            }
        )
    }
}

//List Category
export const listCategory = async(req, res)=> {
    try{
        const {limit, skip} = req.query

        const categories = await Category.find()
        .skip(skip)
        .limit(limit)

        if(categories.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: `No Categories Found`,
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Categories found',
                total: categories.length,
                categories
            }
        )
    }catch (error){
        console.error(error);
        return res.status(500).send(
            {
                success: false, 
                message: `Error Occured While Listing Categories`,
                error
            }
        )
    }

}

//Update Category
export const updateCategory = async (req, res) => {
    try{
        const {id} = req.params
        
        const data = req.body

        const category = await Category.findByIdAndUpdate(
            id, 
            data,
            {new: true}
        )


        if (!category){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'Category updated',
                category
            }
        )

    }catch(error){
        console.error(error);
        return res.status(500).send(
            {
                success:false,
                message: 'General error  when updating Category',
                error
            }
        )
    }
}

//Delete Category
export const deleteCategory = async (req, res) => {
    try{
        const {id} = req.params

        const category = await Category.findByIdAndDelete(id)

        if (!category){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Category deleted',
                category
            }
        )

    }catch(error){
        console.error(error);
        return res.status(500).send(
            {
                success:false,
                message: 'General error  when deleting Category',
                error
            }
        )
    }
}

//RL