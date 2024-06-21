import { useEffect, useState } from "react"
import { CategoriesContract } from "../contracts/CategoriesContract"
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export function AddVideo(){

    const [categories, setCategories] = useState<CategoriesContract[]>();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            VideoId: 0,
            Title: '',
            Url: '',
            Description:'',
            Likes:0,
            Dislikes:0, 
            CategoryId:0
        },
        onSubmit: (video)=>{
            axios.post('http://127.0.0.1:7070/add-video', video)
            .then(()=>{
                 alert('Video Added Successfully..');
                 navigate('/admin-dashboard');
            });
        }
    })

    function LoadCategories(){
        axios.get('http://127.0.0.1:7070/get-categories')
        .then(response=>{
            response.data.unshift({CategoryId:'-1', CategoryName:'Select a Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{

        LoadCategories();

    },[]);


    return(
        <div>
            <h4>Add New Video</h4>
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input type="number" onChange={formik.handleChange} name="VideoId" /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input type="text"  onChange={formik.handleChange} name="Title" /></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"> <input type="text"  onChange={formik.handleChange} name="Url" /> </dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9">
                        <textarea rows={4}  onChange={formik.handleChange} cols={40} name="Description" ></textarea>
                    </dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input type="number"  onChange={formik.handleChange} name="Likes" /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input type="number"  onChange={formik.handleChange} name="Dislikes" /></dd>
                    <dt className="col-3">Select Category</dt>
                    <dd className="col-9">
                        <select name="CategoryId"  onChange={formik.handleChange}>
                            {
                                categories?.map(category=>

                                    <option key={category.CategoryId} value={category.CategoryId}> {category.CategoryName} </option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-primary">Add</button>
                <Link to="/admin-dashboard" className="btn btn-danger ms-2"> Cancel </Link>
            </form>
        </div>
    )
}